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
exports.HashTypes = exports.WonderProxy = exports.RonaTest = exports.ReqTest = exports.listener = void 0;
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
    let exportPath = path.resolve(__dirname, '../data/exampleResponse.json');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJGX0hlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmNGdW5jdGlvbnMvY29tbW9uL0ZCRl9IZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUVBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUM7QUFzQjdDLEdBQUcsQ0FBQyxTQUFTLENBQUMsV0FBVyxHQUFHO0lBQ3hCLElBQUksR0FBRyxHQUFHLElBQWdCLENBQUE7SUFDMUIsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFBO0lBQ2pCLEtBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxFQUFDO1FBQ3RCLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7S0FDaEI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUMsQ0FBQTtBQUNELEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxHQUFHLFVBQWdCLFVBQXFEO0lBQzdGLElBQUksR0FBRyxHQUFHLElBQWdCLENBQUE7SUFDMUIsSUFBSSxHQUFHLEdBQVEsRUFBRSxDQUFBO0lBQ2pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pDLElBQUksS0FBSyxHQUFHLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7UUFDbEMsSUFBSSxLQUFLLElBQUksTUFBTSxFQUFFO1lBQ2pCLHVDQUF1QztTQUMxQzthQUFNO1lBQ0gsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUNsQjtLQUNKO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDLENBQUE7QUFDRCxHQUFHLENBQUMsU0FBUyxDQUFDLGNBQWMsR0FBRyxVQUFnQixHQUFNLEVBQUUsWUFBMkI7SUFDOUUsSUFB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

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
exports.DataChannel = exports.Database = exports.ExampleRequest = exports.ConsumableLinkedList = exports.WonderRequest = exports.DeWonder = exports.AllWonderParams = exports.WonderQueryParam_GroupBy = exports.WonderQueryParam_Race = exports.WonderQueryParam_Gender = exports.WonderQueryParam_Measure = exports.WonderQueryParam_AgeGroup = exports.WonderQueryParam_Include = exports.WonderQueryParam = exports.WonderQueryParam_Util = exports.parseYearMonthString = exports.isYearMonthString = exports.MonthEnum = exports.YearStrings = exports.MonthNames = exports.isWQP_None = void 0;
// import * as XMLParser from 'xml2js'
if (true) {
    global.fetch = __webpack_require__(/*! node-fetch */ "node-fetch");
}
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
    //time
    WonderQueryParam_GroupBy["Year"] = "D76.V1-level1";
    WonderQueryParam_GroupBy["Month"] = "D76.V1-level2";
    WonderQueryParam_GroupBy["Weekday"] = "D76.V24";
    WonderQueryParam_GroupBy["Autopsy"] = "D76.V20";
    WonderQueryParam_GroupBy["PlaceofDeath"] = "D76.V21";
    WonderQueryParam_GroupBy["LeadingCausesofDeath"] = "D76.V28";
    WonderQueryParam_GroupBy["LeadingCausesofDeathInfants"] = "D76.V29";
    WonderQueryParam_GroupBy["ICDChapter"] = "D76.V2-level1";
    WonderQueryParam_GroupBy["ICDSubChapter"] = "D76.V2-level2";
    WonderQueryParam_GroupBy["CauseOfdeath"] = "D76.V2-level3";
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
        else {
            let param = WonderQueryParam_GroupBy[groupByName];
            this.addParam(parameterName, param);
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
            console.log(data.response[0]['data-table'][0]);
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
                    let deaths = yield new WonderRequest().groupBy('CauseOfdeath').groupBy('AgeGroups').groupBy('Month').filterByYear([yearMonth]).requestTable(true, true);
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
}
exports.DataChannel = DataChannel;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29uZGVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyY0Z1bmN0aW9ucy9jb21tb24vV29uZGVyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsSUFBSSxJQUFJLEVBQUU7SUFDUixNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtDQUNyQztBQUVELCtDQUFpQztBQUNqQywrQ0FBNkc7QUFHN0csc0VBQXNFO0FBQ3RFLFNBQWdCLFVBQVUsQ0FBQyxLQUFxQztJQUM5RCxPQUFPLENBQUMsS0FBSyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLHFCQUFxQixDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ25FLENBQUM7QUFGRCxnQ0FFQztBQUdELElBQVksVUFBMEY7QUFBdEcsV0FBWSxVQUFVO0lBQUUseUNBQU8sQ0FBQTtJQUFFLHlDQUFLLENBQUE7SUFBQyx5Q0FBSyxDQUFBO0lBQUMseUNBQUssQ0FBQTtJQUFDLHlDQUFLLENBQUE7SUFBQyx5Q0FBSyxDQUFBO0lBQUMseUNBQUssQ0FBQTtJQUFDLHlDQUFLLENBQUE7SUFBQyx5Q0FBSyxDQUFBO0lBQUMsMENBQU0sQ0FBQTtJQUFDLDBDQUFNLENBQUE7SUFBQywwQ0FBTSxDQUFBO0FBQUEsQ0FBQyxFQUExRixVQUFVLEdBQVYsa0JBQVUsS0FBVixrQkFBVSxRQUFnRjtBQUV0RyxTQUFnQixXQUFXLENBQUMsUUFBZ0IsSUFBSSxFQUFFLE1BQWMsSUFBSTtJQUNsRSxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUE7SUFDWixLQUFLLElBQUksQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLElBQUksR0FBRyxFQUFFLENBQUMsRUFBRSxFQUFFO1FBQ2pDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFBO0tBQ2pCO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBTkQsa0NBTUM7QUFDRCxJQUFZLFNBRVg7QUFGRCxXQUFZLFNBQVM7SUFDbkIsK0NBQU8sQ0FBQTtJQUFFLGlEQUFRLENBQUE7SUFBRSwyQ0FBSyxDQUFBO0lBQUUsMkNBQUssQ0FBQTtJQUFFLHVDQUFHLENBQUE7SUFBRSx5Q0FBSSxDQUFBO0lBQUUseUNBQUksQ0FBQTtJQUFFLDZDQUFNLENBQUE7SUFBRSxtREFBUyxDQUFBO0lBQUUsK0NBQU8sQ0FBQTtJQUFFLGtEQUFRLENBQUE7SUFBRSxrREFBUSxDQUFBO0FBQ2xHLENBQUMsRUFGVyxTQUFTLEdBQVQsaUJBQVMsS0FBVCxpQkFBUyxRQUVwQjtBQUVELFNBQWdCLGlCQUFpQixDQUFDLEdBQVc7SUFDM0MsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQUE7QUFDbkMsQ0FBQztBQUZELDhDQUVDO0FBQ0QsU0FBZ0Isb0JBQW9CLENBQUMsR0FBaUM7SUFDcEUsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUMxQixRQUFRLEtBQUssQ0FBQyxNQUFNLEVBQUU7UUFDcEIsS0FBSyxDQUFDO1lBQ0osT0FBTyxJQUFJLENBQUM7UUFDZCxLQUFLLENBQUM7WUFDSixPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBZSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDckMsS0FBSyxDQUFDO1lBQ0osT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQWUsRUFBRSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtLQUN2RDtBQUNILENBQUM7QUFWRCxvREFVQztBQUNELElBQVkscUJBR1g7QUFIRCxXQUFZLHFCQUFxQjtJQUMvQix3Q0FBZSxDQUFBO0lBQ2Ysc0NBQWEsQ0FBQTtBQUNmLENBQUMsRUFIVyxxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQUdoQztBQUNELElBQVksZ0JBS1g7QUFMRCxXQUFZLGdCQUFnQjtJQUUxQixLQUFLO0lBQ0wsMkNBQXVCLENBQUE7QUFFekIsQ0FBQyxFQUxXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBSzNCO0FBSUQsSUFBWSx3QkFNWDtBQU5ELFdBQVksd0JBQXdCO0lBQ2xDLG1EQUF1QixDQUFBO0lBQ3ZCLHFEQUF5QixDQUFBO0lBQ3pCLGlEQUFxQixDQUFBO0lBQ3JCLGtEQUFzQixDQUFBO0lBQ3RCLHdEQUE0QixDQUFBO0FBQzlCLENBQUMsRUFOVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQU1uQztBQUNELElBQVkseUJBS1g7QUFMRCxXQUFZLHlCQUF5QjtJQUNuQywrQ0FBa0IsQ0FBQTtJQUNsQixpREFBb0IsQ0FBQTtJQUNwQixtREFBc0IsQ0FBQTtJQUN0Qiw4Q0FBaUIsQ0FBQTtBQUNuQixDQUFDLEVBTFcseUJBQXlCLEdBQXpCLGlDQUF5QixLQUF6QixpQ0FBeUIsUUFLcEM7QUFDRCxJQUFZLHdCQVVYO0FBVkQsV0FBWSx3QkFBd0I7SUFDbEMsNkNBQWlCLENBQUE7SUFDakIsaURBQXFCLENBQUE7SUFDckIsZ0RBQW9CLENBQUE7SUFDcEIsOERBQWtDLENBQUE7SUFDbEMscUVBQXlDLENBQUE7SUFDekMsc0RBQTBCLENBQUE7SUFDMUIsb0VBQXdDLENBQUE7SUFDeEMseUVBQTZDLENBQUE7SUFDN0MsMkRBQStCLENBQUE7QUFDakMsQ0FBQyxFQVZXLHdCQUF3QixHQUF4QixnQ0FBd0IsS0FBeEIsZ0NBQXdCLFFBVW5DO0FBQ0QsSUFBWSx1QkFHWDtBQUhELFdBQVksdUJBQXVCO0lBQ2pDLHFDQUFVLENBQUE7SUFDVix1Q0FBWSxDQUFBO0FBQ2QsQ0FBQyxFQUhXLHVCQUF1QixHQUF2QiwrQkFBdUIsS0FBdkIsK0JBQXVCLFFBR2xDO0FBQ0QsSUFBWSxxQkFXWDtBQVhELFdBQVkscUJBQXFCO0lBQy9CLG9EQUEyQixDQUFBO0lBQzNCLHVEQUE4QixDQUFBO0lBQzlCLHlDQUFnQixDQUFBO0lBR2hCLGdFQUF1QyxDQUFBO0lBQ3ZDLHdEQUErQixDQUFBO0lBQy9CLHlDQUFnQixDQUFBO0lBQ2hCLHlDQUFnQixDQUFBO0FBRWxCLENBQUMsRUFYVyxxQkFBcUIsR0FBckIsNkJBQXFCLEtBQXJCLDZCQUFxQixRQVdoQztBQUdELElBQVksd0JBaUNYO0FBakNELFdBQVksd0JBQXdCO0lBQ2xDLDJEQUErQixDQUFBO0lBQy9CLDZEQUFpQyxDQUFBO0lBQ2pDLHdEQUE0QixDQUFBO0lBQzVCLG1EQUF1QixDQUFBO0lBQ3ZCLG9EQUF3QixDQUFBO0lBQ3hCLHdEQUE0QixDQUFBO0lBQzVCLHdEQUE0QixDQUFBO0lBRTVCLGdEQUFvQixDQUFBO0lBQ3BCLDZDQUFpQixDQUFBO0lBQ2pCLHNEQUEwQixDQUFBO0lBQzFCLDJDQUFlLENBQUE7SUFFZixNQUFNO0lBQ04sa0RBQXNCLENBQUE7SUFDdEIsbURBQXVCLENBQUE7SUFDdkIsK0NBQW1CLENBQUE7SUFFbkIsK0NBQW1CLENBQUE7SUFDbkIsb0RBQXdCLENBQUE7SUFHeEIsNERBQWdDLENBQUE7SUFDaEMsbUVBQXVDLENBQUE7SUFDdkMsd0RBQTRCLENBQUE7SUFDNUIsMkRBQStCLENBQUE7SUFDL0IsMERBQThCLENBQUE7SUFDOUIseURBQTZCLENBQUE7SUFDN0IsaUVBQXFDLENBQUE7SUFDckMsb0RBQXdCLENBQUE7SUFDeEIsK0VBQW1ELENBQUE7SUFDbkQsZ0VBQW9DLENBQUE7QUFDdEMsQ0FBQyxFQWpDVyx3QkFBd0IsR0FBeEIsZ0NBQXdCLEtBQXhCLGdDQUF3QixRQWlDbkM7QUFDWSxRQUFBLGVBQWUsR0FBRyxDQUFDLHdCQUF3QixFQUFFLHlCQUF5QixFQUFFLHdCQUF3QixFQUFFLEFBQUQsRUFBRyx3QkFBd0IsRUFBRSxBQUFELEVBQUcscUJBQXFCLENBQUMsQ0FBQTtBQUluSyxJQUFJLCtCQUErQixHQUFHLElBQUksQ0FBQTtBQUMxQyxnREFBZ0Q7QUFDaEQsbURBQW1EO0FBQ25ELHNEQUFzRDtBQUN0RCwwQ0FBMEM7QUFDMUMsc0VBQXNFO0FBQ3RFLFFBQVE7QUFDUixNQUFNO0FBQ04sNENBQTRDO0FBQzVDLElBQUk7QUFDSixTQUFnQixRQUFRLENBQUMsSUFBWTtJQUNuQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7SUFDZixJQUFJLGVBQWUsR0FBb0UsRUFBRSxDQUFBO0lBQ3pGLEtBQUssSUFBSSxTQUFTLElBQUksdUJBQWUsRUFBRTtRQUNyQyxJQUFJLEtBQUssR0FBRyx1QkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1FBRXRDLEtBQUssSUFBSSxHQUFHLElBQUksS0FBSyxFQUFFO1lBQ3JCLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUE7U0FDbkQ7S0FDRjtJQUVELGVBQWUsR0FBRyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO0lBQzdFLEtBQUssSUFBSSxJQUFJLElBQUksZUFBZSxFQUFFO1FBQ2hDLHFEQUFxRDtRQUNyRCxHQUFHLEdBQUcsSUFBQSxnQ0FBa0IsRUFBQyxHQUFHLEVBQUUsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxVQUFVLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDbEUsR0FBRyxHQUFHLElBQUEsZ0NBQWtCLEVBQUMsR0FBRyxFQUFFLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsVUFBVSxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ2xFLEdBQUcsR0FBRyxJQUFBLGdDQUFrQixFQUFDLEdBQUcsRUFBRSxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLFVBQVUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUNsRSxHQUFHLEdBQUcsSUFBQSxnQ0FBa0IsRUFBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO0tBQ2hEO0lBQ0QsT0FBTyxHQUFHLENBQUE7QUFDWixDQUFDO0FBcEJELDRCQW9CQztBQVNELE1BQWEsYUFBYTtJQUN4QjtRQTBGQSxXQUFNLEdBQTBCLElBQUksR0FBRyxFQUFFLENBQUE7UUFDekMsaUJBQVksR0FBVyxDQUFDLENBQUM7UUFDekIsc0JBQWlCLEdBQVcsQ0FBQyxDQUFBO1FBM0YzQixJQUFJLENBQUMsYUFBYSxHQUFHO1lBQ25CLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUV2QixLQUFLLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7WUFDbkMsS0FBSyxFQUFFLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDO1lBQ25DLEtBQUssRUFBRSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQztZQUNuQyxLQUFLLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLENBQUM7WUFFbkMsT0FBTyxFQUFFLENBQUMseUJBQXlCLENBQUMsT0FBTyxDQUFDO1lBQzVDLFlBQVksRUFBRSxDQUFDLHdCQUF3QixDQUFDLGlCQUFpQixDQUFDO1lBQzFELFdBQVcsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUNyQiw2QkFBNkI7WUFDN0IsU0FBUyxFQUFFLENBQUMsd0JBQXdCLENBQUMsZ0JBQWdCLENBQUM7WUFDdEQsd0JBQXdCO1lBQ3hCLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN2Qix3QkFBd0I7WUFDeEIsT0FBTyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ3JCLEtBQUssRUFBRSxDQUFDLHdCQUF3QixDQUFDLE1BQU0sQ0FBQztZQUN4QyxLQUFLLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUM7WUFDNUMsS0FBSyxFQUFFLENBQUMsd0JBQXdCLENBQUMsU0FBUyxDQUFDO1lBQzNDLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN2QixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDdEIsYUFBYSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3ZCLGFBQWEsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN2QixZQUFZLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDdEIsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDO1lBQ3RCLG9CQUFvQixFQUFFLENBQUMsT0FBTyxDQUFDO1lBQy9CLGFBQWEsRUFBRSxDQUFDLEdBQUcsQ0FBQztZQUNwQixZQUFZLEVBQUUsQ0FBQyxRQUFRLENBQUM7WUFDeEIsa0JBQWtCLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFDNUIsZUFBZSxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQzFCLGNBQWMsRUFBRSxDQUFDLE1BQU0sQ0FBQztZQUN4QixXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUM7WUFDcEIsU0FBUyxFQUFFLENBQUMsVUFBVSxDQUFDO1lBQ3ZCLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQztZQUN2QixPQUFPLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQyxVQUFVLENBQUM7WUFFOUMsVUFBVSxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDO1lBQ3ZDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQztZQUN4QyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7WUFDdkMsVUFBVSxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDO1lBRXZDLFVBQVUsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQztZQUN2QyxVQUFVLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7WUFDdkMsVUFBVSxFQUFFLEVBQUU7WUFFZCxVQUFVLEVBQUUsQ0FBQyxJQUFJLENBQUM7WUFDbEIsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDO1lBQ3hDLFVBQVUsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQztZQUN2QyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7WUFDeEMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDO1lBQ3hDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQztZQUN4QyxVQUFVLEVBQUUsRUFBRTtZQUNkLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQztZQUN4QyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7WUFDeEMsV0FBVyxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDO1lBQ3hDLFdBQVcsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEdBQUcsQ0FBQztZQUN4QyxXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7WUFDeEMsV0FBVyxFQUFFLEVBQUU7WUFDZixXQUFXLEVBQUUsQ0FBQyxxQkFBcUIsQ0FBQyxHQUFHLENBQUM7WUFHeEMsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLENBQUM7WUFJN0IsNENBQTRDO1lBQzVDLHdFQUF3RTtZQUN4RSxxRUFBcUU7WUFDckUsMkRBQTJEO1lBQzNELHlEQUF5RDtZQUl6RCxxQkFBcUIsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxzQkFBc0IsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxxQkFBcUIsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNsQyxzQkFBc0IsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxzQkFBc0IsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUNuQyxxQkFBcUIsRUFBRSxDQUFDLFNBQVMsQ0FBQztZQUVsQyxVQUFVLEVBQUUsRUFBRTtZQUNkLE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQztTQUNyQixDQUFBO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBRXZCLENBQUE7SUFFSCxDQUFDO0lBTUQsUUFBUSxDQUFDLElBQVksRUFBRSxLQUF3QjtRQUM3QyxJQUFJLE9BQU8sS0FBSyxJQUFJLFFBQVEsRUFBRTtZQUM1QixJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO1NBQy9CO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7U0FDN0I7UUFDRCxPQUFPLElBQUksQ0FBQTtJQUNiLENBQUM7SUFDRCxPQUFPLENBQUMsT0FBMkM7UUFDakQsSUFBSSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDL0IsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QscUJBQXFCLENBQUMsU0FBa0IsRUFBRSx1QkFBZ0MsU0FBUyxFQUFFLGdCQUF5QixTQUFTO1FBQ3JILElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUMzRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsRSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDM0QsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQ0QsZUFBZSxDQUFDLE1BQTZDO1FBQzNELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFBO1FBQzlCLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELFVBQVUsQ0FBQyxxQkFBd0Q7UUFDakUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUscUJBQXFCLENBQUMsQ0FBQTtRQUNqRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxVQUFVLENBQUMsU0FBc0M7UUFDL0MsSUFBSSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDL0MsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtRQUN0QyxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxZQUFZLENBQUMsS0FBZ0M7UUFDM0MsSUFBSSxTQUFTLEdBQUcsS0FBSyx3QkFBd0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQTtRQUM1RCxJQUFJLEtBQUssSUFBSSxLQUFLLEVBQUU7WUFDbEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtZQUN2RCxPQUFPO1NBQ1I7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxnQkFBZ0IsQ0FBQyxPQUFnQjtRQUMvQixJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDdEQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsT0FBTyxDQUFDLFNBQWdEO1FBQ3RELElBQUksU0FBUyxHQUFHLEtBQUssU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQTtRQUN0RCxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRSx3QkFBd0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFBO0lBQy9ELENBQUM7SUFDRCxjQUFjLENBQUMsT0FBd0M7UUFDckQsSUFBSSxJQUFJLEdBQW9DLE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxDQUFDLENBQUMsd0JBQXdCLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxDQUFBO1FBQ3ZKLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQTtRQUM5QixPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7SUFDRCxTQUFTLENBQUMsU0FBaUQ7UUFDekQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyx5QkFBeUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDOUQsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBQ0QsWUFBWSxDQUFDLEtBQWdGO1FBQzNGLHdGQUF3RjtRQUN4Rix5Q0FBeUM7UUFDekMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsRUFBRSxLQUFLLENBQUMsQ0FBQTtJQUV6QyxDQUFDO0lBQ0QsT0FBTyxDQUFDLFdBQTZEO1FBQ25FLElBQUksSUFBSSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDL0MsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUMsQ0FBQTtTQUN2RTtRQUNELElBQUksYUFBYSxHQUFHLEtBQUssSUFBSSxDQUFDLFlBQVksR0FBRyxDQUFDLEVBQUUsQ0FBQTtRQUNoRCxJQUFJLFVBQVUsQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUMzQixJQUFJLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRSxxQkFBcUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMxRDthQUFNO1lBQ0wsSUFBSSxLQUFLLEdBQUcsd0JBQXdCLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDakQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7U0FDckM7UUFDRCxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEIsT0FBTyxJQUFJLENBQUE7SUFDYixDQUFDO0lBQ0QsVUFBVTtRQUNSLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUE7SUFDcEIsQ0FBQztJQUNPLFlBQVksQ0FBQyxDQUFTO1FBQzVCLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDaEIsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1o7UUFDRCxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtRQUM3QixJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3pCLFFBQVEsS0FBSyxFQUFFO1lBQ2IsS0FBSyxJQUFJO2dCQUNQLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdEMsS0FBSyxJQUFJO2dCQUNQLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdEMsS0FBSyxJQUFJO2dCQUNQLE9BQU8sQ0FBQyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDLENBQUE7WUFDdEM7Z0JBQ0UsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFBO1NBQ2I7SUFDSCxDQUFDO0lBQ0QsV0FBVztRQUNULElBQUksR0FBRyxHQUFHLElBQUksQ0FBQztRQUNmLEtBQUssSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLGFBQWEsRUFBRTtZQUNsQyxJQUFJLENBQUMsQ0FBQyxJQUFBLHVCQUFTLEVBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRTtnQkFDbkQsZ0RBQWdEO2dCQUNoRCxJQUFJLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxFQUFFO29CQUMxQix5Q0FBeUM7aUJBQzFDO2dCQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDL0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUVKLG9GQUFvRjtnQkFDcEYsSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUMvQztTQUNGO0lBQ0gsQ0FBQztJQUNELFFBQVE7UUFDTix1Q0FBdUM7UUFDdkMsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1FBQ2YsSUFBSSxTQUFTLEdBQXlCLEVBQUUsQ0FBQTtRQUN4QyxJQUFJLFNBQVMsR0FBeUIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUMvQyxJQUFJLElBQVksQ0FBQTtRQUVoQixJQUFJLE9BQU8sR0FBaUMsSUFBSSxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUE7UUFDeEYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQzlCLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEIsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFBO1FBQ0YsaUNBQWlDO1FBQ2pDLG9CQUFvQjtRQUNwQix5R0FBeUc7UUFDekcsOEJBQThCO1FBQzlCLElBQUk7UUFDSix3Q0FBd0M7UUFDeEMsZ0NBQWdDO1FBQ2hDLGtEQUFrRDtRQUNsRCwrQkFBK0I7UUFDL0IsTUFBTTtRQUNOLElBQUk7UUFDSixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDMUMsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN4QixTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDMUMsT0FBTyxJQUFJLENBQUM7YUFDYjtZQUNELE9BQU8sS0FBSyxDQUFDO1FBQ2YsQ0FBQyxDQUFDLENBQUE7UUFDRixPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBVyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDeEUsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQzFDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUMsQ0FBQyxDQUFBO1FBRUYsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQVcsRUFBRSxFQUFFO1lBQzlCLDJDQUEyQztZQUMzQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUMxQyxPQUFPLElBQUksQ0FBQztRQUVkLENBQUMsQ0FBQyxDQUFBO1FBRUYsd0NBQXdDO1FBQ3hDLCtCQUErQjtRQUMvQixrREFBa0Q7UUFDbEQsTUFBTTtRQUNOLElBQUk7UUFDSixtSkFBbUo7UUFDbkosT0FBTyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBeUIsRUFBRSxLQUFhLEVBQUUsRUFBRTtZQUNoRSwyRUFBMkU7WUFDM0UsT0FBTyxvQkFBb0IsS0FBSyxDQUFDLENBQUMsQ0FBQyxVQUFVLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxjQUFjLENBQUE7UUFDdEosQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO0lBQ2IsQ0FBQztJQUNLLFlBQVksQ0FBQyxjQUF1QixJQUFJLEVBQUUsYUFBc0IsS0FBSzs7WUFDekUsT0FBTyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztRQUM1RSxDQUFDO0tBQUE7SUFDSyxPQUFPLENBQUMsY0FBdUIsSUFBSSxFQUFFLGFBQXNCLEtBQUs7O1lBQ3BFLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDM0IsTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFBO2FBQ3pEO1lBQ0QsSUFBSSxXQUFXLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2FBQ3BCO1lBQ0QsSUFBSSxhQUFhLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFBO1lBQ25DLDJDQUEyQztZQUMzQyx5Q0FBeUM7WUFDekMsSUFBSSxTQUFTLEdBQUc7OztzQkFHRSxhQUFhLHVCQUF1QixDQUFBO1lBRXRELElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsVUFBVSxRQUFRLENBQUMsUUFBUSx3Q0FBd0MsQ0FBQyxDQUFDLENBQUMsbURBQW1ELEVBQUU7Z0JBQy9KLE1BQU0sRUFBRSxNQUFNO2dCQUNkLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxFQUFFLGNBQWMsRUFBRSxtQ0FBbUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCLEVBQUU7Z0JBQzdGLGtCQUFrQjthQUNuQixDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQTtZQUNwRCxJQUFJLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtZQUNwQywyQkFBMkI7WUFDM0IscUVBQXFFO1lBQ3JFLG9DQUFvQztZQUNwQyx5QkFBeUI7WUFDekIsSUFBSSxJQUFJLEdBQVEsTUFBTSxJQUFBLHVCQUFTLEVBQUMsVUFBVSxDQUFDLENBQUE7WUFFM0MsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3JCLENBQUM7S0FBQTtJQUVELE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBb0I7O1FBQ2pDLElBQUk7WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtTQUMvQztRQUFDLE9BQU8sR0FBRyxFQUFFO1lBQ1osSUFBSTtnQkFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQUEsSUFBSSxDQUFDLE9BQU8sMENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7YUFFdEM7WUFBQyxPQUFPLElBQUksRUFBRTtnQkFDYixPQUFPLENBQUMsR0FBRyxDQUFDLGNBQWMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNuQztZQUNELE9BQU8sSUFBSSxDQUFDO1NBQ2I7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFBLHFCQUFPLEVBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQzVHLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sQ0FBQyxDQUFBO1FBQ2hDLElBQUksWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRXpGLElBQUksV0FBVyxHQUFHLElBQUEsMEJBQVksRUFBQyxPQUFPLEVBQUUsWUFBWSxDQUFDLENBQUE7UUFHckQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsWUFBWSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNqRSxJQUFJLGVBQWUsR0FBb0UsRUFBRSxDQUFBO1FBQ3pGLElBQUksZUFBZSxHQUFpQyxJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQzdELElBQUksSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQXVCLEVBQUUsRUFBRTtZQUN0RSxJQUFJLE1BQU0sR0FBRyxFQUFFLENBQUE7WUFDZixlQUFlLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDdkIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGVBQWUsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBRS9DLG9EQUFvRDtnQkFDcEQsZUFBZSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUE7Z0JBQ2pFLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFBO2dCQUN2QixJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQzlCLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO2lCQUM3QjthQUNGO1lBQ0QsR0FBRyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUEwQixFQUFFLFFBQVEsRUFBRSxFQUFFOztnQkFDckQsSUFBSSxlQUFlLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUNqQyxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQTtpQkFDM0M7Z0JBQ0QsSUFBSSxHQUFHLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxDQUFDLENBQUM7b0JBQ3pDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBWSxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQywwQ0FBRSxVQUFVLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7b0JBQy9FLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTtnQkFDWCxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNYLCtEQUErRDtvQkFDL0QsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQTtpQkFDM0Q7Z0JBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUVsQixDQUFDLENBQUMsQ0FBQTtZQUNGLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbkIsQ0FBQyxDQUFDLENBQUE7UUFDRixJQUFJLE1BQU0sR0FBRyxFQUFFLFdBQVcsRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsQ0FBQTtRQUM3RyxPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ25CLE9BQU8sTUFBTSxDQUFDO0lBQ2hCLENBQUM7Q0FDRjtBQTlXRCxzQ0E4V0M7QUFNRCxNQUFhLG9CQUFvQjtJQUUvQixZQUFZLE1BQWlDO1FBRDdDLFNBQUksR0FBaUMsSUFBSSxDQUFBO1FBRXZDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQzFCLElBQUksSUFBSSxHQUFRLEVBQUUsQ0FBQTtZQUNsQixJQUFJLElBQUksR0FBRyxJQUFJLENBQUM7WUFDaEIsS0FBSyxJQUFJLElBQUksSUFBSSxNQUFNLEVBQUU7Z0JBQ3ZCLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtvQkFDaEIsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFBO29CQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtpQkFDakI7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFBO29CQUN2QyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTtpQkFDakI7YUFDRjtTQUdGO2FBQU07WUFDTCxJQUFJLENBQUMsSUFBSSxHQUFHLEVBQUUsS0FBSyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLENBQUE7WUFDNUMsSUFBSSxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNyQixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDdEMsSUFBSSxDQUFDLElBQUksR0FBRyxFQUFFLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxDQUFBO2dCQUM1QyxJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQTthQUNqQjtTQUNGO0lBQ0gsQ0FBQztJQUNELE9BQU8sQ0FBQyxNQUE2QjtRQUNuQyxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQztRQUNwQixPQUFPLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDbkIsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN0QixJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7b0JBQ3BCLHlFQUF5RTtvQkFDekUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFBO29CQUNyQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztpQkFDbEI7cUJBQU07b0JBQ0wsMEVBQTBFO29CQUMxRSxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7b0JBQ3pCLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO2lCQUNsQjthQUNGO2lCQUFNO2dCQUNMLFFBQVEsR0FBRyxJQUFJLENBQUE7Z0JBQ2YsSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7YUFDbEI7U0FFRjtRQUNELE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUNELE9BQU87UUFDTCxJQUFJLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ3JCLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQTtRQUNaLE9BQU8sSUFBSSxJQUFJLElBQUksRUFBRTtZQUNuQixHQUFHLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtZQUNwQixJQUFJLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNsQjtRQUNELE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUNELFFBQVE7UUFDTixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDbEMsQ0FBQztDQUNGO0FBNURELG9EQTREQztBQUVZLFFBQUEsY0FBYyxHQUFHLHM2TEFBczZMLENBQUE7QUE4Q3A4TCxTQUFTLElBQUk7SUFDWCxJQUFJLEdBQXVCLENBQUE7SUFDM0IsR0FBRyxDQUFBO0FBRUwsQ0FBQztBQVNELE1BQU0scUJBQXFCLEdBQW1CLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUE7QUFHbkcsTUFBYSxRQUFRO0lBR25CO1FBRkEsa0JBQWEsR0FBNkIsSUFBSSxHQUFHLEVBQUUsQ0FBQTtRQUNuRCxvQkFBZSxHQUErQixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBZ0IvQyxvQkFBZSxHQUE0QixJQUFJLEdBQUcsRUFBRSxDQUFBO1FBQ3BELHdCQUFtQixHQUFHLENBQUMsQ0FBQTtJQWQvQixDQUFDO0lBQ08sbUJBQW1CLENBQUMsUUFBa0I7UUFDNUMsUUFBUSxRQUFRLEVBQUU7WUFDaEIsS0FBSyxXQUFXO2dCQUNkLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7WUFDNUIsS0FBSyxhQUFhO2dCQUNoQixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO1lBQzVCLEtBQUssYUFBYTtnQkFDaEIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtZQUM1QjtnQkFDRSxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFBO1NBQzFCO0lBQ0gsQ0FBQztJQUdELFdBQVcsQ0FBQyxRQUFvQjtRQUM5QixJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQTtRQUN0QyxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUE7UUFDekMsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBQ0QsY0FBYyxDQUFDLEtBQWE7UUFDMUIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDcEMsQ0FBQztJQUNELGVBQWU7UUFDYixLQUFLLElBQUksUUFBUSxJQUFJLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxFQUFFLEVBQUU7WUFDbEQsUUFBUSxFQUFFLENBQUE7U0FDWDtJQUNILENBQUM7SUFDRCxtQkFBbUIsQ0FBQyxRQUFrQjtRQUNwQyxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsSUFBSSxXQUFXLENBQUMsV0FBVyxFQUFFLEVBQUUsRUFBRSxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQzdILENBQUM7SUFDRCxpQkFBaUIsQ0FBQyxTQUFpQjtRQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLElBQUksV0FBVyxDQUFDLGlCQUFpQixTQUFTLEVBQUUsQ0FBQyxDQUFDLENBQUE7U0FDakY7UUFDRCxPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQzFDLENBQUM7SUFDSyxXQUFXOztZQUNmLElBQUksTUFBTSxHQUFHLE1BQU0sS0FBSyxDQUFDLG1EQUFtRCxDQUFDLENBQUE7WUFDN0UsSUFBSSxJQUFJLEdBQUcsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUE7WUFDOUIsSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUM1QixJQUFJLFdBQVcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUE7WUFDMUIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUE7WUFDbEIsSUFBSSxNQUFNLEdBQTBCLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsS0FBSyxFQUFFLEVBQUU7Z0JBQ2xFLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ3pCLElBQUksR0FBRyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksV0FBVyxFQUFFO29CQUNqRCxPQUFPLE1BQU0sQ0FBQTtpQkFDZDtnQkFDRCxJQUFJLEdBQUcsR0FBbUIsRUFBUyxDQUFBO2dCQUNuQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDbkMsUUFBUSxDQUFDLEVBQUU7d0JBQ1QsS0FBSyxDQUFDLENBQUM7d0JBQ1AsS0FBSyxDQUFDLENBQUM7d0JBQ1AsS0FBSyxDQUFDOzRCQUNKLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQTs0QkFDcEMsTUFBTTt3QkFDUixLQUFLLENBQUMsQ0FBQzt3QkFDUCxLQUFLLENBQUMsQ0FBQzt3QkFDUCxLQUFLLENBQUMsQ0FBQzt3QkFDUCxLQUFLLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUUsQ0FBQzt3QkFDUixLQUFLLEVBQUU7NEJBQ0wsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTs0QkFDeEIsTUFBTTt3QkFDUixLQUFLLENBQUM7NEJBQ0osR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsbUJBQW1CLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQTs0QkFDOUYsTUFBTTt3QkFDUjs0QkFDRSxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBOzRCQUNoQixNQUFNO3FCQUNUO2lCQUNGO2dCQUNELE9BQU8sR0FBRyxDQUFDLE1BQU0sR0FBRyxxQkFBcUIsQ0FBQyxNQUFNLEVBQUU7b0JBQ2hELEdBQUcsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFBO2lCQUNoRDtnQkFDRCxPQUFPLEdBQUcsQ0FBQztnQkFDWCwwSkFBMEo7WUFDNUosQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLE1BQU0sR0FBRyxFQUFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxDQUFBO1lBQ25ELE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbkIsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLE1BQU0sQ0FBQTtRQUU1QixDQUFDO0tBQUE7SUFDSyxjQUFjOztZQUNsQixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7WUFDZixJQUFJLFVBQVUsR0FBRyxNQUFNLElBQUksYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO1lBRXhHLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBcUcsRUFBRSxFQUFFO2dCQUNoSSxJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFBO2dCQUMzRSxJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBYSxDQUFDLENBQUE7Z0JBRXRELElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQ3hCLENBQUMsQ0FBQyxDQUFBO1lBQ0YsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFBO1FBQzdCLENBQUM7S0FBQTtJQUNLLGlCQUFpQjs7WUFDckIsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDO1lBQ2YsS0FBSyxJQUFJLElBQUksR0FBRyxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRTtnQkFDMUMsS0FBSyxJQUFJLEtBQUssR0FBRyxDQUFDLEVBQUUsS0FBSyxJQUFJLEVBQUUsRUFBRSxLQUFLLEVBQUUsRUFBRTtvQkFDeEMsSUFBSSxTQUFTLEdBQWlDLEdBQUcsSUFBSSxJQUFJLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO29CQUMzRixPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixTQUFTLEVBQUUsQ0FBQyxDQUFBO29CQUM3QyxJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksYUFBYSxFQUFFLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFBO29CQUN2SixJQUFJLEtBQUssR0FBRyxDQUFDLENBQUE7b0JBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUEySCxFQUFFLEtBQUssRUFBRSxFQUFFO3dCQUN6SixJQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsQ0FBQTt3QkFDMUosSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFBO3dCQUN4QyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQTt3QkFDdEIsS0FBSyxFQUFFLENBQUE7d0JBQ1AsSUFBSSxLQUFLLEdBQUcsSUFBSSxFQUFFOzRCQUNoQixLQUFLLEdBQUcsQ0FBQyxDQUFDOzRCQUNWLHFDQUFxQzt5QkFDdEM7b0JBQ0gsQ0FBQyxDQUFDLENBQUE7b0JBQ0YsR0FBRyxDQUFDLGVBQWUsRUFBRSxDQUFBO2lCQUN0QjthQUNGO1lBRUQsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFBO1FBQzNCLENBQUM7S0FBQTtDQUVGO0FBaklELDRCQWlJQztBQUVELE1BQWEsV0FBVztJQU10QixZQUFZLEtBQWEsRUFBRSxRQUFnQixNQUFNLENBQUMsV0FBVyxFQUFFO1FBSC9ELFNBQUksR0FBMEIsSUFBSSxzQkFBSyxFQUFFLENBQUE7UUFDekMsYUFBUSxHQUFXLElBQUksQ0FBQTtRQUN2QixhQUFRLEdBQVcsSUFBSSxDQUFBO1FBRXJCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1FBQ25CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7SUFDRCxHQUFHLENBQUMsSUFBWSxFQUFFLEtBQWE7UUFDN0IsSUFBSSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUNsRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUNELElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDbEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDNUIsQ0FBQztJQUNELFFBQVEsQ0FBQyxLQUFhLEVBQUUsR0FBVyxFQUFFLE1BQTREO1FBQy9GLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO1lBQ2QsT0FBTztTQUNSO1FBQ0QsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuRCxJQUFHLENBQUMsU0FBUyxFQUFDO1lBQ1osU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxDQUFDLENBQUE7U0FDakQ7UUFDRCxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ2hELElBQUcsQ0FBQyxPQUFPLEVBQUM7WUFDVixPQUFPLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxHQUFHLENBQUMsQ0FBQTtTQUM1QztRQUVELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFBO0lBQzVELENBQUM7Q0FDRjtBQWxDRCxrQ0FrQ0MifQ==

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