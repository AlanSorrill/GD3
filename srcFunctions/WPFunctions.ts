import * as functions from 'firebase-functions';
import fetch from 'node-fetch'

import * as fs from 'fs'
import * as path from 'path'
import './common/FBF_Helpers'
import { DeWonder, ExampleRequest, WonderQueryParam_Util, WonderRequest } from './common/WonderData'
import { exec } from 'child_process'
import * as crypto from 'crypto'

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
console.log('test')

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
  res.setHeader('Content-Type', 'application/xml')
  res.send(new WonderRequest().groupBy('Year').addParam('M_1', 'D76.M1').toString())
})
export const RonaTest = functions.https.onRequest(async (req, res) => {
  let data = await new WonderRequest().groupBy('Year').groupBy('AgeGroups').filterByYear(['1999', '2001']).request()


  let exportPath = path.resolve(__dirname, '../data/exampleResponse.json');
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
console.log(`Fetch body: ${fetchBody}`)
  let fileName = requestToFileName(fetchBody)
  let exportPath = path.resolve(__dirname, `../data/${fileName}.xml`);
  if(fs.existsSync(exportPath)){
    console.log(`Using cache for request ${fileName}`)
    res.setHeader('Content-Type', 'application/xml')
    res.setHeader('Access-Control-Allow-Origin', '*')
    
    res.sendFile(exportPath)
    return;
  }
  console.log(`Sending query to wonder:\n${fetchBody}`)
  let result = await fetch(`https://wonder.cdc.gov/controller/datarequest/D76`, {
    method: 'POST',
    body: `request_xml=${fetchBody}`,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
    // mode: 'no-cors'
  })
  
  let resultText = await result.text();


  console.log(`saving to file: ${exportPath}`)
  fs.writeFileSync(exportPath, resultText)
  
  res.setHeader('Content-Type', 'application/xml')
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.send(resultText)
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