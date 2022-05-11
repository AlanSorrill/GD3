import * as functions from 'firebase-functions';
import fetch from 'node-fetch'

import * as fs from 'fs'
import * as path from 'path'
import './common/FBF_Helpers'
import { DeWonder, ExampleRequest, WonderQueryParam_Util, WonderRequest } from './common/WonderData'
import { exec } from 'child_process'
import * as crypto from 'crypto'
import { Database } from './common/WonderData/WonderDataImports';
import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
import * as FirebaseStorage from 'firebase-admin/storage';
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
import { FirebaseServiceAccountCreds } from './firebaseAdminCreds';

initializeApp({
  credential: cert(FirebaseServiceAccountCreds as any),
  storageBucket: 'gs://gdsn3-22.appspot.com'
});
let firebaseStorage = FirebaseStorage.getStorage()
let bucket = firebaseStorage.bucket()

//
console.log('test')

let database = new Database({
  async readFile<T>(filePath) {
    if (filePath.startsWith('./')) {
      filePath = filePath.substring(2)
    }
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1)
    }
    let absPath = path.resolve(__dirname, `../data/`, filePath);
    let reference = bucket.file("data/" + filePath);
    if (!(await reference.exists())) {//(!fs.existsSync(absPath)) {
      return { error: `File doesn't exist: ${absPath}` }
    }
    // let data = await fs.promises.readFile(absPath)
    // return JSON.parse(data.toString())

    let [buffer] = await reference.download()
    let result = buffer.toString()
    return JSON.parse(result) as T;
  },
  async writeFile<T>(filePath: string, data: string | T) {
    if (filePath.startsWith('./')) {
      filePath = filePath.substring(2)
    }
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1)
    }
    let absPath = path.resolve(__dirname, `../data/`, filePath);
    let reference = bucket.file("data/" + filePath);
    let buffer = Buffer.from(typeof data == 'string' ? data : JSON.stringify(data), 'utf-8');
    return new Promise((acc) => {
      let blobStream = reference.createWriteStream({
        resumable: false
      })
      blobStream.on('finish', () => {
        acc("Success")
      })
        .on('error', (e) => {
          acc(`Unable to upload file: ${JSON.stringify(e)}`)
        })
        .end(buffer)
    })

    // await uploadFirebaseFile(typeof data == 'string' ? data : JSON.stringify(data), filePath)//await fs.promises.writeFile(absPath, )
    // return 'success';
  },
  async exists(filePath: string) {
    if (filePath.startsWith('./')) {
      filePath = filePath.substring(2)
    }
    if (filePath.startsWith('/')) {
      filePath = filePath.substring(1)
    }
    let reference = bucket.file("data/" + filePath);
    return (await reference.exists())[0]//firebaseFileExists(pathName)// return fs.existsSync(absPath)
  }
})

export const listener = functions.https.onRequest(async (req, res) => {
  res.setHeader('Content-Type', 'application/xml')
  let exampleParams: [string, string[]][] = ExampleRequest.replace('</request-parameters>', '').replace('<request-parameters>', '').replaceAll('<value/>', '<value></value>').replaceAll('<parameter>', '').replaceAll('</name>', '').replaceAll('</value>', '').replaceAll('<name>', '').split('</parameter>').map(str => {
    let tmp = str.split('<value>');
    let name = tmp[0]
    let rest = tmp.slice(1)
    return [name, rest]
  })
  let reqTestParams = new WonderRequest().groupBy('Year').groupBy('Race').addParam('F_D76.V25', WonderQueryParam_Util.All).toParamMap()

  let requestParams: Map<string, string[]> = new Map();
  let inconsistencies: string[] = []
  exampleParams.forEach((value: [string, string[]]) => {
    if (!reqTestParams.has(value[0])) {
      inconsistencies.push(`Request missing ${value[0]}`)
    }
    requestParams.set(value[0], value[1])
  });
  for (let exParamName in reqTestParams.keys()) {
    if (!requestParams.has(exParamName)) {
      inconsistencies.push(`Examples missing ${exParamName}`)
    }
  }


  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(inconsistencies))
})
export const ReqTest = functions.https.onRequest(async (req, res) => {
  // res.setHeader('Content-Type', 'application/xml')
  // res.send(new WonderRequest().groupBy('Year').addParam('M_1', 'D76.M1').toString())
  res.send(await database.fileAccessor.writeFile("test.json", { myBigData: "Stuff and things" }))
})
export const RonaTest = functions.https.onRequest(async (req, res) => {
  let data = await new WonderRequest().groupBy('Year').groupBy('AgeGroups').filterByYear(['1999', '2001']).request()


  let exportPath = path.resolve(__dirname, '../data/exampleResponse.xml');
  console.log(`saving to file${exportPath}`)
  fs.writeFileSync(exportPath, JSON.stringify(data))
  console.log('saved')
  res.setHeader('Content-Type', 'application/json')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(data)
})

