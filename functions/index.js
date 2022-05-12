/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./srcFunctions/WPFunctions.ts":
/*!*************************************!*\
  !*** ./srcFunctions/WPFunctions.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TestCloud = void 0;
const functions = __importStar(__webpack_require__(/*! firebase-functions */ "firebase-functions"));
const node_fetch_1 = __importDefault(__webpack_require__(/*! node-fetch */ "node-fetch"));
// // import * as fs from 'fs'
// // import * as path from 'path'
// import './common/FBF_Helpers'
// import { DeWonder, ExampleRequest, WonderQueryParam_Util, WonderRequest } from './common/WonderData'
// import { exec } from 'child_process'
// import * as crypto from 'crypto'
// import { Database } from './common/WonderData/WonderDataImports';
// import { initializeApp, cert, ServiceAccount } from 'firebase-admin/app';
// import * as FirebaseStorage from 'firebase-admin/storage';
// // // Start writing Firebase Functions
// // // https://firebase.google.com/docs/functions/typescript
// import { FirebaseServiceAccountCreds } from './firebaseAdminCreds';
// initializeApp({
//   credential: cert(FirebaseServiceAccountCreds as any),
//   storageBucket: 'gs://gdsn3-22.appspot.com'
// });
// let firebaseStorage = FirebaseStorage.getStorage()
// let bucket = firebaseStorage.bucket()
// //
// console.log('test')
// let database = new Database({
//   async readFile<T>(filePath) {
//     if (filePath.startsWith('./')) {
//       filePath = filePath.substring(2)
//     }
//     if (filePath.startsWith('/')) {
//       filePath = filePath.substring(1)
//     }
//     // let absPath = path.resolve(__dirname, `../data/`, filePath);
//     let reference = bucket.file("data/" + filePath);
//     if (!(await reference.exists())) {//(!fs.existsSync(absPath)) {
//       return { error: `File doesn't exist: ${filePath}` }
//     }
//     // let data = await fs.promises.readFile(absPath)
//     // return JSON.parse(data.toString())
//     let [buffer] = await reference.download()
//     let result = buffer.toString()
//     return JSON.parse(result) as T;
//   },
//   async writeFile<T>(filePath: string, data: string | T) {
//     if (filePath.startsWith('./')) {
//       filePath = filePath.substring(2)
//     }
//     if (filePath.startsWith('/')) {
//       filePath = filePath.substring(1)
//     }
//     // let absPath = path.resolve(__dirname, `../data/`, filePath);
//     let reference = bucket.file("data/" + filePath);
//     let buffer = Buffer.from(typeof data == 'string' ? data : JSON.stringify(data), 'utf-8');
//     return new Promise((acc) => {
//       let blobStream = reference.createWriteStream({
//         resumable: false
//       })
//       blobStream.on('finish', () => {
//         acc("Success")
//       })
//         .on('error', (e) => {
//           acc(`Unable to upload file: ${JSON.stringify(e)}`)
//         })
//         .end(buffer)
//     })
//     // await uploadFirebaseFile(typeof data == 'string' ? data : JSON.stringify(data), filePath)//await fs.promises.writeFile(absPath, )
//     // return 'success';
//   },
//   async exists(filePath: string) {
//     if (filePath.startsWith('./')) {
//       filePath = filePath.substring(2)
//     }
//     if (filePath.startsWith('/')) {
//       filePath = filePath.substring(1)
//     }
//     let reference = bucket.file("data/" + filePath);
//     return (await reference.exists())[0]//firebaseFileExists(pathName)// return fs.existsSync(absPath)
//   }
// })
// export const listener = functions.https.onRequest(async (req, res) => {
//   res.setHeader('Content-Type', 'application/xml')
//   let exampleParams: [string, string[]][] = ExampleRequest.replace('</request-parameters>', '').replace('<request-parameters>', '').replaceAll('<value/>', '<value></value>').replaceAll('<parameter>', '').replaceAll('</name>', '').replaceAll('</value>', '').replaceAll('<name>', '').split('</parameter>').map(str => {
//     let tmp = str.split('<value>');
//     let name = tmp[0]
//     let rest = tmp.slice(1)
//     return [name, rest]
//   })
//   let reqTestParams = new WonderRequest().groupBy('Year').groupBy('Race').addParam('F_D76.V25', WonderQueryParam_Util.All).toParamMap()
//   let requestParams: Map<string, string[]> = new Map();
//   let inconsistencies: string[] = []
//   exampleParams.forEach((value: [string, string[]]) => {
//     if (!reqTestParams.has(value[0])) {
//       inconsistencies.push(`Request missing ${value[0]}`)
//     }
//     requestParams.set(value[0], value[1])
//   });
//   for (let exParamName in reqTestParams.keys()) {
//     if (!requestParams.has(exParamName)) {
//       inconsistencies.push(`Examples missing ${exParamName}`)
//     }
//   }
//   res.setHeader('Content-Type', 'application/json')
//   res.send(JSON.stringify(inconsistencies))
// })
// export const ReqTest = functions.https.onRequest(async (req, res) => {
//   // res.setHeader('Content-Type', 'application/xml')
//   // res.send(new WonderRequest().groupBy('Year').addParam('M_1', 'D76.M1').toString())
//   res.send(await database.fileAccessor.writeFile("test.json", { myBigData: "Stuff and things" }))
// })
// export const RonaTest = functions.https.onRequest(async (req, res) => {
//   let data = await new WonderRequest().groupBy('Year').groupBy('AgeGroups').filterByYear(['1999', '2001']).request()
//   // let exportPath = path.resolve(__dirname, '../data/exampleResponse.xml');
//   // console.log(`saving to file${exportPath}`)
//   // fs.writeFileSync(exportPath, JSON.stringify(data))
//   // console.log('saved')
//   res.setHeader('Content-Type', 'application/json')
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.send(data)
// })
// function requestToFileName(fetchBody: string) {
//   console.log(`Req to file name\n${fetchBody}`)
//   return crypto.createHash('md5').update(fetchBody).digest("hex");
// }
// export const WonderProxy = functions.https.onRequest(async (req, res) => {
//   let fetchBody = req.body['request_xml']
//   // console.log(`Fetch body: ${fetchBody}`)
//   let fileName = requestToFileName(fetchBody)
//   // let fileDirectory = path.resolve(__dirname, `../data/xml/`)
//   // if (!fs.existsSync(fileDirectory)) {
//   //   fs.mkdirSync(fileDirectory)
//   // }
//   // let exportPath = path.resolve(fileDirectory, `${fileName}.xml`);
//   if (await database.fileAccessor.exists(fileName)) {
//     console.log(`Using cache for request ${fileName}`)
//     res.setHeader('Content-Type', 'application/xml')
//     res.setHeader('Access-Control-Allow-Origin', '*')
//     res.send(await database.fileAccessor.readFile(fileName))
//     return;
//   }
//   // console.log(`Sending query to wonder:\n${fetchBody}`)
//   let result = await fetch(`https://wonder.cdc.gov/controller/datarequest/D76`, {
//     method: 'POST',
//     body: `request_xml=${fetchBody}`,
//     headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
//     // mode: 'no-cors'
//   })
//   let resultText = await result.text();
//   // console.log(`saving to file: ${exportPath}`)
//   database.fileAccessor.writeFile(fileName, resultText)
//   res.setHeader('Content-Type', 'application/xml')
//   res.setHeader('Access-Control-Allow-Origin', '*')
//   res.send(resultText)
// })
// export const Data = functions.https.onRequest(async (req, resp) => {
//   resp.setHeader('Content-Type', 'application/json')
//   resp.setHeader('Access-Control-Allow-Origin', '*')
//   // let name = req.path.startsWith('.')
//   let filePath = req.path.startsWith("/") ? req.path.substring(1) : req.path
//   console.log(filePath)
//   switch (req.method) {
//     case 'GET':
//       if (!(await database.fileAccessor.exists(filePath))) {
//         resp.send(`No file ${filePath}`)
//       }
//       let file = await database.fileAccessor.readFile(filePath)
//       resp.send(file)
//       break;
//     case 'POST':
//       let data = typeof req.body == 'string' ? req.body : JSON.stringify(req.body)
//       try {
//         resp.send(await database.fileAccessor.writeFile(filePath, data))
//       } catch (err) {
//         resp.send(`Failed to save data ${JSON.stringify(err)}`)
//       }
//       break;
//     default:
//       resp.send(`Unknown method ${req.method}`)
//   }
// })
// // export const DataExists = functions.https.onRequest(async (req, resp) => {
// //   resp.setHeader('Content-Type', 'application/json')
// //   resp.setHeader('Access-Control-Allow-Origin', '*')
// //   // let name = req.path.startsWith('.')
// //   let file = path.resolve(__dirname, '../data/', '.' + req.path)
// //   console.log(`Checking if ${file} exists`)
// //   switch (req.method) {
// //     case 'GET':
// //       if (!fs.existsSync(file)) {
// //         resp.send(`false`)
// //         return;
// //       }
// //       resp.send('true')
// //       break;
// //       break;
// //     default:
// //       resp.send(`Unknown method ${req.method}`)
// //   }
// // })
// export const Diseases = functions.https.onRequest(async (req, resp) => {
//   let codes = await database.pullIcdCodes(10)
//   resp.setHeader('Content-Type', 'application/json')
//   resp.setHeader('Access-Control-Allow-Origin', '*')
//   resp.send(JSON.stringify(codes))
// })
exports.TestCloud = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let stuff = yield (0, node_fetch_1.default)('https://www.google.com');
    let txt = yield stuff.text();
    res.send("IT works!\n" + txt);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV1BGdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmNGdW5jdGlvbnMvV1BGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLDhEQUFnRDtBQUNoRCw0REFBOEI7QUFFOUIsOEJBQThCO0FBQzlCLGtDQUFrQztBQUNsQyxnQ0FBZ0M7QUFDaEMsdUdBQXVHO0FBQ3ZHLHVDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsb0VBQW9FO0FBQ3BFLDRFQUE0RTtBQUM1RSw2REFBNkQ7QUFDN0QseUNBQXlDO0FBQ3pDLDhEQUE4RDtBQUM5RCxzRUFBc0U7QUFFdEUsa0JBQWtCO0FBQ2xCLDBEQUEwRDtBQUMxRCwrQ0FBK0M7QUFDL0MsTUFBTTtBQUNOLHFEQUFxRDtBQUNyRCx3Q0FBd0M7QUFFeEMsS0FBSztBQUNMLHNCQUFzQjtBQUV0QixnQ0FBZ0M7QUFDaEMsa0NBQWtDO0FBQ2xDLHVDQUF1QztBQUN2Qyx5Q0FBeUM7QUFDekMsUUFBUTtBQUNSLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsUUFBUTtBQUNSLHNFQUFzRTtBQUN0RSx1REFBdUQ7QUFDdkQsc0VBQXNFO0FBQ3RFLDREQUE0RDtBQUM1RCxRQUFRO0FBQ1Isd0RBQXdEO0FBQ3hELDRDQUE0QztBQUU1QyxnREFBZ0Q7QUFDaEQscUNBQXFDO0FBQ3JDLHNDQUFzQztBQUN0QyxPQUFPO0FBQ1AsNkRBQTZEO0FBQzdELHVDQUF1QztBQUN2Qyx5Q0FBeUM7QUFDekMsUUFBUTtBQUNSLHNDQUFzQztBQUN0Qyx5Q0FBeUM7QUFDekMsUUFBUTtBQUNSLHNFQUFzRTtBQUN0RSx1REFBdUQ7QUFDdkQsZ0dBQWdHO0FBQ2hHLG9DQUFvQztBQUNwQyx1REFBdUQ7QUFDdkQsMkJBQTJCO0FBQzNCLFdBQVc7QUFDWCx3Q0FBd0M7QUFDeEMseUJBQXlCO0FBQ3pCLFdBQVc7QUFDWCxnQ0FBZ0M7QUFDaEMsK0RBQStEO0FBQy9ELGFBQWE7QUFDYix1QkFBdUI7QUFDdkIsU0FBUztBQUVULDJJQUEySTtBQUMzSSwyQkFBMkI7QUFDM0IsT0FBTztBQUNQLHFDQUFxQztBQUNyQyx1Q0FBdUM7QUFDdkMseUNBQXlDO0FBQ3pDLFFBQVE7QUFDUixzQ0FBc0M7QUFDdEMseUNBQXlDO0FBQ3pDLFFBQVE7QUFDUix1REFBdUQ7QUFDdkQseUdBQXlHO0FBQ3pHLE1BQU07QUFDTixLQUFLO0FBRUwsMEVBQTBFO0FBQzFFLHFEQUFxRDtBQUNyRCwrVEFBK1Q7QUFDL1Qsc0NBQXNDO0FBQ3RDLHdCQUF3QjtBQUN4Qiw4QkFBOEI7QUFDOUIsMEJBQTBCO0FBQzFCLE9BQU87QUFDUCwwSUFBMEk7QUFFMUksMERBQTBEO0FBQzFELHVDQUF1QztBQUN2QywyREFBMkQ7QUFDM0QsMENBQTBDO0FBQzFDLDREQUE0RDtBQUM1RCxRQUFRO0FBQ1IsNENBQTRDO0FBQzVDLFFBQVE7QUFDUixvREFBb0Q7QUFDcEQsNkNBQTZDO0FBQzdDLGdFQUFnRTtBQUNoRSxRQUFRO0FBQ1IsTUFBTTtBQUdOLHNEQUFzRDtBQUN0RCw4Q0FBOEM7QUFDOUMsS0FBSztBQUNMLHlFQUF5RTtBQUN6RSx3REFBd0Q7QUFDeEQsMEZBQTBGO0FBQzFGLG9HQUFvRztBQUNwRyxLQUFLO0FBQ0wsMEVBQTBFO0FBQzFFLHVIQUF1SDtBQUd2SCxnRkFBZ0Y7QUFDaEYsa0RBQWtEO0FBQ2xELDBEQUEwRDtBQUMxRCw0QkFBNEI7QUFDNUIsc0RBQXNEO0FBQ3RELHNEQUFzRDtBQUN0RCxtQkFBbUI7QUFDbkIsS0FBSztBQUVMLGtEQUFrRDtBQUVsRCxrREFBa0Q7QUFDbEQscUVBQXFFO0FBQ3JFLElBQUk7QUFDSiw2RUFBNkU7QUFDN0UsNENBQTRDO0FBQzVDLCtDQUErQztBQUMvQyxnREFBZ0Q7QUFDaEQsbUVBQW1FO0FBQ25FLDRDQUE0QztBQUM1QyxxQ0FBcUM7QUFDckMsU0FBUztBQUNULHdFQUF3RTtBQUN4RSx3REFBd0Q7QUFDeEQseURBQXlEO0FBQ3pELHVEQUF1RDtBQUN2RCx3REFBd0Q7QUFFeEQsK0RBQStEO0FBQy9ELGNBQWM7QUFDZCxNQUFNO0FBQ04sNkRBQTZEO0FBQzdELG9GQUFvRjtBQUNwRixzQkFBc0I7QUFDdEIsd0NBQXdDO0FBQ3hDLHFHQUFxRztBQUNyRyx5QkFBeUI7QUFDekIsT0FBTztBQUVQLDBDQUEwQztBQUcxQyxvREFBb0Q7QUFDcEQsMERBQTBEO0FBRTFELHFEQUFxRDtBQUNyRCxzREFBc0Q7QUFDdEQseUJBQXlCO0FBQ3pCLEtBQUs7QUFDTCx1RUFBdUU7QUFFdkUsdURBQXVEO0FBQ3ZELHVEQUF1RDtBQUN2RCwyQ0FBMkM7QUFDM0MsK0VBQStFO0FBQy9FLDBCQUEwQjtBQUMxQiwwQkFBMEI7QUFDMUIsa0JBQWtCO0FBRWxCLCtEQUErRDtBQUMvRCwyQ0FBMkM7QUFDM0MsVUFBVTtBQUNWLGtFQUFrRTtBQUNsRSx3QkFBd0I7QUFDeEIsZUFBZTtBQUNmLG1CQUFtQjtBQUNuQixxRkFBcUY7QUFDckYsY0FBYztBQUNkLDJFQUEyRTtBQUMzRSx3QkFBd0I7QUFDeEIsa0VBQWtFO0FBQ2xFLFVBQVU7QUFDVixlQUFlO0FBQ2YsZUFBZTtBQUNmLGtEQUFrRDtBQUNsRCxNQUFNO0FBRU4sS0FBSztBQUNMLGdGQUFnRjtBQUVoRiwwREFBMEQ7QUFDMUQsMERBQTBEO0FBQzFELDhDQUE4QztBQUM5QyxzRUFBc0U7QUFDdEUsaURBQWlEO0FBQ2pELDZCQUE2QjtBQUM3QixxQkFBcUI7QUFDckIsdUNBQXVDO0FBQ3ZDLGdDQUFnQztBQUNoQyxxQkFBcUI7QUFDckIsYUFBYTtBQUNiLDZCQUE2QjtBQUM3QixrQkFBa0I7QUFFbEIsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUNsQixxREFBcUQ7QUFDckQsU0FBUztBQUVULFFBQVE7QUFDUiwyRUFBMkU7QUFDM0UsZ0RBQWdEO0FBQ2hELHVEQUF1RDtBQUN2RCx1REFBdUQ7QUFFdkQscUNBQXFDO0FBQ3JDLEtBQUs7QUFDUSxRQUFBLFNBQVMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFPLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtJQUNsRSxJQUFJLEtBQUssR0FBRyxNQUFNLElBQUEsb0JBQUssRUFBQyx3QkFBd0IsQ0FBQyxDQUFBO0lBQ2pELElBQUksR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFBO0lBQzVCLEdBQUcsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBRWxDLENBQUMsQ0FBQSxDQUFDLENBQUEifQ==

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("firebase-functions");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./srcFunctions/WPFunctions.ts");
/******/ 	var __webpack_export_target__ = this;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map