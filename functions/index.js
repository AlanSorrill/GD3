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
exports.RonaTest = exports.ReqTest = exports.listener = void 0;
const functions = __webpack_require__(/*! firebase-functions */ "firebase-functions");
const fs = __webpack_require__(/*! fs */ "fs");
const path = __webpack_require__(/*! path */ "path");
__webpack_require__(/*! ./common/FBF_Helpers */ "./srcFunctions/common/FBF_Helpers.ts");
const WonderData_1 = __webpack_require__(/*! ./common/WonderData */ "./srcFunctions/common/WonderData.ts");
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
    let data = yield new WonderData_1.WonderRequest().groupBy('Year').groupBy('Race').request();
    let exportPath = path.resolve(__dirname, '../data/exampleResponse.json');
    console.log(`saving to file${exportPath}`);
    fs.writeFileSync(exportPath, JSON.stringify(data));
    console.log('saved');
    res.setHeader('Content-Type', 'application/xml');
    res.send(data);
}));
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV1BGdW5jdGlvbnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmNGdW5jdGlvbnMvV1BGdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQUEsZ0RBQWdEO0FBR2hELHlCQUF3QjtBQUN4Qiw2QkFBNEI7QUFDNUIsZ0NBQTZCO0FBQzdCLG9EQUFvRztBQUVwRyxzQ0FBc0M7QUFDdEMsMkRBQTJEO0FBQzNELEVBQUU7QUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0FBRU4sUUFBQSxRQUFRLEdBQUcsU0FBUyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBTyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7SUFDbkUsR0FBRyxDQUFDLFNBQVMsQ0FBQyxjQUFjLEVBQUUsaUJBQWlCLENBQUMsQ0FBQTtJQUNoRCxJQUFJLGFBQWEsR0FBeUIsMkJBQWMsQ0FBQyxPQUFPLENBQUMsdUJBQXVCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLHNCQUFzQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUUsaUJBQWlCLENBQUMsQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDLENBQUMsVUFBVSxDQUFDLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdFQsSUFBSSxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQixJQUFJLElBQUksR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDakIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtR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

/***/ }),