function requestToFileName(fetchBody: string) {

  console.log(`Req to file name\n${fetchBody}`)
  return crypto.createHash('md5').update(fetchBody).digest("hex");
}
export const WonderProxy = functions.https.onRequest(async (req, res) => {
  let fetchBody = req.body['request_xml']
  // console.log(`Fetch body: ${fetchBody}`)
  let fileName = requestToFileName(fetchBody)
  let fileDirectory = path.resolve(__dirname, `../data/xml/`)
  if (!fs.existsSync(fileDirectory)) {
    fs.mkdirSync(fileDirectory)
  }
  let exportPath = path.resolve(fileDirectory, `${fileName}.xml`);
  if (fs.existsSync(exportPath)) {
    console.log(`Using cache for request ${fileName}`)
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Access-Control-Allow-Origin', '*')

    res.sendFile(exportPath)
    return;
  }
  // console.log(`Sending query to wonder:\n${fetchBody}`)
  let result = await fetch(`https://wonder.cdc.gov/controller/datarequest/D76`, {
    method: 'POST',
    body: `request_xml=${fetchBody}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
    // mode: 'no-cors'
  })

  let resultText = await result.text();


  // console.log(`saving to file: ${exportPath}`)
  fs.writeFileSync(exportPath, resultText)

  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(resultText)
})
export const Data = functions.https.onRequest(async (req, resp) => {

  resp.setHeader('Content-Type', 'application/json')
  resp.setHeader('Access-Control-Allow-Origin', '*')
  // let name = req.path.startsWith('.')
  let filePath = req.path.startsWith("/") ? req.path.substring(1) : req.path
  console.log(filePath)
  switch (req.method) {
    case 'GET':

      if (!(await database.fileAccessor.exists(filePath))) {
        resp.send(`No file ${filePath}`)
      }
      let file = await database.fileAccessor.readFile(filePath)
      resp.send(file)
      break;
    case 'POST':
      let data = typeof req.body == 'string' ? req.body : JSON.stringify(req.body)
      try {
        resp.send(await database.fileAccessor.writeFile(filePath, data))
      } catch (err) {
        resp.send(`Failed to save data ${JSON.stringify(err)}`)
      }
      break;
    default:
      resp.send(`Unknown method ${req.method}`)
  }

})
export const DataExists = functions.https.onRequest(async (req, resp) => {

  resp.setHeader('Content-Type', 'application/json')
  resp.setHeader('Access-Control-Allow-Origin', '*')
  // let name = req.path.startsWith('.')
  let file = path.resolve(__dirname, '../data/', '.' + req.path)
  console.log(`Checking if ${file} exists`)
  switch (req.method) {
    case 'GET':
      if (!fs.existsSync(file)) {
        resp.send(`false`)
        return;
      }
      resp.send('true')
      break;

      break;
    default:
      resp.send(`Unknown method ${req.method}`)
  }

})
export const Diseases = functions.https.onRequest(async (req, resp) => {
  let codes = await database.pullIcdCodes(10)
  resp.setHeader('Content-Type', 'application/json')
  resp.setHeader('Access-Control-Allow-Origin', '*')

  resp.send(JSON.stringify(codes))
})
export const HashTypes = functions.https.onRequest(async (req, res) => {
  exec('openssl list -digest-algorithms', (err, stdout, stderr) => {
    if (err) {
      console.log('err', err)
      res.send(JSON.stringify({ status: 'Error', error: err }))
      return;
    }
    if (stderr) {
      console.log('stderr', stderr)
      res.send(JSON.stringify({ status: 'STDError', error: stderr }))
      return
    }
    console.log('success', stdout)
    res.send(JSON.stringify({ status: 'Success', value: stdout }))
  })
}) 