/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./srcFunctions/WPFunctions.ts":
/*!*************************************!*\
  !*** ./srcFunctions/WPFunctions.ts ***!
  \*************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HashTypes = exports.DataChannels = exports.WonderProxy = exports.RonaTest = exports.ReqTest = exports.listener = void 0;
const functions = __webpack_require__(/*! firebase-functions */ "firebase-functions");
const node_fetch_1 = __webpack_require__(/*! node-fetch */ "node-fetch");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
__webpack_require__(/*! ./common/FBF_Helpers */ "./srcFunctions/common/FBF_Helpers.ts");
const WonderData_1 = __webpack_require__(/*! ./common/WonderData */ "./srcFunctions/common/WonderData.ts");
const child_process_1 = __webpack_require__(/*! child_process */ "child_process");
const crypto = __webpack_require__(/*! crypto */ "crypto");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
console.log('test');
exports.listener = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Type', 'application/xml');
    let exampleParams = WonderData_1.ExampleRequest.replace('</request-parameters>', '').replace('<request-parameters>', '').replaceAll('<value/>', '<value></value>').replaceAll('<parameter>', '').replaceAll('</name>', '').replaceAll('</value>', '').replaceAll('<name>', '').split('</parameter>').map(str => {
        let tmp = str.split('<value>');
        let name = tmp[0];
        let rest = tmp.slice(1);
        return [name, rest];
    });
    let reqTestParams = new WonderData_1.WonderRequest().groupBy('Year').groupBy('Race').addParam('F_D76.V25', WonderData_1.WonderQueryParam_Util.All).toParamMap();
    let requestParams = new Map();
    let inconsistencies = [];
    exampleParams.forEach((value) => {
        if (!reqTestParams.has(value[0])) {
            inconsistencies.push(`Request missing ${value[0]}`);
        }
        requestParams.set(value[0], value[1]);
    });
    for (let exParamName in reqTestParams.keys()) {
        if (!requestParams.has(exParamName)) {
            inconsistencies.push(`Examples missing ${exParamName}`);
        }
    }
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(inconsistencies));
}));
exports.ReqTest = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.setHeader('Content-Type', 'application/xml');
    res.send(new WonderData_1.WonderRequest().groupBy('Year').addParam('M_1', 'D76.M1').toString());
}));
exports.RonaTest = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let data = yield new WonderData_1.WonderRequest().groupBy('Year').groupBy('AgeGroups').filterByYear(['1999', '2001']).request();
    let exportPath = path.resolve(__dirname, '../data/exampleResponse.xml');
    console.log(`saving to file${exportPath}`);
    fs.writeFileSync(exportPath, JSON.stringify(data));
    console.log('saved');
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(data);
}));
function requestToFileName(fetchBody) {
    console.log(`Req to file name\n${fetchBody}`);
    return crypto.createHash('md5').update(fetchBody).digest("hex");
}
exports.WonderProxy = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fetchBody = req.body['request_xml'];
    console.log(`Fetch body: ${fetchBody}`);
    let fileName = requestToFileName(fetchBody);
    let exportPath = path.resolve(__dirname, `../data/${fileName}.xml`);
    if (fs.existsSync(exportPath)) {
        console.log(`Using cache for request ${fileName}`);
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.sendFile(exportPath);
        return;
    }
    console.log(`Sending query to wonder:\n${fetchBody}`);
    let result = yield (0, node_fetch_1.default)(`https://wonder.cdc.gov/controller/datarequest/D76`, {
        method: 'POST',
        body: `request_xml=${fetchBody}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
        // mode: 'no-cors'
    });
    let resultText = yield result.text();
    console.log(`saving to file: ${exportPath}`);
    fs.writeFileSync(exportPath, resultText);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(resultText);
}));
exports.DataChannels = functions.https.onRequest((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
}));
exports.HashTypes = functions.https.onRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, child_process_1.exec)('openssl list -digest-algorithms', (err, stdout, stderr) => {
        if (err) {
            console.log('err', err);
            res.send(JSON.stringify({ status: 'Error', error: err }));
            return;
        }
        if (stderr) {
            console.log('stderr', stderr);
            res.send(JSON.stringify({ status: 'STDError', error: stderr }));
            return;
        }
        console.log('success', stdout);
        res.send(JSON.stringify({ status: 'Success', value: stdout }));
    });
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV1BGdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmNGdW5jdGlvbnMvV1BGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELDJDQUE4QjtBQUU5Qix5QkFBd0I7QUFDeEIsNkJBQTRCO0FBQzVCLGdDQUE2QjtBQUM3QixvREFBb0c7QUFDcEcsaURBQW9DO0FBQ3BDLGlDQUFnQztBQUVoQyxzQ0FBc0M7QUFDdEMsMkRBQTJEO0FBQzNELEVBQUU7QUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRU4sUUFBQSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbkUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtJQUNoRCxJQUFJLGFBQWEsR0FBeUIsMkJBQWMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdFQsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsSUFBSSxJQUFJLEdB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

/***/ }),

/***/ "./srcFunctions/common/FBF_Helpers.ts":
/*!********************************************!*\
  !*** ./srcFunctions/common/FBF_Helpers.ts ***!
  \********************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceAllInString = exports.isAllTrue = exports.XmlToJson = exports.concactinate = exports.flatten = exports.ensureFBF_Helpers = void 0;
const Xml2JS = __webpack_require__(/*! xml2js */ "xml2js").parseString;
Array.prototype.forEachAsync = function (onEach) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < this.length; i++) {
            yield onEach(this[i], i, this);
        }
    });
};
Map.prototype.keysAsArray = function () {
    let ths = this;
    let out = [];
    for (let key of ths.keys()) {
        out.push(key);
    }
    return out;
};
Array.prototype.mapOrDrop = function (shouldKeep) {
    let ths = this;
    let out = [];
    for (let i = 0; i < ths.length; i++) {
        let fresh = shouldKeep(this[i], i);
        if (fresh == 'DROP') {
            // console.log(`Dropping ${i}`,this[i])
        }
        else {
            out.push(fresh);
        }
    }
    return out;
};
Map.prototype.getWithDefault = function (key, defaultValue) {
    let ths = this;
    if (!ths.has(key)) {
        ths.set(key, defaultValue(key));
    }
    return ths.get(key);
};
Array.prototype.pushAll = function (stuff) {
    if (Array.isArray(stuff)) {
        for (let item of stuff) {
            this.push(item);
        }
    }
    else {
        this.push(stuff);
    }
};
String.prototype.isBoolean = function () {
    return this.toLowerCase() == 'true' || this.toLowerCase() == 'false';
};
String.prototype.isNumber = function () {
    return !Number.isNaN(Number(this));
};
if (typeof Map.prototype.toArray == 'undefined') {
    console.log(`Shimming Map.toArray`);
    Map.prototype.toArray = function () {
        let ths = this;
        let out = [];
        for (let key of ths.keys()) {
            out.push([key, ths.get(key)]);
        }
        return out;
    };
}
function ensureFBF_Helpers() {
    console.log();
}
exports.ensureFBF_Helpers = ensureFBF_Helpers;
function flatten(arr) {
    let out = [];
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            out.push(arr[i][j]);
        }
    }
    return out;
}
exports.flatten = flatten;
function concactinate(a, b) {
    let out = [];
    a.forEach((aa) => {
        out.push(aa);
    });
    b.forEach((bb) => {
        out.push(bb);
    });
    return out;
}
exports.concactinate = concactinate;
function XmlToJson(xml) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((acc, rej) => {
            Xml2JS(`<data>${xml}</data>`, (err, value) => {
                if (err) {
                    rej(err);
                }
                else {
                    // console.log('cleaning',value)
                    // let result = cleanXmlToJson(value) as XmlElement;
                    acc(value.data);
                }
            });
        });
    });
}
exports.XmlToJson = XmlToJson;
if (typeof String.prototype.replaceAll == 'undefined') {
    String.prototype.replaceAll = function (a, b) {
        return this.split(a).join(b);
    };
}
function isAllTrue(bools) {
    for (let i = 0; i < bools.length; i++) {
        if (bools[i]) {
            return true;
        }
    }
    return false;
}
exports.isAllTrue = isAllTrue;
function replaceAllInString(target, a, b) {
    return target.split(a).join(b);
}
exports.replaceAllInString = replaceAllInString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJGX0hlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmNGdW5jdGlvbnMvY29tbW9uL0ZCRl9IZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUM7QUF1QjdDLEtBQUssQ0FBQyxTQUFTLENBQUMsWUFBWSxHQUFHLFVBQW1CLE1BQWdFOztRQUM5RyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO1NBQ2pDO0lBQ0wsQ0FBQztDQUFBLENBQUE7QUFDRCxHQUFHLENBQUMsU0FBUyxDQUFDLFdBQVcsR0FBRztJQUN4QixJQUFJLEdBQUcsR0FBRyxJQUFpQixDQUFBO0lBQzNCLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQTtJQUNqQixLQUFLLElBQUksR0FBRyxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUN4QixHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO0tBQ2hCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDLENBQUE7QUFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsR0FBRyxVQUFnQixVQUFxRDtJQUM3RixJQUFJLEdBQUcsR0FBRyxJQUFnQixDQUFBO0lBQzFCLElBQUksR0FBRyxHQUFRLEVBQUUsQ0FBQTtJQUNqQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxJQUFJLEtBQUssR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1FBQ2xDLElBQUksS0FBSyxJQUFJLE1BQU0sRUFBRTtZQUNqQix1Q0FBdUM7U0FDMUM7YUFBTTtZQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDbEI7S0FDSjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2YsQ0FBQyxDQUFBO0FBQ0QsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEdBQUcsVUFBZ0IsR0FBTSxFQUFFLFlBQTJCO0lBQzlFLElBQUksR0FBRyxHQUFHLElBQWlCLENBQUE7SUFFM0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDZixHQUFHLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtLQUNsQztJQUNELE9BQU8sR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUd2QixDQUFDLENBQUE7QUFDRCxLQUFLLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxVQUFhLEtBQWM7SUFDakQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7U0FDbEI7S0FDSjtTQUFNO1FBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtLQUNuQjtBQUNMLENBQUMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHO0lBQ3pCLE9BQU8sSUFBSSxDQUFDLFdBQVcsRUFBRSxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFLElBQUksT0FBTyxDQUFBO0FBQ3hFLENBQUMsQ0FBQTtBQUNELE1BQU0sQ0FBQyxTQUFTLENBQUMsUUFBUSxHQUFHO0lBQ3hCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFBO0FBQ3RDLENBQUMsQ0FBQTtBQUNELElBQUksT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxXQUFXLEVBQUU7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ25DLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHO1FBQ3BCLElBQUksR0FBRyxHQUFjLElBQUksQ0FBQTtRQUN6QixJQUFJLEdBQUcsR0FBa0IsRUFBRSxDQUFBO1FBQzNCLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUMsQ0FBQTtDQUNKO0FBQ0QsU0FBZ0IsaUJBQWlCO0lBQzdCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQTtBQUNqQixDQUFDO0FBRkQsOENBRUM7QUFFRCxTQUFnQixPQUFPLENBQUksR0FBVTtJQUNqQyxJQUFJLEdBQUcsR0FBUSxFQUFFLENBQUE7SUFDakIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7UUFDakMsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUN0QjtLQUNKO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBUkQsMEJBUUM7QUFDRCxTQUFnQixZQUFZLENBQUksQ0FBTSxFQUFFLENBQU07SUFDMUMsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFBO0lBQ2pCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRTtRQUNiLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7SUFDaEIsQ0FBQyxDQUFDLENBQUE7SUFDRixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7UUFDYixHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2hCLENBQUMsQ0FBQyxDQUFBO0lBQ0YsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBVEQsb0NBU0M7QUFDRCxTQUFzQixTQUFTLENBQUMsR0FBVzs7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUUsRUFBRTtZQUM1QixNQUFNLENBQUMsU0FBUyxHQUFHLFNBQVMsRUFBRSxDQUFDLEdBQUcsRUFBRSxLQUFLLEVBQUUsRUFBRTtnQkFDekMsSUFBSSxHQUFHLEVBQUU7b0JBQ0wsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2lCQUNYO3FCQUFNO29CQUNILGdDQUFnQztvQkFDaEMsb0RBQW9EO29CQUVwRCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFBO2lCQUNsQjtZQUNMLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBQUE7QUFiRCw4QkFhQztBQUVELElBQUksT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsSUFBSSxXQUFXLEVBQUU7SUFDbkQsTUFBTSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFTLEVBQUUsQ0FBUztRQUN4RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUMsQ0FBQztDQUNMO0FBQ0QsU0FBZ0IsU0FBUyxDQUFDLEtBQWdCO0lBQ3RDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ25DLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ1YsT0FBTyxJQUFJLENBQUE7U0FDZDtLQUNKO0lBQ0QsT0FBTyxLQUFLLENBQUM7QUFDakIsQ0FBQztBQVBELDhCQU9DO0FBQ0QsU0FBZ0Isa0JBQWtCLENBQUMsTUFBYyxFQUFFLENBQVMsRUFBRSxDQUFTO0lBRW5FLE9BQU8sTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7QUFFbkMsQ0FBQztBQUpELGdEQUlDIn0=

/***/ }),

/***/ "./srcFunctions/common/WonderData.ts":
/*!*******************************************!*\
  !*** ./srcFunctions/common/WonderData.ts ***!
  \*******************************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DataChannelStreaming = exports.DataChannel = exports.Database = exports.ExampleRequest = exports.ConsumableLinkedList = exports.WonderRequest = exports.DeWonder = exports.AllWonderParams = exports.WonderQueryParam_GroupBy = exports.WonderQueryParam_Race = exports.WonderQueryParam_Gender = exports.WonderQueryParam_Measure = exports.WonderQueryParam_AgeGroup = exports.WonderQueryParam_Include = exports.WonderQueryParam = exports.WonderQueryParam_Util = exports.parseYearMonthString = exports.isYearMonthString = exports.MonthEnum = exports.YearStrings = exports.MonthNames = exports.isWQP_None = void 0;
// import * as XMLParser from 'xml2js'
if (true) {
    global.fetch = __webpack_require__(/*! node-fetch */ "node-fetch");
}
const bristolboard_1 = __webpack_require__(/*! bristolboard */ "bristolboard");
const sorted_btree_1 = __webpack_require__(/*! sorted-btree */ "sorted-btree");
const FBF_Helpers_1 = __webpack_require__(/*! ./FBF_Helpers */ "./srcFunctions/common/FBF_Helpers.ts");
// export type WonderQueryParamName = (keyof typeof WonderQueryParam) 
function isWQP_None(param) {
    return (param == 'None') || (param == WonderQueryParam_Util.None);
}
exports.isWQP_None = isWQP_None;
var MonthNames;
(function (MonthNames) {
    MonthNames[MonthNames["Jan"] = 1] = "Jan";
    MonthNames[MonthNames["Feb"] = 2] = "Feb";
    MonthNames[MonthNames["Mar"] = 3] = "Mar";
    MonthNames[MonthNames["Apr"] = 4] = "Apr";
    MonthNames[MonthNames["May"] = 5] = "May";
    MonthNames[MonthNames["Jun"] = 6] = "Jun";
    MonthNames[MonthNames["Jul"] = 7] = "Jul";
    MonthNames[MonthNames["Aug"] = 8] = "Aug";
    MonthNames[MonthNames["Sep"] = 9] = "Sep";
    MonthNames[MonthNames["Oct"] = 10] = "Oct";
    MonthNames[MonthNames["Nov"] = 11] = "Nov";
    MonthNames[MonthNames["Dec"] = 12] = "Dec";
})(MonthNames = exports.MonthNames || (exports.MonthNames = {}));
function YearStrings(start = 1999, end = 2020) {
    let out = [];
    for (let i = start; i <= end; i++) {
        out.push(`${i}`);
    }
    return out;
}
exports.YearStrings = YearStrings;
var MonthEnum;
(function (MonthEnum) {
    MonthEnum[MonthEnum["January"] = 0] = "January";
    MonthEnum[MonthEnum["February"] = 1] = "February";
    MonthEnum[MonthEnum["March"] = 2] = "March";
    MonthEnum[MonthEnum["April"] = 3] = "April";
    MonthEnum[MonthEnum["May"] = 4] = "May";
    MonthEnum[MonthEnum["June"] = 5] = "June";
    MonthEnum[MonthEnum["July"] = 6] = "July";
    MonthEnum[MonthEnum["August"] = 7] = "August";
    MonthEnum[MonthEnum["September"] = 8] = "September";
    MonthEnum[MonthEnum["October"] = 9] = "October";
    MonthEnum[MonthEnum["November"] = 10] = "November";
    MonthEnum[MonthEnum["December"] = 11] = "December";
})(MonthEnum = exports.MonthEnum || (exports.MonthEnum = {}));
function isYearMonthString(str) {
    return str.split('-').length == 2;
}
exports.isYearMonthString = isYearMonthString;
function parseYearMonthString(str) {
    let parts = str.split('-');
    switch (parts.length) {
        case 0:
            return null;
        case 1:
            return [parts[0], -1];
        case 2:
            return [parts[0], MonthEnum[parts[1]]];
    }
}
exports.parseYearMonthString = parseYearMonthString;
var WonderQueryParam_Util;
(function (WonderQueryParam_Util) {
    WonderQueryParam_Util["None"] = "*None*";
    WonderQueryParam_Util["All"] = "*All*";
})(WonderQueryParam_Util = exports.WonderQueryParam_Util || (exports.WonderQueryParam_Util = {}));
var WonderQueryParam;
(function (WonderQueryParam) {
    //FIV
    WonderQueryParam["YearAndMonth"] = "D76.V1";
})(WonderQueryParam = exports.WonderQueryParam || (exports.WonderQueryParam = {}));
var WonderQueryParam_Include;
(function (WonderQueryParam_Include) {
    WonderQueryParam_Include["YearAndMonth"] = "D76.V1";
    WonderQueryParam_Include["CensusRegions"] = "D76.V10";
    WonderQueryParam_Include["ICD10Codes"] = "D76.V2";
    WonderQueryParam_Include["HHSRegions"] = "D76.V27";
    WonderQueryParam_Include["StatesAndCounties"] = "D76.V9";
})(WonderQueryParam_Include = exports.WonderQueryParam_Include || (exports.WonderQueryParam_Include = {}));
var WonderQueryParam_AgeGroup;
(function (WonderQueryParam_AgeGroup) {
    WonderQueryParam_AgeGroup["TenYear"] = "D76.V5";
    WonderQueryParam_AgeGroup["FiveYear"] = "D76.V51";
    WonderQueryParam_AgeGroup["SingleYear"] = "D76.V52";
    WonderQueryParam_AgeGroup["Infant"] = "D76.V6";
})(WonderQueryParam_AgeGroup = exports.WonderQueryParam_AgeGroup || (exports.WonderQueryParam_AgeGroup = {}));
var WonderQueryParam_Measure;
(function (WonderQueryParam_Measure) {
    WonderQueryParam_Measure["Deaths"] = "D76.M1";
    WonderQueryParam_Measure["Population"] = "D76.M2";
    WonderQueryParam_Measure["CrudeRate"] = "D76.M3";
    WonderQueryParam_Measure["CrudeRateStandardError"] = "D76.M31";
    WonderQueryParam_Measure["CrudeRate95ConfidenceInterval"] = "D76.M32";
    WonderQueryParam_Measure["AgeAdjustedRate"] = "D76.M4";
    WonderQueryParam_Measure["AgeAdjustedRateStandardError"] = "D76.M41";
    WonderQueryParam_Measure["AgeAdjustedRateConfidenceInterval"] = "D76.M42";
    WonderQueryParam_Measure["PercentOfTotalDeaths"] = "D76.M9";
})(WonderQueryParam_Measure = exports.WonderQueryParam_Measure || (exports.WonderQueryParam_Measure = {}));
var WonderQueryParam_Gender;
(function (WonderQueryParam_Gender) {
    WonderQueryParam_Gender["Male"] = "M";
    WonderQueryParam_Gender["Female"] = "F";
})(WonderQueryParam_Gender = exports.WonderQueryParam_Gender || (exports.WonderQueryParam_Gender = {}));
var WonderQueryParam_Race;
(function (WonderQueryParam_Race) {
    WonderQueryParam_Race["HispanicOrLatino"] = "2135-2";
    WonderQueryParam_Race["NotHispanicOrLatino"] = "2186-2";
    WonderQueryParam_Race["NotStated"] = "NS";
    WonderQueryParam_Race["AmericanIndianOrAlaskaNative"] = "1002-5";
    WonderQueryParam_Race["AsianOrPacificIslander"] = "A-PI";
    WonderQueryParam_Race["Black"] = "2054-5";
    WonderQueryParam_Race["White"] = "2106-3";
})(WonderQueryParam_Race = exports.WonderQueryParam_Race || (exports.WonderQueryParam_Race = {}));
var WonderQueryParam_GroupBy;
(function (WonderQueryParam_GroupBy) {
    WonderQueryParam_GroupBy["CensusRegion"] = "D76.V10-level1";
    WonderQueryParam_GroupBy["CensusDivision"] = "D76.V10-level2";
    WonderQueryParam_GroupBy["HHSRegion"] = "D76.V27-level1";
    WonderQueryParam_GroupBy["State"] = "D76.V9-level1";
    WonderQueryParam_GroupBy["County"] = "D76.V9-level2";
    WonderQueryParam_GroupBy["Urbanization2013"] = "D76.V19";
    WonderQueryParam_GroupBy["Urbanization2006"] = "D76.V11";
    WonderQueryParam_GroupBy["AgeGroups"] = "D76.V5";
    WonderQueryParam_GroupBy["Gender"] = "D76.V7";
    WonderQueryParam_GroupBy["HispanicOrigin"] = "D76.V17";
    WonderQueryParam_GroupBy["Race"] = "D76.V8";
    //timeThere 
    WonderQueryParam_GroupBy["Year"] = "D76.V1-level1";
    WonderQueryParam_GroupBy["Month"] = "D76.V1-level2";
    WonderQueryParam_GroupBy["Weekday"] = "D76.V24";
    WonderQueryParam_GroupBy["Autopsy"] = "D76.V20";
    WonderQueryParam_GroupBy["PlaceofDeath"] = "D76.V21";
    WonderQueryParam_GroupBy["ICD10"] = "D76.V2";
    WonderQueryParam_GroupBy["LeadingCausesofDeath"] = "D76.V28";
    WonderQueryParam_GroupBy["LeadingCausesofDeathInfants"] = "D76.V29";
    WonderQueryParam_GroupBy["ICDChapter"] = "D76.V2-level1";
    WonderQueryParam_GroupBy["ICDSubChapter"] = "D76.V2-level2";
    WonderQueryParam_GroupBy["CauseOfDeath"] = "D76.V2-level3";
    WonderQueryParam_GroupBy["ICD10_113CauseList"] = "D76.V4";
    WonderQueryParam_GroupBy["ICD10_130CauseListInfants"] = "D76.V12";
    WonderQueryParam_GroupBy["InjuryIntent"] = "D76.V22";
    WonderQueryParam_GroupBy["InjuryMechanismAndAllOtherLeadingCauses"] = "D76.V23";
    WonderQueryParam_GroupBy["DrugAlcoholInducedCauses"] = "D76.V25";
})(WonderQueryParam_GroupBy = exports.WonderQueryParam_GroupBy || (exports.WonderQueryParam_GroupBy = {}));
exports.AllWonderParams = [WonderQueryParam_Include, WonderQueryParam_AgeGroup, WonderQueryParam_GroupBy, , WonderQueryParam_Measure, , WonderQueryParam_Util];
let WonderQueryParam_Reversed_Cache = null;
// export function WonderQueryParam_Reversed() {
//   if (WonderQueryParam_Reversed_Cache == null) {
//     let WonderQueryParam_Reversed_Cache = {} as any
//     for (let key in WonderQueryParam) {
//       WonderQueryParam_Reversed_Cache[WonderQueryParam[key]] = key;
//     }
//   }
//   return WonderQueryParam_Reversed_Cache;
// }
function DeWonder(text) {
    let tmp = text;
    let allTranslations = [];
    for (let groupName in exports.AllWonderParams) {
        let group = exports.AllWonderParams[groupName];
        for (let key in group) {
            allTranslations.push([groupName, group[key], key]);
        }
    }
    allTranslations = allTranslations.sort((a, b) => (b[1].length - a[1].length));
    for (let item of allTranslations) {
        // console.log(`Replacing ${group[key]} with ${key}`)
        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, `F_${item[1]}`, `F_Only_${item[2]}`);
        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, `I_${item[1]}`, `I_Only_${item[2]}`);
        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, `V_${item[1]}`, `V_Only_${item[2]}`);
        tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, item[1], item[2]);
    }
    return tmp;
}
exports.DeWonder = DeWonder;
class WonderRequest {
    constructor() {
        this.params = new Map();
        this.groupByCount = 0;
        this.groupByCountLimit = 5;
        this.defaultParams = {
            'dataset_code': ['D76'],
            'B_2': [WonderQueryParam_Util.None],
            'B_3': [WonderQueryParam_Util.None],
            'B_4': [WonderQueryParam_Util.None],
            'B_5': [WonderQueryParam_Util.None],
            'O_age': [WonderQueryParam_AgeGroup.TenYear],
            'O_location': [WonderQueryParam_Include.StatesAndCounties],
            'O_aar_pop': ['0000'],
            // 'O_aar_enable': ['false'],
            'O_urban': [WonderQueryParam_GroupBy.Urbanization2013],
            // 'O_aar_CI': ['true'],
            'action-Send': ['Send'],
            // 'O_aar_SE': ['true'],
            'O_aar': ['aar_none'],
            'M_1': [WonderQueryParam_Measure.Deaths],
            'M_2': [WonderQueryParam_Measure.Population],
            'M_3': [WonderQueryParam_Measure.CrudeRate],
            'O_V10_fmode': ['freg'],
            'O_V1_fmode': ['freg'],
            'O_V25_fmode': ['freg'],
            'O_V27_fmode': ['freg'],
            'O_V2_fmode': ['freg'],
            'O_V9_fmode': ['freg'],
            'O_oc-sect1-request': ['close'],
            'O_precision': ['1'],
            'O_rate_per': ['100000'],
            'O_show_supressed': ['true'],
            'O_show_totals': ['false'],
            'O_show_zeros': ['true'],
            'O_timeout': ['600'],
            'O_title': ['Example1'],
            'O_javascript': ['off'],
            'O_ucd': [WonderQueryParam_Include.ICD10Codes],
            'F_D76.V1': [WonderQueryParam_Util.All],
            'F_D76.V10': [WonderQueryParam_Util.All],
            'F_D76.V2': [WonderQueryParam_Util.All],
            'F_D76.V9': [WonderQueryParam_Util.All],
            'V_D76.V7': [WonderQueryParam_Util.All],
            'V_D76.V8': [WonderQueryParam_Util.All],
            'V_D76.V9': [],
            'V_D76.V6': ['00'],
            'V_D76.V52': [WonderQueryParam_Util.All],
            'V_D76.V5': [WonderQueryParam_Util.All],
            'V_D76.V51': [WonderQueryParam_Util.All],
            'V_D76.V17': [WonderQueryParam_Util.All],
            'V_D76.V19': [WonderQueryParam_Util.All],
            'V_D76.V2': [],
            'V_D76.V20': [WonderQueryParam_Util.All],
            'V_D76.V21': [WonderQueryParam_Util.All],
            'V_D76.V22': [WonderQueryParam_Util.All],
            'V_D76.V23': [WonderQueryParam_Util.All],
            'V_D76.V24': [WonderQueryParam_Util.All],
            'V_D76.V25': [],
            'F_D76.V27': [WonderQueryParam_Util.All],
            'O_show_suppressed': ['true'],
            //values for non-standard age-adjusted rates
            // 'VM_D76.M6_D76.V1_S': ['2004'],// [WonderQueryParam_Util.All],//years
            // 'VM_D76.M6_D76.V17': [WonderQueryParam_Util.All],//Hispanic Origin
            // 'VM_D76.M6_D76.V7': [WonderQueryParam_Util.All],//Gender
            // 'VM_D76.M6_D76.V8': [WonderQueryParam_Util.All],//Race
            'finder-stage-D76.V1': ['codeset'],
            'finder-stage-D76.V10': ['codeset'],
            'finder-stage-D76.V2': ['codeset'],
            'finder-stage-D76.V25': ['codeset'],
            'finder-stage-D76.V27': ['codeset'],
            'finder-stage-D76.V9': ['codeset'],
            'saved_id': [],
            'stage': ['request']
        };
        this.defaultFIVParams = {};
    }
    addParam(name, value) {
        if (typeof value == 'string') {
            this.params.set(name, [value]);
        }
        else {
            this.params.set(name, value);
        }
        return this;
    }
    urbanBy(version) {
        let vCode = WonderQueryParam_GroupBy[version];
        this.addParam('O_urban', vCode);
        return this;
    }
    enableAgeAdjustedRate(isEnabled, confidenceInterval95 = isEnabled, standardError = isEnabled) {
        this.addParam('O_aar_enable', isEnabled ? 'true' : 'false');
        this.addParam('O_aar_CI', confidenceInterval95 ? 'true' : 'false');
        this.addParam('O_aar_SE', standardError ? 'true' : 'false');
        return this;
    }
    ageAdjustedRate(rateBy) {
        this.addParam('O_arr', rateBy);
        return this;
    }
    population(yearOfPopulationCount) {
        this.addParam('O_aar_pop', yearOfPopulationCount);
        return this;
    }
    locationBy(locByName) {
        let locBy = WonderQueryParam_Include[locByName];
        this.params.set('O_Location', [locBy]);
        return this;
    }
    includeDates(dates) {
        let paramName = `F_${WonderQueryParam_Include.YearAndMonth}`;
        if (dates == 'all') {
            this.params.set(paramName, [WonderQueryParam_Util.All]);
            return;
        }
        return this;
    }
    enableJavascript(enabled) {
        this.addParam('O_javascript', enabled ? 'on' : 'off');
        return this;
    }
    measure(measureBy) {
        let paramName = `M_${measureBy.replace('D.76.M', '')}`;
        this.addParam(paramName, WonderQueryParam_Measure[measureBy]);
    }
    causeOfDeathBy(deathBy) {
        let code = deathBy in WonderQueryParam_Include ? WonderQueryParam_Include[deathBy] : WonderQueryParam_GroupBy[deathBy];
        this.addParam('O_ucd', [code]);
        return this;
    }
    ageGroups(groupName) {
        this.addParam(`O_age`, [WonderQueryParam_AgeGroup[groupName]]);
        return this;
    }
    filterByYear(years) {
        //let val = (typeof years == 'string') ? years : years.map(y => `${y} (${y})`).join(' ')
        // return this.addParam('I_D76.V1', val);
        return this.addParam(`F_D76.V1`, years);
    }
    groupBy(groupByName) {
        if (this.groupByCount >= this.groupByCountLimit) {
            throw new Error(`Cannot group by more than ${this.groupByCountLimit}`);
        }
        let parameterName = `B_${this.groupByCount + 1}`;
        if (isWQP_None(groupByName)) {
            this.addParam(parameterName, WonderQueryParam_Util.None);
        }
        else if (WonderQueryParam_GroupBy[groupByName]) {
            let param = WonderQueryParam_GroupBy[groupByName];
            this.addParam(parameterName, param);
        }
        else {
            this.addParam(parameterName, groupByName);
        }
        this.groupByCount++;
        return this;
    }
    toParamMap() {
        this.setDefaults();
        return this.params;
    }
    alternatives(k) {
        if (k.length < 3) {
            return [k];
        }
        let start = k.substring(0, 2);
        let rest = k.substring(2);
        switch (start) {
            case 'F_':
                return [k, `I_${rest}`, `V_${rest}`];
            case 'I_':
                return [k, `F_${rest}`, `V_${rest}`];
            case 'V_':
                return [k, `I_${rest}`, `F_${rest}`];
            default:
                return [k];
        }
    }
    setDefaults() {
        let ths = this;
        for (let key in this.defaultParams) {
            if (!((0, FBF_Helpers_1.isAllTrue)(ths.alternatives(key).map((altKey) => {
                // console.log(`Checking alternative ${altKey}`)
                if (ths.params.has(altKey)) {
                    // console.log(`----Alt Found ${altKey}`)
                }
                return ths.params.has(altKey);
            })))) {
                // console.log(`Defaulting ${key} (${DeWonder(key)}) to ${this.defaultParams[key]}`)
                this.params.set(key, this.defaultParams[key]);
            }
        }
    }
    toString() {
        // console.log(`Building query string`)
        let ths = this;
        let toProcess = [];
        let processed = new Map();
        let name;
        let keyList = new ConsumableLinkedList(this.params.keys());
        keyList.consume((key) => {
            if (key.startsWith('B_')) {
                toProcess.push([key, ths.params.get(key)]);
                return true;
            }
            return false;
        });
        // for (let i = 1; i <= 5; i++) {
        //   name = `B_${i}`
        //   toProcess.push([name, this.params.has(name) ? this.params.get(name) : [WonderQueryParam_Util.None]])
        //   processed.set(name, true)
        // }
        // for (let key of this.params.keys()) {
        //   if (key.startsWith('M_')) {
        //     toProcess.push([key, this.params.get(key)])
        //     processed.set(key, true)
        //   }
        // }
        keyList.consume((key) => {
            if (key.startsWith('M_')) {
                toProcess.push([key, ths.params.get(key)]);
                return true;
            }
            return false;
        });
        keyList.consume((key) => {
            if (key.startsWith('O_')) {
                toProcess.push([key, ths.params.get(key)]);
                return true;
            }
            return false;
        });
        keyList.consume((key) => {
            if (key.startsWith('F_') || key.startsWith('I_') || key.startsWith('V_')) {
                toProcess.push([key, ths.params.get(key)]);
                return true;
            }
            return false;
        });
        keyList.consume((key) => {
            // console.log(`Uordered parameter ${key}`)
            toProcess.push([key, ths.params.get(key)]);
            return true;
        });
        // for (let key of this.params.keys()) {
        //   if (!processed.has(key)) {
        //     toProcess.push([key, this.params.get(key)])
        //   }
        // }
        // console.log(`Full Query:\n${toProcess.map((param: [string, string[]]) => `${param[0]}(${DeWonder(param[0])}) = \n${param[1].join('\n--')}\n`)}`)
        return toProcess.map((param, index) => {
            // console.log(`Mapping ${param[0]} (${DeWonder(param[0])}) to `, param[1])
            return `<parameter><name>${param[0]}</name>${param[1].length > 0 ? param[1].map(str => `<value>${str}</value>`).join('') : '<value />'}</parameter>`;
        }).join('');
    }
    requestTable(setDefaults = true, clientSide = false) {
        return __awaiter(this, void 0, void 0, function* () {
            return WonderRequest.toTable(yield this.request(setDefaults, clientSide));
        });
    }
    request(setDefaults = true, clientSide = false) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.params.has('B_1')) {
                throw new Error(`Please group by at least one property`);
            }
            if (setDefaults) {
                this.setDefaults();
            }
            let reqPartOfBody = this.toString();
            // console.log(`Requesting`, reqPartOfBody)
            // console.log(`Query: ${reqPartOfBody}`)
            let fetchBody = `request_xml=<request-parameters><parameter>
        <name>accept_datause_restrictions</name>
        <value>true</value>
        </parameter>${reqPartOfBody}</request-parameters>`;
            let result = yield fetch(clientSide ? `http://${location.hostname}:5001/gdsn3-22/us-central1/WonderProxy` : `https://wonder.cdc.gov/controller/datarequest/D76`, {
                method: 'POST',
                body: fetchBody,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
                // mode: 'no-cors'
            });
            console.log(result.status + " " + result.statusText);
            let textResult = yield result.text();
            // console.log(textResult);
            // let jsonValue = await XMLParser.parseStringPromise(textResult, {})
            // console.log('JSON__________----')
            // console.log(jsonValue)
            let json = yield (0, FBF_Helpers_1.XmlToJson)(textResult);
            return json.page[0];
        });
    }
    static toTable(data) {
        var _a;
        try {
            console.log(data);
        }
        catch (err) {
            try {
                console.log((_a = data.message) === null || _a === void 0 ? void 0 : _a.join('\n'));
            }
            catch (errr) {
                console.log(`Bad response`, data);
            }
            return null;
        }
        let byCodes = (0, FBF_Helpers_1.flatten)(data.response[0].request[0].byvariables.map((v) => v.variable.map((vv) => vv.$.code)));
        console.log('By codes', byCodes);
        let measureCodes = data.response[0]['measure-selections'][0].measure.map((m) => m.$.code);
        let columnCodes = (0, FBF_Helpers_1.concactinate)(byCodes, measureCodes);
        console.log('Column Codes', measureCodes.map((c) => DeWonder(c)));
        let repeatedColumns = [];
        let columnsToRepeat = new Map();
        let rows = [];
        data.response[0]['data-table'][0].r.forEach((row) => {
            let column = [];
            columnsToRepeat.clear();
            for (let i = 0; i < repeatedColumns.length; i++) {
                // console.log(`Repeating ${repeatedColumns[i][1]}`)
                columnsToRepeat.set(repeatedColumns[i][2], repeatedColumns[i][1]);
                repeatedColumns[i][0]--;
                if (repeatedColumns[i][0] <= 0) {
                    repeatedColumns.splice(i, 1);
                }
            }
            row.c.forEach((col, colIndex) => {
                var _a;
                if (columnsToRepeat.has(colIndex)) {
                    column.push(columnsToRepeat.get(colIndex));
                }
                let val = (typeof col.$.l == 'undefined') ?
                    (col.$.v == "Unreliable" ? "Unreliable" : Number((_a = col.$.v) === null || _a === void 0 ? void 0 : _a.replaceAll(',', '')))
                    : col.$.l;
                if (col.$.r) {
                    // console.log(`Repeating ${val} ${Number(col.$.r) - 1} times`)
                    repeatedColumns.push([Number(col.$.r) - 1, val, colIndex]);
                }
                column.push(val);
            });
            rows.push(column);
        });
        let output = { columnCodes: columnCodes, columnNames: columnCodes.map((code) => DeWonder(code)), rows: rows };
        console.log(output);
        return output;
    }
}
exports.WonderRequest = WonderRequest;
class ConsumableLinkedList {
    constructor(values) {
        this.root = null;
        if (!Array.isArray(values)) {
            let vals = [];
            let node = null;
            for (let item of values) {
                if (node == null) {
                    this.root = { value: item, next: null };
                    node = this.root;
                }
                else {
                    node.next = { value: item, next: null };
                    node = node.next;
                }
            }
        }
        else {
            this.root = { value: values[0], next: null };
            let node = this.root;
            for (let i = 1; i < values.length; i++) {
                node.next = { value: values[i], next: null };
                node = node.next;
            }
        }
    }
    consume(onEach) {
        let node = this.root;
        let lastNode = null;
        while (node != null) {
            if (onEach(node.value)) {
                if (lastNode == null) {
                    //  console.log(`Consuming ${node.value} as root now ${this.toString()}`)
                    this.root = node.next;
                    node = this.root;
                }
                else {
                    //  console.log(`Consuming ${node.value} in chain now ${this.toString()}`)
                    lastNode.next = node.next;
                    node = node.next;
                }
            }
            else {
                lastNode = node;
                node = node.next;
            }
        }
        return this;
    }
    toArray() {
        let node = this.root;
        let out = [];
        while (node != null) {
            out.push(node.value);
            node = node.next;
        }
        return out;
    }
    toString() {
        return this.toArray().join(', ');
    }
}
exports.ConsumableLinkedList = ConsumableLinkedList;
exports.ExampleRequest = '<request-parameters><parameter><name>B_1</name><value>D76.V1-level1</value></parameter><parameter><name>B_2</name><value>D76.V8</value></parameter><parameter><name>B_3</name><value>*None*</value></parameter><parameter><name>B_4</name><value>*None*</value></parameter><parameter><name>B_5</name><value>*None*</value></parameter><parameter><name>F_D76.V1</name><value>1999</value><value>2000</value><value>2001</value><value>2002</value><value>2003</value><value>2004</value><value>2005</value><value>2006</value><value>2007</value><value>2008</value><value>2009</value><value>2010</value><value>2011</value><value>2012</value><value>2013</value></parameter><parameter><name>F_D76.V10</name><value>*All*</value></parameter><parameter><name>F_D76.V2</name><value>C00-D48</value></parameter><parameter><name>F_D76.V25</name><value>*All*</value></parameter><parameter><name>F_D76.V27</name><value>*All*</value></parameter><parameter><name>F_D76.V9</name><value>*All*</value></parameter><parameter><name>I_D76.V1</name><value>1999 (1999) 2000 (2000) 2001 (2001) 2002 (2002) 2003 (2003) 2004 (2004) 2005 (2005) 2006 (2006) 2007 (2007) 2008 (2008) 2009 (2009) 2010 (2010) 2011 (2011) 2012 (2012) 2013 (2013) </value></parameter><parameter><name>I_D76.V10</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V2</name><value>C00-D48 (Neoplasms) </value></parameter><parameter><name>I_D76.V25</name><value>All Causes of Death </value></parameter><parameter><name>I_D76.V27</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V9</name><value>*All* (The United States) </value></parameter><parameter><name>M_1</name><value>D76.M1</value></parameter><parameter><name>M_2</name><value>D76.M2</value></parameter><parameter><name>M_3</name><value>D76.M3</value></parameter><parameter><name>M_9</name><value>D76.M9</value></parameter><parameter><name>O_V10_fmode</name><value>freg</value></parameter><parameter><name>O_V1_fmode</name><value>freg</value></parameter><parameter><name>O_V25_fmode</name><value>freg</value></parameter><parameter><name>O_V27_fmode</name><value>freg</value></parameter><parameter><name>O_V2_fmode</name><value>freg</value></parameter><parameter><name>O_V9_fmode</name><value>freg</value></parameter><parameter><name>O_aar</name><value>aar_std</value></parameter><parameter><name>O_aar_CI</name><value>true</value></parameter><parameter><name>O_aar_SE</name><value>true</value></parameter><parameter><name>O_aar_enable</name><value>true</value></parameter><parameter><name>O_aar_pop</name><value>0000</value></parameter><parameter><name>O_age</name><value>D76.V5</value></parameter><parameter><name>O_javascript</name><value>on</value></parameter><parameter><name>O_location</name><value>D76.V9</value></parameter><parameter><name>O_oc-sect1-request</name><value>close</value></parameter><parameter><name>O_precision</name><value>1</value></parameter><parameter><name>O_rate_per</name><value>100000</value></parameter><parameter><name>O_show_suppressed</name><value>true</value></parameter><parameter><name>O_show_totals</name><value>true</value></parameter><parameter><name>O_show_zeros</name><value>true</value></parameter><parameter><name>O_timeout</name><value>600</value></parameter><parameter><name>O_title</name><value>Example1</value></parameter><parameter><name>O_ucd</name><value>D76.V2</value></parameter><parameter><name>O_urban</name><value>D76.V19</value></parameter><parameter><name>VM_D76.M6_D76.V10</name><value/></parameter><parameter><name>VM_D76.M6_D76.V17</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V1_S</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V7</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V1</name><value/></parameter><parameter><name>V_D76.V10</name><value/></parameter><parameter><name>V_D76.V11</name><value>*All*</value></parameter><parameter><name>V_D76.V12</name><value>*All*</value></parameter><parameter><name>V_D76.V17</name><value>*All*</value></parameter><parameter><name>V_D76.V19</name><value>*All*</value></parameter><parameter><name>V_D76.V2</name><value/></parameter><parameter><name>V_D76.V20</name><value>*All*</value></parameter><parameter><name>V_D76.V21</name><value>*All*</value></parameter><parameter><name>V_D76.V22</name><value>*All*</value></parameter><parameter><name>V_D76.V23</name><value>*All*</value></parameter><parameter><name>V_D76.V24</name><value>*All*</value></parameter><parameter><name>V_D76.V25</name><value/></parameter><parameter><name>V_D76.V27</name><value/></parameter><parameter><name>V_D76.V4</name><value>*All*</value></parameter><parameter><name>V_D76.V5</name><value>*All*</value></parameter><parameter><name>V_D76.V51</name><value>*All*</value></parameter><parameter><name>V_D76.V52</name><value>*All*</value></parameter><parameter><name>V_D76.V6</name><value>00</value></parameter><parameter><name>V_D76.V7</name><value>*All*</value></parameter><parameter><name>V_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V9</name><value/></parameter><parameter><name>action-Send</name><value>Send</value></parameter><parameter><name>dataset_code</name><value>D76</value></parameter><parameter><name>dataset_label</name><value>Underlying Cause of Death, 1999-2016</value></parameter><parameter><name>dataset_vintage</name><value>2016</value></parameter><parameter><name>finder-stage-D76.V1</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V10</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V2</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V25</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V27</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V9</name><value>codeset</value></parameter><parameter><name>saved_id</name><value/></parameter><parameter><name>stage</name><value>request</value></parameter></request-parameters>';
function test() {
    let val;
    val;
}
const RawRonaColumnsDefault = [0, 0, 0, '', 0, 0, '', '', '', 0, 0, 0, 0, 0, 0, ''];
class Database {
    constructor() {
        this.deathsByCause = new Map();
        this.populationByAge = new Map();
        this.updateListeners = new Map();
        this.updateListenerCount = 0;
    }
    getColorForAgeGroup(ageGroup) {
        switch (ageGroup) {
            case '1-4 years':
                return fColor.blue.darken1;
            case '15-24 years':
                return fColor.blue.darken2;
            case '25-34 years':
                return fColor.blue.darken3;
            default:
                return fColor.blue.base;
        }
    }
    addListener(onUpdate) {
        let index = this.updateListenerCount++;
        this.updateListeners.set(index, onUpdate);
        return index;
    }
    removeListener(index) {
        this.updateListeners.delete(index);
    }
    notifyListeners() {
        for (let listener of this.updateListeners.values()) {
            listener();
        }
    }
    getPopulationForAge(ageGroup) {
        let ths = this;
        return this.populationByAge.getWithDefault(ageGroup, (ag) => new DataChannel(`AgeGroup${ag}`, ths.getColorForAgeGroup(ag)));
    }
    getDeathsForCause(causeName) {
        if (!this.deathsByCause.has(causeName)) {
            this.deathsByCause.set(causeName, new DataChannel(`DeathsForCause${causeName}`));
        }
        return this.deathsByCause.get(causeName);
    }
    findIcdCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            let csvResp = yield fetch('https://raw.githubusercontent.com/k4m1113/ICD-10-CSV/master/codes.csv');
            let csv = yield csvResp.text();
            let lines = csv.split('\n').map(line => {
                let parts = line.split(',');
                return [`${parts[0]}.${parts[1]}`, parts[3], parts[5]];
            });
            console.log(lines);
            return lines;
        });
    }
    pullIcdCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            let codes = yield this.findIcdCodes();
            yield codes.forEachAsync((code) => __awaiter(this, void 0, void 0, function* () {
                console.log(`Pulling data for ICD code ${code[0]}`, code);
                let data = yield new WonderRequest().groupBy('D76.V2-level3').groupBy('AgeGroups').groupBy('Month').addParam('F_D76.V2', code[0]).requestTable(true, true);
            }));
        });
    }
    pullCdcData() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = yield fetch('https://data.cdc.gov/api/views/9bhg-hcku/rows.csv');
            let text = yield result.text();
            let lines = text.split('\n');
            let columnNames = lines[0];
            lines.splice(0, 1);
            let values = lines.mapOrDrop((line, index) => {
                let raw = line.split(',');
                if (raw[3] != 'By Month' || raw[7] != 'All Sexes') {
                    return 'DROP';
                }
                let out = [];
                for (let i = 0; i < raw.length; i++) {
                    switch (i) {
                        case 0:
                        case 1:
                        case 2:
                            out.push(new Date(raw[i]).getTime());
                            break;
                        case 4:
                        case 5:
                        case 9:
                        case 10:
                        case 11:
                        case 12:
                        case 13:
                        case 14:
                        case 14:
                            out.push(Number(raw[i]));
                            break;
                        case 8:
                            out.push(raw[i].replace('Under 1 year', '< 1 year').replace('85 years and over', '85+ years'));
                            break;
                        default:
                            out.push(raw[i]);
                            break;
                    }
                }
                while (out.length < RawRonaColumnsDefault.length) {
                    out.push(RawRonaColumnsDefault[out.length - 1]);
                }
                return out;
                // return [raw[0], raw[1], raw[2], raw[3], raw[4], raw[5], raw[6], raw[7], raw[8], raw[9], raw[10], raw[11], raw[6], raw[6], raw[6], raw[6]] as RawColumns
            });
            let output = { columns: columnNames, rows: values };
            console.log(output);
            window['lastCdc'] = output;
        });
    }
    pullPopulation() {
        return __awaiter(this, void 0, void 0, function* () {
            let ths = this;
            let population = yield new WonderRequest().groupBy('Year').groupBy('AgeGroups').requestTable(true, true);
            population.rows.forEach((row) => {
                let time = new Date(row[0].isNumber() ? `${row[0]} 1 1` : row[0]).getTime();
                let tree = ths.getPopulationForAge(row[1]);
                tree.set(time, row[3]);
            });
            return this.populationByAge;
        });
    }
    pullDeathsByCause() {
        return __awaiter(this, void 0, void 0, function* () {
            let ths = this;
            for (let year = 1999; year <= 2020; year++) {
                for (let month = 1; month <= 12; month++) {
                    let yearMonth = `${year}/${month <= 9 ? '0' + month : month}`;
                    console.log(`Pulling deaths in ${yearMonth}`);
                    let deaths = yield new WonderRequest().groupBy('CauseOfDeath').groupBy('AgeGroups').groupBy('Month').filterByYear([yearMonth]).requestTable(true, true);
                    let count = 0;
                    deaths.rows.forEach((row, index) => {
                        let time = new Date(row[2].isNumber() ? (row[2].includes('/') ? `${row[2].split('/')[0]} ${row[2].split('/')[1]} 1` : `${row[2]} 1 1`) : row[2]).getTime();
                        let tree = ths.getDeathsForCause(row[0]);
                        tree.set(time, row[3]);
                        count++;
                        if (count > 1000) {
                            count = 0;
                            // console.log(`Added ${index} rows`)
                        }
                    });
                    ths.notifyListeners();
                }
            }
            return this.deathsByCause;
        });
    }
    buildDataChannel(id, color, side) {
        return __awaiter(this, void 0, void 0, function* () {
            if (side == 'Server') {
                let out = new DataChannelStreaming(id, color, (request) => __awaiter(this, void 0, void 0, function* () {
                    let resp = yield fetch(`http://${window.location.hostname}:5001/gdsn3-22/us-central1/DataChannels?id=${id}`);
                    return null;
                }));
            }
            else {
                let out = new DataChannelStreaming(id, color, (request) => __awaiter(this, void 0, void 0, function* () {
                    let resp = yield fetch(`http://${window.location.hostname}:5001/gdsn3-22/us-central1/DataChannels?id=${id}`);
                    return null;
                }));
            }
        });
    }
}
exports.Database = Database;
class DataChannel {
    constructor(title, color = fColor.randomColor()) {
        this.tree = new sorted_btree_1.default();
        this.minValue = null;
        this.maxValue = null;
        this.title = title;
        this.color = color;
    }
    set(time, value) {
        if (this.minValue == null || value < this.minValue) {
            this.minValue = value;
        }
        if (this.maxValue == null || value > this.maxValue) {
            this.maxValue = value;
        }
        this.tree.set(time, value);
    }
    forRange(start, end, onEach) {
        if (!this.tree) {
            return;
        }
        let startNode = this.tree.getPairOrNextLower(start);
        if (!startNode) {
            startNode = this.tree.getPairOrNextHigher(start);
        }
        let endNode = this.tree.getPairOrNextHigher(end);
        if (!endNode) {
            endNode = this.tree.getPairOrNextLower(end);
        }
        this.tree.forRange(startNode[0], endNode[0], true, onEach);
    }
    static fromJson(json) {
        let out = new DataChannel(json.title, bristolboard_1.FColor.fromHex(json.color, '', ''));
        out.tree.setPairs(json.data);
        return out;
    }
    toJson() {
        let data = this.tree.toArray();
        return {
            title: this.title,
            color: this.color.toHexString(),
            data: data
        };
    }
}
exports.DataChannel = DataChannel;
class DataChannelStreaming extends DataChannel {
    constructor(id, color, source) {
        super(id.split('~')[1], color);
        this.pullingForward = false;
        this.pullingBackward = false;
        this.pullingRoot = false;
        this.hasMoreBackwards = true;
        this.hasMoreForewards = true;
        this.source = source;
        this.id = id;
        this.tree = new sorted_btree_1.default();
    }
    get hasValue() {
        return this.tree && this.tree.size > 0;
    }
    pullBackwards() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pullingBackward || !this.hasMoreBackwards) {
                return false;
            }
            let ths = this;
            this.pullingBackward = true;
            let time = ths.tree.minKey();
            let backwardsResp = yield this.source({
                time: time, limit: 100,
                channelId: this.id, direction: 'before'
            });
            if (backwardsResp.success) {
                this.tree.setPairs(backwardsResp.data);
                this.hasMoreBackwards = backwardsResp.hasMore;
                this.pullingBackward = false;
                return;
                // rootResp.
            }
            throw new Error(`Failed to pull backward from ${time}`);
        });
    }
    pullForwards() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pullingForward || !this.hasMoreForewards) {
                return false;
            }
            let ths = this;
            this.pullingForward = true;
            let time = ths.tree.minKey();
            let forewardResp = yield this.source({
                time: time, limit: 100,
                channelId: this.id, direction: 'after'
            });
            if (forewardResp.success) {
                this.tree.setPairs(forewardResp.data);
                this.hasMoreBackwards = forewardResp.hasMore;
                this.pullingForward = false;
                return;
                // rootResp.
            }
            throw new Error(`Failed to pull forward from ${time}`);
        });
    }
    pullRoot(time) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.pullingRoot) {
                return false;
            }
            this.pullingRoot = true;
            let rootResp = yield this.source({
                time: time, limit: 100,
                channelId: this.id, direction: 'before'
            });
            if (rootResp.success) {
                this.tree.setPairs(rootResp.data);
                this.pullingRoot = false;
                return;
                // rootResp.
            }
            throw new Error(`Failed to pull root from ${time}`);
        });
    }
    forRange(start, end, onEach) {
        let found = false;
        let ths = this;
        if (this.hasValue) {
            let lastTime = -1;
            super.forRange(start, end, (time, value, count) => {
                found = true;
                lastTime = time;
                switch (count) {
                    case 0:
                        console.log('found first value');
                        if (time > start) {
                            this.pullBackwards();
                        }
                }
                onEach(time, value, count);
            });
            if (lastTime != -1 && lastTime < end) {
                ths.pullForwards();
            }
        }
        if (!found) {
            this.pullRoot(end);
        }
        // super.forRange()
    }
}
exports.DataChannelStreaming = DataChannelStreaming;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29uZGVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyY0Z1bmN0aW9ucy9jb21tb24vV29uZGVyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsSUFBSSxJQUFJLEVBQUU7SUFDUixNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtDQUNyQztBQUNELCtDQUFzQztBQUN0QywrQ0FBaUM7QUFDakMsK0NBQTZHO0FBRzdHLHNFQUFzRTtBQUN0RSxTQUFnQixVQUFVLENBQUMsS0FBcUM7SUFDOUQsT0FBTyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNuRSxDQUFDO0FBRkQsZ0NBRUM7QUFHRCxJQUFZLFVBQTRIO0FBQXhJLFdBQVksVUFBVTtJQUFHLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLDBDQUFRLENBQUE7SUFBRSwwQ0FBUSxDQUFBO0lBQUUsMENBQVEsQ0FBQTtBQUFDLENBQUMsRUFBNUgsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFBa0g7QUFFeEksU0FBZ0IsV0FBVyxDQUFDLFFBQWdCLElBQUksRUFBRSxNQUFjLElBQUk7SUFDbEUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNqQjtJQUNELE9B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

/***/ }),

/***/ "bristolboard":
/*!*******************************!*\
  !*** external "bristolboard" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("bristolboard");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "firebase-functions":
/*!*************************************!*\
  !*** external "firebase-functions" ***!
  \*************************************/
/***/ ((module) => {

module.exports = require("firebase-functions");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "node-fetch":
/*!*****************************!*\
  !*** external "node-fetch" ***!
  \*****************************/
/***/ ((module) => {

module.exports = require("node-fetch");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

/***/ }),

/***/ "sorted-btree":
/*!*******************************!*\
  !*** external "sorted-btree" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("sorted-btree");

/***/ }),

/***/ "xml2js":
/*!*************************!*\
  !*** external "xml2js" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("xml2js");

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
/******/ 	var __webpack_export_target__ = exports;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;
//# sourceMappingURL=index.js.map