/***/ "./srcFunctions/common/FBF_Helpers.ts":
/*!********************************************!*\
  !*** ./srcFunctions/common/FBF_Helpers.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.replaceAllInString = void 0;
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
if (typeof String.prototype.replaceAll == 'undefined') {
    String.prototype.replaceAll = function (a, b) {
        return this.split(a).join(b);
    };
}
function replaceAllInString(target, a, b) {
    return target.split(a).join(b);
}
exports.replaceAllInString = replaceAllInString;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRkJGX0hlbHBlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmNGdW5jdGlvbnMvY29tbW9uL0ZCRl9IZWxwZXJzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVNBLElBQUksT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sSUFBSSxXQUFXLEVBQUU7SUFDN0MsT0FBTyxDQUFDLEdBQUcsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFBO0lBQ25DLEdBQUcsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHO1FBQ3BCLElBQUksR0FBRyxHQUFjLElBQUksQ0FBQTtRQUN6QixJQUFJLEdBQUcsR0FBa0IsRUFBRSxDQUFBO1FBQzNCLEtBQUssSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3hCLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDakM7UUFDRCxPQUFPLEdBQUcsQ0FBQTtJQUNkLENBQUMsQ0FBQTtDQUNKO0FBQ0QsSUFBSSxPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsVUFBVSxJQUFJLFdBQVcsRUFBRTtJQUNuRCxNQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQVMsRUFBRSxDQUFTO1FBQ3hELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQyxDQUFDO0NBQ0w7QUFDRCxTQUFnQixrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsQ0FBUyxFQUFFLENBQVM7SUFFbkUsT0FBTyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztBQUVuQyxDQUFDO0FBSkQsZ0RBSUMifQ==

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
exports.ExampleRequest = exports.WonderRequest = exports.DeWonder = exports.AllWonderParams = exports.WonderQueryParam_GroupBy = exports.WonderQueryParam_Race = exports.WonderQueryParam_Gender = exports.WonderQueryParam_Measure = exports.WonderQueryParam_AgeGroup = exports.WonderQueryParam_Include = exports.WonderQueryParam = exports.WonderQueryParam_Util = exports.parseYearMonthString = exports.isYearMonthString = exports.MonthEnum = exports.YearStrings = exports.isWQP_None = void 0;
// import * as XMLParser from 'xml2js'
if (true) {
    global.fetch = __webpack_require__(/*! node-fetch */ "node-fetch");
}
const FBF_Helpers_1 = __webpack_require__(/*! ./FBF_Helpers */ "./srcFunctions/common/FBF_Helpers.ts");
// export type WonderQueryParamName = (keyof typeof WonderQueryParam) 
function isWQP_None(param) {
    return (param == 'None') || (param == WonderQueryParam_Util.None);
}
exports.isWQP_None = isWQP_None;
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
    for (let group of exports.AllWonderParams) {
        for (let key in group) {
            console.log(`Replacing ${group[key]} with ${key}`);
            tmp = (0, FBF_Helpers_1.replaceAllInString)(tmp, group[key], key);
        }
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
            'O_aar_enable': ['true'],
            'O_urban': [WonderQueryParam_GroupBy.Urbanization2013],
            'O_aar_CI': ['true'],
            'action-Send': ['Send'],
            'O_aar_SE': ['true'],
            'O_aar': ['aar_std'],
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
            'O_show_totals': ['true'],
            'O_show_zeros': ['true'],
            'O_timeout': ['600'],
            'O_title': ['Example1'],
            'O_javascript': ['off'],
            'O_ucd': [WonderQueryParam_Include.ICD10Codes],
            'F_D76.V1': [WonderQueryParam_Util.All],
            'F_D76.V10': [WonderQueryParam_Util.All],
            'F_D76.V2': ['C00-D48'],
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
            'VM_D76.M6_D76.V1_S': [WonderQueryParam_Util.All],
            'VM_D76.M6_D76.V17': [WonderQueryParam_Util.All],
            'VM_D76.M6_D76.V7': [WonderQueryParam_Util.All],
            'VM_D76.M6_D76.V8': [WonderQueryParam_Util.All],
            'finder-stage-D76.V1': ['codeset'],
            'finder-stage-D76.V10': ['codeset'],
            'finder-stage-D76.V2': ['codeset'],
            'finder-stage-D76.V25': ['codeset'],
            'finder-stage-D76.V27': ['codeset'],
            'finder-stage-D76.V9': ['codeset'],
            'saved_id': [],
            'stage': ['request']
        };
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
    setDefaults() {
        for (let key in this.defaultParams) {
            if (!this.params.has(key)) {
                console.log(`Defaulting ${key} to ${this.defaultParams[key]}`);
                this.params.set(key, this.defaultParams[key]);
            }
        }
    }
    toString() {
        console.log(`Building query string`);
        let toProcess = [];
        let processed = new Map();
        let name;
        for (let i = 1; i <= 5; i++) {
            name = `B_${i}`;
            toProcess.push([name, this.params.has(name) ? this.params.get(name) : [WonderQueryParam_Util.None]]);
            processed.set(name, true);
        }
        for (let key of this.params.keys()) {
            if (key.startsWith('M_')) {
                toProcess.push([key, this.params.get(key)]);
                processed.set(key, true);
            }
        }
        for (let key of this.params.keys()) {
            if (!processed.has(key)) {
                toProcess.push([key, this.params.get(key)]);
            }
        }
        return toProcess.map((param, index) => {
            console.log(`Mapping ${param[0]} to `, param[1]);
            return `<parameter><name>${param[0]}</name>${param[1].length > 0 ? param[1].map(str => `<value>${str}</value>`).join('') : '<value />'}</parameter>`;
        }).join('');
    }
    request(setDefaults = true) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.params.has('B_1')) {
                throw new Error(`Please group by at least one property`);
            }
            if (setDefaults) {
                this.setDefaults();
            }
            let reqPartOfBody = this.toString();
            console.log(`Requesting`, reqPartOfBody);
            console.log(`Query: ${reqPartOfBody}`);
            let fetchBody = `request_xml=<request-parameters><parameter>
        <name>accept_datause_restrictions</name>
        <value>true</value>
        </parameter>${reqPartOfBody}</request-parameters>`;
            let result = yield fetch(`https://wonder.cdc.gov/controller/datarequest/D76`, {
                method: 'POST',
                body: fetchBody,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
                // mode: 'no-cors'
            });
            console.log(result.status + " " + result.statusText);
            let textResult = yield result.text();
            console.log(textResult);
            // let jsonValue = await XMLParser.parseStringPromise(textResult, {})
            // console.log('JSON__________----')
            // console.log(jsonValue)
            return textResult;
        });
    }
}
exports.WonderRequest = WonderRequest;
exports.ExampleRequest = '<request-parameters><parameter><name>B_1</name><value>D76.V1-level1</value></parameter><parameter><name>B_2</name><value>D76.V8</value></parameter><parameter><name>B_3</name><value>*None*</value></parameter><parameter><name>B_4</name><value>*None*</value></parameter><parameter><name>B_5</name><value>*None*</value></parameter><parameter><name>F_D76.V1</name><value>1999</value><value>2000</value><value>2001</value><value>2002</value><value>2003</value><value>2004</value><value>2005</value><value>2006</value><value>2007</value><value>2008</value><value>2009</value><value>2010</value><value>2011</value><value>2012</value><value>2013</value></parameter><parameter><name>F_D76.V10</name><value>*All*</value></parameter><parameter><name>F_D76.V2</name><value>C00-D48</value></parameter><parameter><name>F_D76.V25</name><value>*All*</value></parameter><parameter><name>F_D76.V27</name><value>*All*</value></parameter><parameter><name>F_D76.V9</name><value>*All*</value></parameter><parameter><name>I_D76.V1</name><value>1999 (1999) 2000 (2000) 2001 (2001) 2002 (2002) 2003 (2003) 2004 (2004) 2005 (2005) 2006 (2006) 2007 (2007) 2008 (2008) 2009 (2009) 2010 (2010) 2011 (2011) 2012 (2012) 2013 (2013) </value></parameter><parameter><name>I_D76.V10</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V2</name><value>C00-D48 (Neoplasms) </value></parameter><parameter><name>I_D76.V25</name><value>All Causes of Death </value></parameter><parameter><name>I_D76.V27</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V9</name><value>*All* (The United States) </value></parameter><parameter><name>M_1</name><value>D76.M1</value></parameter><parameter><name>M_2</name><value>D76.M2</value></parameter><parameter><name>M_3</name><value>D76.M3</value></parameter><parameter><name>M_9</name><value>D76.M9</value></parameter><parameter><name>O_V10_fmode</name><value>freg</value></parameter><parameter><name>O_V1_fmode</name><value>freg</value></parameter><parameter><name>O_V25_fmode</name><value>freg</value></parameter><parameter><name>O_V27_fmode</name><value>freg</value></parameter><parameter><name>O_V2_fmode</name><value>freg</value></parameter><parameter><name>O_V9_fmode</name><value>freg</value></parameter><parameter><name>O_aar</name><value>aar_std</value></parameter><parameter><name>O_aar_CI</name><value>true</value></parameter><parameter><name>O_aar_SE</name><value>true</value></parameter><parameter><name>O_aar_enable</name><value>true</value></parameter><parameter><name>O_aar_pop</name><value>0000</value></parameter><parameter><name>O_age</name><value>D76.V5</value></parameter><parameter><name>O_javascript</name><value>on</value></parameter><parameter><name>O_location</name><value>D76.V9</value></parameter><parameter><name>O_oc-sect1-request</name><value>close</value></parameter><parameter><name>O_precision</name><value>1</value></parameter><parameter><name>O_rate_per</name><value>100000</value></parameter><parameter><name>O_show_suppressed</name><value>true</value></parameter><parameter><name>O_show_totals</name><value>true</value></parameter><parameter><name>O_show_zeros</name><value>true</value></parameter><parameter><name>O_timeout</name><value>600</value></parameter><parameter><name>O_title</name><value>Example1</value></parameter><parameter><name>O_ucd</name><value>D76.V2</value></parameter><parameter><name>O_urban</name><value>D76.V19</value></parameter><parameter><name>VM_D76.M6_D76.V10</name><value/></parameter><parameter><name>VM_D76.M6_D76.V17</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V1_S</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V7</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V1</name><value/></parameter><parameter><name>V_D76.V10</name><value/></parameter><parameter><name>V_D76.V11</name><value>*All*</value></parameter><parameter><name>V_D76.V12</name><value>*All*</value></parameter><parameter><name>V_D76.V17</name><value>*All*</value></parameter><parameter><name>V_D76.V19</name><value>*All*</value></parameter><parameter><name>V_D76.V2</name><value/></parameter><parameter><name>V_D76.V20</name><value>*All*</value></parameter><parameter><name>V_D76.V21</name><value>*All*</value></parameter><parameter><name>V_D76.V22</name><value>*All*</value></parameter><parameter><name>V_D76.V23</name><value>*All*</value></parameter><parameter><name>V_D76.V24</name><value>*All*</value></parameter><parameter><name>V_D76.V25</name><value/></parameter><parameter><name>V_D76.V27</name><value/></parameter><parameter><name>V_D76.V4</name><value>*All*</value></parameter><parameter><name>V_D76.V5</name><value>*All*</value></parameter><parameter><name>V_D76.V51</name><value>*All*</value></parameter><parameter><name>V_D76.V52</name><value>*All*</value></parameter><parameter><name>V_D76.V6</name><value>00</value></parameter><parameter><name>V_D76.V7</name><value>*All*</value></parameter><parameter><name>V_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V9</name><value/></parameter><parameter><name>action-Send</name><value>Send</value></parameter><parameter><name>dataset_code</name><value>D76</value></parameter><parameter><name>dataset_label</name><value>Underlying Cause of Death, 1999-2016</value></parameter><parameter><name>dataset_vintage</name><value>2016</value></parameter><parameter><name>finder-stage-D76.V1</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V10</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V2</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V25</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V27</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V9</name><value>codeset</value></parameter><parameter><name>saved_id</name><value/></parameter><parameter><name>stage</name><value>request</value></parameter></request-parameters>';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29uZGVyRGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyY0Z1bmN0aW9ucy9jb21tb24vV29uZGVyRGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxzQ0FBc0M7QUFDdEMsSUFBSSxJQUFJLEVBQUU7SUFDUixNQUFNLENBQUMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQTtDQUNyQztBQUNELCtDQUFtRDtBQUduRCxzRUFBc0U7QUFDdEUsU0FBZ0IsVUFBVSxDQUFDLEtBQXFDO0lBQzlELE9BQU8sQ0FBQyxLQUFLLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUkscUJBQXFCLENBQUMsSUFBSSxDQUFDLENBQUE7QUFDbkUsQ0FBQztBQUZELGdDQUVDO0FBR0QsU0FBZ0IsV0FBVyxDQUFDLFFBQWdCLElBQUksRUFBRSxNQUFjLElBQUk7SUFDbEUsSUFBSSxHQUFHLEdBQUcsRUFBRSxDQUFBO0lBQ1osS0FBSyxJQUFJLENBQUMsR0FBRyxLQUFLLEVBQUUsQ0FBQyxJQUFJLEdBQUcsRUFBRSxDQUFDLEVBQUUsRUFBRTtRQUNqQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQTtLQUNqQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQU5ELGtDQU1DO0FBQ0QsSUFBWSxTQUVYO0FBRkQsV0FBWSxTQUFTO0lBQ25CLCtDQUFPLENBQUE7SUFBRSxpREFBUSxDQUFBO0lBQUUsMkNBQUssQ0FBQTtJQUFFLDJDQUFLLENBQUE7SUFBRSx1Q0FBRyxDQUFBO0lBQUUseUNBQUksQ0FBQTtJQUFFLHlDQUFJLENBQUE7SUFBRSw2Q0FBTSxDQUFBO0lBQUUsbURBQVMsQ0FBQTtJQUFFLCtDQUFPLENBQUE7SUFBRSxrREFBUSxDQUFBO0lBQUUsa0RBQVEsQ0FBQTtBQUNsRyxDQUFDLEVBRlcsU0FBUyxHQUFULGlCQUFTLEtBQVQsaUJBQVMs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

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