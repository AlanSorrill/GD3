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
exports.HashTypes = exports.Diseases = exports.DataExists = exports.Data = exports.WonderProxy = exports.RonaTest = exports.ReqTest = exports.listener = void 0;
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
let database = new WonderData_1.Database({
    readFile(filePath) {
        return __awaiter(this, void 0, void 0, function* () {
            let absPath = path.resolve(__dirname, `../data/`, filePath);
            if (!fs.existsSync(absPath)) {
                return { error: `File doesn't exist: ${absPath}` };
            }
            let data = yield fs.promises.readFile(absPath);
            return JSON.parse(data.toString());
        });
    },
    writeFile(filePath, data) {
        return __awaiter(this, void 0, void 0, function* () {
            let absPath = path.resolve(__dirname, `../data/`, filePath);
            yield fs.promises.writeFile(absPath, typeof data == 'string' ? data : JSON.stringify(data));
            return 'success';
        });
    },
    exists(pathName) {
        return __awaiter(this, void 0, void 0, function* () {
            let absPath = path.resolve(__dirname, `../data/`, pathName);
            return fs.existsSync(absPath);
        });
    }
});
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
    // console.log(`Fetch body: ${fetchBody}`)
    let fileName = requestToFileName(fetchBody);
    let exportPath = path.resolve(__dirname, `../data/xml/${fileName}.xml`);
    if (fs.existsSync(exportPath)) {
        console.log(`Using cache for request ${fileName}`);
        res.setHeader('Content-Type', 'application/xml');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.sendFile(exportPath);
        return;
    }
    // console.log(`Sending query to wonder:\n${fetchBody}`)
    let result = yield (0, node_fetch_1.default)(`https://wonder.cdc.gov/controller/datarequest/D76`, {
        method: 'POST',
        body: `request_xml=${fetchBody}`,
        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
        // mode: 'no-cors'
    });
    let resultText = yield result.text();
    // console.log(`saving to file: ${exportPath}`)
    fs.writeFileSync(exportPath, resultText);
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.send(resultText);
}));
exports.Data = functions.https.onRequest((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    resp.setHeader('Content-Type', 'application/json');
    resp.setHeader('Access-Control-Allow-Origin', '*');
    // let name = req.path.startsWith('.')
    let file = path.resolve(__dirname, '../data/', '.' + req.path);
    console.log(req.method);
    switch (req.method) {
        case 'GET':
            if (!fs.existsSync(file)) {
                resp.send(`No file ${file}`);
            }
            resp.sendFile(file);
            break;
        case 'POST':
            let data = typeof req.body == 'string' ? req.body : JSON.stringify(req.body);
            try {
                yield fs.promises.writeFile(file, data);
            }
            catch (err) {
                resp.send(`Failed to save data ${JSON.stringify(err)}`);
            }
            break;
        default:
            resp.send(`Unknown method ${req.method}`);
    }
}));
exports.DataExists = functions.https.onRequest((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    resp.setHeader('Content-Type', 'application/json');
    resp.setHeader('Access-Control-Allow-Origin', '*');
    // let name = req.path.startsWith('.')
    let file = path.resolve(__dirname, '../data/', '.' + req.path);
    console.log(`Checking if ${file} exists`);
    switch (req.method) {
        case 'GET':
            if (!fs.existsSync(file)) {
                resp.send(`false`);
                return;
            }
            resp.send('true');
            break;
            break;
        default:
            resp.send(`Unknown method ${req.method}`);
    }
}));
exports.Diseases = functions.https.onRequest((req, resp) => __awaiter(void 0, void 0, void 0, function* () {
    let codes = yield database.pullIcdCodes(10);
    resp.setHeader('Content-Type', 'application/json');
    resp.setHeader('Access-Control-Allow-Origin', '*');
    resp.send(JSON.stringify(codes));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV1BGdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmNGdW5jdGlvbnMvV1BGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBQ2hELDJDQUE4QjtBQUU5Qix5QkFBd0I7QUFDeEIsNkJBQTRCO0FBQzVCLGdDQUE2QjtBQUM3QixvREFBOEc7QUFDOUcsaURBQW9DO0FBQ3BDLGlDQUFnQztBQUVoQyxzQ0FBc0M7QUFDdEMsMkRBQTJEO0FBQzNELEVBQUU7QUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRW5CLElBQUksUUFBUSxHQUFHLElBQUkscUJBQVEsQ0FBQztJQUNwQixRQUFRLENBQUksUUFBUTs7WUFDeEIsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQzVELElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUMzQixPQUFPLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixPQUFPLEVBQUUsRUFBRSxDQUFBO2FBQ25EO1lBQ0QsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQTtZQUM5QyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUE7UUFDcEMsQ0FBQztLQUFBO0lBQ0ssU0FBUyxDQUFJLFFBQWdCLEVBQUUsSUFBZ0I7O1lBQ25ELElBQUksT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUM3RCxNQUFNLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sRUFBRSxPQUFPLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFD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

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
exports.replaceAllInString = exports.isAllTrue = exports.XmlToJson = exports.concactinate = exports.flatten = exports.ensureFBF_Helpers = exports.isNode = void 0;
const Xml2JS = (__webpack_require__(/*! xml2js */ "xml2js").parseString);
function isNode() {
    return typeof window == 'undefined';
}
exports.isNode = isNode;
// export function ObjectMap<A,B>(input: A, transform: <k extends keyof A>()=>B): B {
// return null
// }
Array.prototype.forEachAsync = function (onEach) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i = 0; i < this.length; i++) {
            if ((yield onEach(this[i], i, this)) == 'BREAK') {
                break;
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJGX0hlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmNGdW5jdGlvbnMvY29tbW9uL0ZCRl9IZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUM7QUF1QjdDLFNBQWdCLE1BQU07SUFDbEIsT0FBTyxPQUFPLE1BQU0sSUFBSSxXQUFXLENBQUE7QUFDdkMsQ0FBQztBQUZELHdCQUVDO0FBQ0QscUZBQXFGO0FBQ3JGLGNBQWM7QUFDZCxJQUFJO0FBQ0osS0FBSyxDQUFDLFNBQVMsQ0FBQyxZQUFZLEdBQUcsVUFBbUIsTUFBMEU7O1FBQ3hILEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1lBQ2xDLElBQUcsQ0FBQSxNQUFNLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFJLE9BQU8sRUFBQztnQkFDekMsTUFBTTthQUNUO1NBQ0o7SUFDTCxDQUFDO0NBQUEsQ0FBQTtBQUNELEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxHQUFHLElBQWlCLENBQUE7SUFDM0IsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFBO0lBQ2pCLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDaEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMsQ0FBQTtBQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQWdCLFVBQXFEO0lBQzdGLElBQUksR0FBRyxHQUFHLElBQWdCLENBQUE7SUFDMUIsSUFBSSxHQUFHLEdBQVEs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

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
    requestTable(setDefaults = true) {
        return __awaiter(this, void 0, void 0, function* () {
            return WonderRequest.toTable(yield this.request(setDefaults));
        });
    }
    request(setDefaults = true) {
        return __awaiter(this, void 0, void 0, function* () {
            let clientSide = typeof window != 'undefined';
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
            // console.log(result.status + " " + result.statusText)
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
        var _a, _b;
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
        if (!data.response) {
            try {
                console.log((_b = data.message) === null || _b === void 0 ? void 0 : _b.join('\n'));
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
        let totals = [];
        let maximums = [];
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
            while (totals.length < column.length) {
                totals.push(0);
            }
            while (maximums.length < column.length) {
                maximums.push(-1);
            }
            for (let i = 0; i < column.length; i++) {
                if (typeof column[i] == 'number') {
                    if (maximums[i] == -1 || column[i] > maximums[i] || Number.isNaN(maximums[i])) {
                        maximums[i] = column[i];
                    }
                    totals[i] += column[i];
                }
                else {
                    totals[i] = -1;
                }
            }
            rows.push(column);
        });
        let output = { rowTotals: totals, rowMaximums: maximums, columnCodes: columnCodes, columnNames: columnCodes.map((code) => DeWonder(code)), rows: rows };
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
    constructor(fileAccessor = null) {
        this.deathsByCause = new Map();
        this.populationByAge = new Map();
        this.fileAccessor = null;
        this.arrested = false;
        this.updateListeners = new Map();
        this.updateListenerCount = 0;
        this.diseaseDirectoryPath = './directory.json';
        this.diseaseDirectory = new Map();
        this.deathsByICD = new Map();
        this.fileAccessor = fileAccessor;
        if (fileAccessor) {
            let ths = this;
            fileAccessor.readFile(this.diseaseDirectoryPath).then(data => {
                if (Array.isArray(data)) {
                    for (let description of data) {
                        ths.diseaseDirectory.set(description.icdCode, description);
                    }
                }
                else {
                    console.log(`Failed to read file`, data);
                }
            });
        }
        else if (!(0, FBF_Helpers_1.isNode)()) {
        }
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
    getDeathsForICD(icdCode) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.deathsByICD.has(icdCode)) {
                return this.deathsByICD.get(icdCode);
            }
            if (this.diseaseDirectory.has(icdCode)) {
                if (this.fileAccessor) {
                    let filePath = this.diseasePath(icdCode);
                    if (yield this.fileAccessor.exists(filePath)) {
                        let fileResult = yield this.fileAccessor.readFile(filePath);
                        console.log(`Got disease from file`, filePath);
                        if (fileResult != null) {
                            return fileResult;
                        }
                        else {
                            console.log(`Couldn't read ICD file ${filePath}`);
                        }
                    }
                }
                let result = yield this.pullIcdCode(this.diseaseDirectory.get(icdCode));
                return result;
            }
        });
    }
    findIcdCodes() {
        return __awaiter(this, void 0, void 0, function* () {
            let csvResp = yield fetch('https://raw.githubusercontent.com/k4m1113/ICD-10-CSV/master/codes.csv');
            let csv = yield csvResp.text();
            let lines = csv.split('\n').map(line => {
                line = line.replaceAll(`"`, '');
                let parts = line.split(',');
                // 0: "A00"section
                // 1: "0"item
                // 2: "A000"junk
                // 3: "\"Cholera due to Vibrio cholerae 01"technicalLabel
                // 4: " biovar cholerae\""junk
                // 5: "\"Cholera due to Vibrio cholerae 01"junk
                // 6: " biovar cholerae\""
                // 7: "\"Cholera\""
                return [parts[1] && parts[1].isNumber() ? `${parts[0]}.${parts[1]}` : parts[0], parts[3], parts[parts.length - 1]];
            });
            console.log(lines);
            return lines;
        });
    }
    pullIcdCode(description) {
        return __awaiter(this, void 0, void 0, function* () {
            let ths = this;
            try {
                let data = yield new WonderRequest().groupBy('AgeGroups').groupBy('Month').addParam('F_D76.V2', description.icdCode).requestTable(true);
                if (data != null) {
                    let out = {};
                    let current = Date.now();
                    let last = Date.now();
                    let count = 0;
                    description.maxPerMonth = Math.max(description.maxPerMonth, data.rowMaximums[2]);
                    for (let row of data.rows) {
                        if (typeof out[row[0]] == 'undefined') {
                            out[row[0]] = new DataChannel(description.laymanName + ' ' + row[0], null);
                        }
                        let time = new Date(row[1].isNumber() ? (row[1].includes('/') ? `${row[1].split('/')[0]} ${row[1].split('/')[1]} 1` : `${row[1]} 1 1`) : row[1]).getTime();
                        out[row[0]].set(time, row[2]);
                        current = Date.now();
                        if (current - last > 500) {
                            yield new Promise((acc) => { console.log('pop'); acc(); });
                            console.log(`Popping event loop ${count}`);
                            last = current;
                        }
                        if (ths.arrested) {
                            break;
                        }
                        // console.log(`Processing icd ${row[0]} ${count}/${data.rows.length}`)
                        count++;
                    }
                    this.deathsByICD.set(description.icdCode, out);
                    ths.diseaseDirectory.set(description.icdCode, description);
                    console.log(`Got data for icd ${description.icdCode}`, out);
                    return out;
                }
                else {
                    return null;
                }
            }
            catch (err) {
                console.log(`Failed to pull ${description.icdCode}`, err);
            }
        });
    }
    pullIcdCodes(max = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            let codes = yield this.findIcdCodes();
            let ths = this;
            let addedIcds = [];
            yield codes.forEachAsync((code, index) => __awaiter(this, void 0, void 0, function* () {
                if (ths.diseaseDirectory.has(code[0])) {
                    if (max != -1) {
                        max++;
                    }
                }
                else {
                    if (max != -1 && index >= max) {
                        return 'BREAK';
                    }
                    console.log(`${max != -1 ? (max - index) + ' ' : ''}Pulling? data for ICD code ${code[0]}`, code);
                    let description = { laymanName: code[2], technicalName: code[1], icdCode: code[0], maxPerMonth: -1 };
                    let codeResult = yield ths.pullIcdCode(description);
                    if (codeResult == null) {
                        if (max != -1) {
                            max++;
                        }
                    }
                    else {
                        // ths.diseaseDirectory.set(code[0], description)
                        addedIcds.push(code[0]);
                    }
                }
            }));
            let output = this.diseaseDirectory.toArrayWithKeys().sort((a, b) => b[1].maxPerMonth - a[1].maxPerMonth).map(s => s[1]); //[s[1],ths.deathsByICD.get(s[0])])
            console.log(output, output.map(s => [s.icdCode, ths.deathsByICD.get(s.icdCode)]));
            if (this.fileAccessor) {
                this.fileAccessor.writeFile(this.diseaseDirectoryPath, output);
                for (let icd of addedIcds) {
                    let json = ths.diseaseToJson(icd);
                    if (json != null) {
                        this.fileAccessor.writeFile(this.diseasePath(icd), json);
                    }
                }
            }
            return output;
        });
    }
    diseasePath(icdCode) {
        return `./byICD/${icdCode.replaceAll('.', '_')}.json`;
    }
    diseaseToJson(icdCode) {
        if (!this.deathsByICD.has(icdCode)) {
            console.log(`Cannot jsonify non-existant code ${icdCode}`);
            return null;
        }
        let out = {
            description: this.diseaseDirectory.get(icdCode),
            byAge: this.ageGroupsToJson(this.deathsByICD.get(icdCode))
        };
        return out;
    }
    ageGroupsToJson(ageGroupChannels) {
        let out = {};
        for (let key of Object.keys(ageGroupChannels)) {
            out[key] = ageGroupChannels[key].toJson();
        }
        return out;
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
            let population = yield new WonderRequest().groupBy('Year').groupBy('AgeGroups').requestTable(true);
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
                    let deaths = yield new WonderRequest().groupBy('CauseOfDeath').groupBy('AgeGroups').groupBy('Month').filterByYear([yearMonth]).requestTable(true);
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
        var _a;
        let data = this.tree.toArray();
        return {
            title: this.title,
            color: (_a = this.color) === null || _a === void 0 ? void 0 : _a.toHexString(),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29uZGVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyY0Z1bmN0aW9ucy9jb21tb24vV29uZGVyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsSUFBSSxJQUFJLEVBQUU7SUFDUixNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtDQUNyQztBQUNELCtDQUFzQztBQUN0QywrQ0FBaUM7QUFDakMsK0NBQXFIO0FBR3JILHNFQUFzRTtBQUN0RSxTQUFnQixVQUFVLENBQUMsS0FBcUM7SUFDOUQsT0FBTyxDQUFDLEtBQUssSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUNuRSxDQUFDO0FBRkQsZ0NBRUM7QUFHRCxJQUFZLFVBQTRIO0FBQXhJLFdBQVksVUFBVTtJQUFHLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFPLENBQUE7SUFBRSx5Q0FBTyxDQUFBO0lBQUUseUNBQU8sQ0FBQTtJQUFFLDBDQUFRLENBQUE7SUFBRSwwQ0FBUSxDQUFBO0lBQUUsMENBQVEsQ0FBQTtBQUFDLENBQUMsRUFBNUgsVUFBVSxHQUFWLGtCQUFVLEtBQVYsa0JBQVUsUUFBa0g7QUFFeEksU0FBZ0IsV0FBVyxDQUFDLFFBQWdCLElBQUksRUFBRSxNQUFjLElBQUk7SUFDbEUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNqQjtJQUNELE9B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

/***/ }),

/***/ "bristolboard":
/*!*******************************!*\
  !*** external "bristolboard" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("bristolboard");

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

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("path");

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