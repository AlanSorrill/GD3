
// import * as XMLParser from 'xml2js'
if (true) {
  global.fetch = require('node-fetch')
}
import { FColor } from 'bristolboard';
import BTree from 'sorted-btree';
import { concactinate, flatten, isAllTrue as isAnyTrue, replaceAllInString, XmlToJson } from './FBF_Helpers';


// export type WonderQueryParamName = (keyof typeof WonderQueryParam) 
export function isWQP_None(param: string | WonderQueryParam_Util): param is (keyof typeof WonderQueryParam_Util) {
  return (param == 'None') || (param == WonderQueryParam_Util.None)
}
export type YearString = '1999' | '2000' | '2001' | '2002' | '2003' | '2004' | '2005' | '2006' | '2007' | '2008' | '2009' | '2010' | '2011' | '2012' | '2013' | '2014' | '2015' | '2016' | '2017' | '2018' | '2019' | '2020'
export type MonthString = '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
export type YearAndMonthString<year extends YearString, month extends MonthString> = `${year}/${month}`
export function YearStrings(start: number = 1999, end: number = 2020): YearString[] {
  let out = []
  for (let i = start; i <= end; i++) {
    out.push(`${i}`)
  }
  return out;
}
export enum MonthEnum {
  January, February, March, April, May, June, July, August, September, October, November, December
}
export type YearMonthString = `${keyof typeof MonthEnum}-${YearString}`
export function isYearMonthString(str: string): str is YearMonthString {
  return str.split('-').length == 2
}
export function parseYearMonthString(str: YearMonthString | YearString): [year: YearString, month: number] {
  let parts = str.split('-')
  switch (parts.length) {
    case 0:
      return null;
    case 1:
      return [parts[0] as YearString, -1]
    case 2:
      return [parts[0] as YearString, MonthEnum[parts[1]]]
  }
}
export enum WonderQueryParam_Util {
  None = '*None*',
  All = '*All*'
}
export enum WonderQueryParam {

  //FIV
  YearAndMonth = 'D76.V1'

}
export type WonderQueryParam_CauseOfDeathBy = 'ICD10Codes' | 'ICD10_130CauseListInfants' | 'DrugAlcoholInducedCauses' | 'ICD10_113CauseList' | 'InjuryIntent'
export type WonderQueryParam_LocationBy = 'YearAndMonth' | 'CensusRegions' | 'StatesAndCounties'

export enum WonderQueryParam_Include {
  YearAndMonth = 'D76.V1',
  CensusRegions = 'D76.V10',
  ICD10Codes = 'D76.V2',
  HHSRegions = 'D76.V27',
  StatesAndCounties = 'D76.V9',
}
export enum WonderQueryParam_AgeGroup {
  TenYear = 'D76.V5',
  FiveYear = 'D76.V51',
  SingleYear = 'D76.V52',
  Infant = 'D76.V6'
}
export enum WonderQueryParam_Measure {
  Deaths = 'D76.M1',
  Population = 'D76.M2',
  CrudeRate = 'D76.M3',
  CrudeRateStandardError = 'D76.M31',
  CrudeRate95ConfidenceInterval = 'D76.M32',
  AgeAdjustedRate = 'D76.M4',
  AgeAdjustedRateStandardError = 'D76.M41',
  AgeAdjustedRateConfidenceInterval = 'D76.M42',
  PercentOfTotalDeaths = 'D76.M9',
}
export enum WonderQueryParam_Gender {
  Male = 'M',
  Female = 'F'
}
export enum WonderQueryParam_Race {
  HispanicOrLatino = '2135-2',
  NotHispanicOrLatino = '2186-2',
  NotStated = 'NS',


  AmericanIndianOrAlaskaNative = '1002-5',
  AsianOrPacificIslander = 'A-PI',
  Black = '2054-5',
  White = '2106-3'

}
export type WonderQueryParam_Urbanization_Name = 'Urbanization2006' | 'Urbanization2013'
export type WonderQueryParam_Urbanization = WonderQueryParam_GroupBy.Urbanization2006 | WonderQueryParam_GroupBy.Urbanization2013
export enum WonderQueryParam_GroupBy {
  CensusRegion = "D76.V10-level1",
  CensusDivision = "D76.V10-level2",
  HHSRegion = "D76.V27-level1",
  State = "D76.V9-level1",
  County = "D76.V9-level2",
  Urbanization2013 = "D76.V19",
  Urbanization2006 = "D76.V11",

  AgeGroups = "D76.V5",
  Gender = "D76.V7",
  HispanicOrigin = "D76.V17",
  Race = "D76.V8",

  //time
  Year = "D76.V1-level1",
  Month = "D76.V1-level2",
  Weekday = "D76.V24",

  Autopsy = "D76.V20",
  PlaceofDeath = "D76.V21",


  LeadingCausesofDeath = "D76.V28",
  LeadingCausesofDeathInfants = "D76.V29",
  ICDChapter = "D76.V2-level1",
  ICDSubChapter = "D76.V2-level2",
  CauseOfdeath = "D76.V2-level3",
  ICD10_113CauseList = "D76.V4",
  ICD10_130CauseListInfants = "D76.V12",
  InjuryIntent = "D76.V22",
  InjuryMechanismAndAllOtherLeadingCauses = "D76.V23",
  DrugAlcoholInducedCauses = "D76.V25",
}
export const AllWonderParams = [WonderQueryParam_Include, WonderQueryParam_AgeGroup, WonderQueryParam_GroupBy, , WonderQueryParam_Measure, , WonderQueryParam_Util]



let WonderQueryParam_Reversed_Cache = null
// export function WonderQueryParam_Reversed() {
//   if (WonderQueryParam_Reversed_Cache == null) {
//     let WonderQueryParam_Reversed_Cache = {} as any
//     for (let key in WonderQueryParam) {
//       WonderQueryParam_Reversed_Cache[WonderQueryParam[key]] = key;
//     }
//   }
//   return WonderQueryParam_Reversed_Cache;
// }
export function DeWonder(text: string) {
  let tmp = text;
  let allTranslations: Array<[groupName: string, itemName: string, itemValue: string]> = []
  for (let groupName in AllWonderParams) {
    let group = AllWonderParams[groupName]

    for (let key in group) {
      allTranslations.push([groupName, group[key], key])
    }
  }

  allTranslations = allTranslations.sort((a, b) => (b[1].length - a[1].length))
  for (let item of allTranslations) {
    // console.log(`Replacing ${group[key]} with ${key}`)
    tmp = replaceAllInString(tmp, `F_${item[1]}`, `F_Only_${item[2]}`)
    tmp = replaceAllInString(tmp, `I_${item[1]}`, `I_Only_${item[2]}`)
    tmp = replaceAllInString(tmp, `V_${item[1]}`, `V_Only_${item[2]}`)
    tmp = replaceAllInString(tmp, item[1], item[2])
  }
  return tmp
}


// export type WonderQueryParam = WonderQueryParams_Utility | WonderQueryParams_Causes | WonderQueryParams_Demographic | WonderQueryParams_Location | WonderQueryParams_Time


export type WonderParamPair = [string,]


export class WonderRequest {
  constructor() {
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

      'F_D76.V1': [WonderQueryParam_Util.All],//Include all dates
      'F_D76.V10': [WonderQueryParam_Util.All],//Include all Census Regions
      'F_D76.V2': [WonderQueryParam_Util.All],//Include all ICD-10 Codes --TESTING ONLY CANCER
      'F_D76.V9': [WonderQueryParam_Util.All],//Include all States and Counties

      'V_D76.V7': [WonderQueryParam_Util.All],//Gender
      'V_D76.V8': [WonderQueryParam_Util.All],//Race
      'V_D76.V9': [],//state

      'V_D76.V6': ['00'],//Infant Age Groups
      'V_D76.V52': [WonderQueryParam_Util.All],//Single-Year age groups
      'V_D76.V5': [WonderQueryParam_Util.All],//Ten year age groups
      'V_D76.V51': [WonderQueryParam_Util.All],//Five year age groups
      'V_D76.V17': [WonderQueryParam_Util.All],//Hispanic Origin
      'V_D76.V19': [WonderQueryParam_Util.All],//Urbanization
      'V_D76.V2': [],//ICD10-Codes
      'V_D76.V20': [WonderQueryParam_Util.All],//Autopsy Y N U  = yes no unknown
      'V_D76.V21': [WonderQueryParam_Util.All],//Place of death
      'V_D76.V22': [WonderQueryParam_Util.All],//Injury Intent
      'V_D76.V23': [WonderQueryParam_Util.All],//Injury Mechanism & all other leading causes
      'V_D76.V24': [WonderQueryParam_Util.All],//Weekdays
      'V_D76.V25': [],//Drug/Alcohol Induced Causes
      'F_D76.V27': [WonderQueryParam_Util.All],//Include all HHSRegions


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
    }
    this.defaultFIVParams = {

    }

  }
  params: Map<string, string[]> = new Map()
  groupByCount: number = 0;
  groupByCountLimit: number = 5
  defaultParams: { [key: string]: string[] }
  defaultFIVParams: { [key: (`F_${string}` | `I_${string}` | `V_${string}`)]: string[] }
  addParam(name: string, value: string | string[]) {
    if (typeof value == 'string') {
      this.params.set(name, [value])
    } else {
      this.params.set(name, value)
    }
    return this
  }
  urbanBy(version: WonderQueryParam_Urbanization_Name) {
    let vCode = WonderQueryParam_GroupBy[version]
    this.addParam('O_urban', vCode)
    return this;
  }
  enableAgeAdjustedRate(isEnabled: boolean, confidenceInterval95: boolean = isEnabled, standardError: boolean = isEnabled) {
    this.addParam('O_aar_enable', isEnabled ? 'true' : 'false')
    this.addParam('O_aar_CI', confidenceInterval95 ? 'true' : 'false')
    this.addParam('O_aar_SE', standardError ? 'true' : 'false')
    return this
  }
  ageAdjustedRate(rateBy: 'aar_none' | 'aar_std' | 'aar_nonstd') {
    this.addParam('O_arr', rateBy)
    return this;
  }
  population(yearOfPopulationCount: '0000' | '1940' | '1970' | '2000') {
    this.addParam('O_aar_pop', yearOfPopulationCount)
    return this;
  }
  locationBy(locByName: WonderQueryParam_LocationBy) {
    let locBy = WonderQueryParam_Include[locByName]
    this.params.set('O_Location', [locBy])
    return this;
  }
  includeDates(dates: 'all' | YearMonthString[]) {
    let paramName = `F_${WonderQueryParam_Include.YearAndMonth}`
    if (dates == 'all') {
      this.params.set(paramName, [WonderQueryParam_Util.All])
      return;
    }
    return this;
  }
  enableJavascript(enabled: boolean) {
    this.addParam('O_javascript', enabled ? 'on' : 'off');
    return this;
  }
  measure(measureBy: keyof typeof WonderQueryParam_Measure) {
    let paramName = `M_${measureBy.replace('D.76.M', '')}`
    this.addParam(paramName, WonderQueryParam_Measure[measureBy])
  }
  causeOfDeathBy(deathBy: WonderQueryParam_CauseOfDeathBy) {
    let code: WonderQueryParam_CauseOfDeathBy = deathBy in WonderQueryParam_Include ? WonderQueryParam_Include[deathBy] : WonderQueryParam_GroupBy[deathBy]
    this.addParam('O_ucd', [code])
    return this;
  }
  ageGroups(groupName: keyof typeof WonderQueryParam_AgeGroup) {
    this.addParam(`O_age`, [WonderQueryParam_AgeGroup[groupName]])
    return this;
  }
  filterByYear(years: WonderQueryParam_Util.All | (YearString | YearAndMonthString<any, any>)[]) {
    //let val = (typeof years == 'string') ? years : years.map(y => `${y} (${y})`).join(' ')
    // return this.addParam('I_D76.V1', val);
    return this.addParam(`F_D76.V1`, years)

  }
  groupBy(groupByName: (keyof typeof WonderQueryParam_GroupBy) | 'None') {
    if (this.groupByCount >= this.groupByCountLimit) {
      throw new Error(`Cannot group by more than ${this.groupByCountLimit}`)
    }
    let parameterName = `B_${this.groupByCount + 1}`
    if (isWQP_None(groupByName)) {
      this.addParam(parameterName, WonderQueryParam_Util.None);
    } else {
      let param = WonderQueryParam_GroupBy[groupByName]
      this.addParam(parameterName, param);
    }
    this.groupByCount++;
    return this
  }
  toParamMap() {
    this.setDefaults();
    return this.params
  }
  private alternatives(k: string) {
    if (k.length < 3) {
      return [k];
    }
    let start = k.substring(0, 2)
    let rest = k.substring(2)
    switch (start) {
      case 'F_':
        return [k, `I_${rest}`, `V_${rest}`]
      case 'I_':
        return [k, `F_${rest}`, `V_${rest}`]
      case 'V_':
        return [k, `I_${rest}`, `F_${rest}`]
      default:
        return [k]
    }
  }
  setDefaults() {
    let ths = this;
    for (let key in this.defaultParams) {
      if (!(isAnyTrue(ths.alternatives(key).map((altKey) => {
        // console.log(`Checking alternative ${altKey}`)
        if (ths.params.has(altKey)) {
          // console.log(`----Alt Found ${altKey}`)
        }
        return ths.params.has(altKey)
      })))) {

        // console.log(`Defaulting ${key} (${DeWonder(key)}) to ${this.defaultParams[key]}`)
        this.params.set(key, this.defaultParams[key]);
      }
    }
  }
  toString() {
    // console.log(`Building query string`)
    let ths = this;
    let toProcess: [string, string[]][] = []
    let processed: Map<string, boolean> = new Map()
    let name: string

    let keyList: ConsumableLinkedList<string> = new ConsumableLinkedList(this.params.keys())
    keyList.consume((key: string) => {
      if (key.startsWith('B_')) {
        toProcess.push([key, ths.params.get(key)])
        return true;
      }
      return false;
    })
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
    keyList.consume((key: string) => {
      if (key.startsWith('M_')) {
        toProcess.push([key, ths.params.get(key)])
        return true;
      }
      return false;
    })
    keyList.consume((key: string) => {
      if (key.startsWith('O_')) {
        toProcess.push([key, ths.params.get(key)])
        return true;
      }
      return false;
    })
    keyList.consume((key: string) => {
      if (key.startsWith('F_') || key.startsWith('I_') || key.startsWith('V_')) {
        toProcess.push([key, ths.params.get(key)])
        return true;
      }
      return false;
    })

    keyList.consume((key: string) => {
      // console.log(`Uordered parameter ${key}`)
      toProcess.push([key, ths.params.get(key)])
      return true;

    })

    // for (let key of this.params.keys()) {
    //   if (!processed.has(key)) {
    //     toProcess.push([key, this.params.get(key)])
    //   }
    // }
    // console.log(`Full Query:\n${toProcess.map((param: [string, string[]]) => `${param[0]}(${DeWonder(param[0])}) = \n${param[1].join('\n--')}\n`)}`)
    return toProcess.map((param: [string, string[]], index: number) => {
      // console.log(`Mapping ${param[0]} (${DeWonder(param[0])}) to `, param[1])
      return `<parameter><name>${param[0]}</name>${param[1].length > 0 ? param[1].map(str => `<value>${str}</value>`).join('') : '<value />'}</parameter>`
    }).join('')
  }
  async requestTable(setDefaults: boolean = true, clientSide: boolean = false): Promise<Clean_Wonder_Table> {
    return WonderRequest.toTable(await this.request(setDefaults, clientSide));
  }
  async request(setDefaults: boolean = true, clientSide: boolean = false): Promise<RawWonder_Page> {
    if (!this.params.has('B_1')) {
      throw new Error(`Please group by at least one property`)
    }
    if (setDefaults) {
      this.setDefaults();
    }
    let reqPartOfBody = this.toString()
    // console.log(`Requesting`, reqPartOfBody)
    // console.log(`Query: ${reqPartOfBody}`)
    let fetchBody = `request_xml=<request-parameters><parameter>
        <name>accept_datause_restrictions</name>
        <value>true</value>
        </parameter>${reqPartOfBody}</request-parameters>`

    let result = await fetch(clientSide ? `http://${location.hostname}:5001/gdsn3-22/us-central1/WonderProxy` : `https://wonder.cdc.gov/controller/datarequest/D76`, {
      method: 'POST',
      body: fetchBody,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Accept': 'application/xml' },
      // mode: 'no-cors'
    })
    console.log(result.status + " " + result.statusText)
    let textResult = await result.text()
    // console.log(textResult);
    // let jsonValue = await XMLParser.parseStringPromise(textResult, {})
    // console.log('JSON__________----')
    // console.log(jsonValue)
    let json: any = await XmlToJson(textResult)

    return json.page[0]
  }

  static toTable(data: RawWonder_Page): Clean_Wonder_Table {
    try {
      console.log(data.response[0]['data-table'][0])
    } catch (err) {
      try {
        console.log(data.message?.join('\n'))

      } catch (errr) {
        console.log(`Bad response`, data);
      }
      return null;
    }
    let byCodes = flatten(data.response[0].request[0].byvariables.map((v) => v.variable.map((vv) => vv.$.code)))
    console.log('By codes', byCodes)
    let measureCodes = data.response[0]['measure-selections'][0].measure.map((m) => m.$.code)

    let columnCodes = concactinate(byCodes, measureCodes)


    console.log('Column Codes', measureCodes.map((c) => DeWonder(c)))
    let repeatedColumns: Array<[count: number, value: (string | number), index: number]> = []
    let columnsToRepeat: Map<number, string | number> = new Map()
    let rows = []
    data.response[0]['data-table'][0].r.forEach((row: RawWonder_TableRow) => {
      let column = []
      columnsToRepeat.clear()
      for (let i = 0; i < repeatedColumns.length; i++) {

        // console.log(`Repeating ${repeatedColumns[i][1]}`)
        columnsToRepeat.set(repeatedColumns[i][2], repeatedColumns[i][1])
        repeatedColumns[i][0]--
        if (repeatedColumns[i][0] <= 0) {
          repeatedColumns.splice(i, 1)
        }
      }
      row.c.forEach((col: RawWonder_TableColumn, colIndex) => {
        if (columnsToRepeat.has(colIndex)) {
          column.push(columnsToRepeat.get(colIndex))
        }
        let val = (typeof col.$.l == 'undefined') ?
          (col.$.v == "Unreliable" ? "Unreliable" : Number(col.$.v?.replaceAll(',', '')))
          : col.$.l
        if (col.$.r) {
          // console.log(`Repeating ${val} ${Number(col.$.r) - 1} times`)
          repeatedColumns.push([Number(col.$.r) - 1, val, colIndex])
        }
        column.push(val)

      })
      rows.push(column)
    })
    let output = { columnCodes: columnCodes, columnNames: columnCodes.map((code) => DeWonder(code)), rows: rows }
    console.log(output)
    return output;
  }
}

export interface ConsumableLinkedList_Node<T> {
  value: T
  next: ConsumableLinkedList_Node<T> | null
}
export class ConsumableLinkedList<T> {
  root: ConsumableLinkedList_Node<T> = null
  constructor(values: T[] | IterableIterator<T>) {
    if (!Array.isArray(values)) {
      let vals: T[] = []
      let node = null;
      for (let item of values) {
        if (node == null) {
          this.root = { value: item, next: null }
          node = this.root
        } else {
          node.next = { value: item, next: null }
          node = node.next
        }
      }


    } else {
      this.root = { value: values[0], next: null }
      let node = this.root;
      for (let i = 1; i < values.length; i++) {
        node.next = { value: values[i], next: null }
        node = node.next
      }
    }
  }
  consume(onEach: (value: T) => boolean) {
    let node = this.root;
    let lastNode = null;
    while (node != null) {
      if (onEach(node.value)) {
        if (lastNode == null) {
          //  console.log(`Consuming ${node.value} as root now ${this.toString()}`)
          this.root = node.next
          node = this.root;
        } else {
          //  console.log(`Consuming ${node.value} in chain now ${this.toString()}`)
          lastNode.next = node.next
          node = node.next;
        }
      } else {
        lastNode = node
        node = node.next;
      }

    }
    return this;
  }
  toArray() {
    let node = this.root;
    let out = []
    while (node != null) {
      out.push(node.value)
      node = node.next;
    }
    return out;
  }
  toString() {
    return this.toArray().join(', ')
  }
}

export const ExampleRequest = '<request-parameters><parameter><name>B_1</name><value>D76.V1-level1</value></parameter><parameter><name>B_2</name><value>D76.V8</value></parameter><parameter><name>B_3</name><value>*None*</value></parameter><parameter><name>B_4</name><value>*None*</value></parameter><parameter><name>B_5</name><value>*None*</value></parameter><parameter><name>F_D76.V1</name><value>1999</value><value>2000</value><value>2001</value><value>2002</value><value>2003</value><value>2004</value><value>2005</value><value>2006</value><value>2007</value><value>2008</value><value>2009</value><value>2010</value><value>2011</value><value>2012</value><value>2013</value></parameter><parameter><name>F_D76.V10</name><value>*All*</value></parameter><parameter><name>F_D76.V2</name><value>C00-D48</value></parameter><parameter><name>F_D76.V25</name><value>*All*</value></parameter><parameter><name>F_D76.V27</name><value>*All*</value></parameter><parameter><name>F_D76.V9</name><value>*All*</value></parameter><parameter><name>I_D76.V1</name><value>1999 (1999) 2000 (2000) 2001 (2001) 2002 (2002) 2003 (2003) 2004 (2004) 2005 (2005) 2006 (2006) 2007 (2007) 2008 (2008) 2009 (2009) 2010 (2010) 2011 (2011) 2012 (2012) 2013 (2013) </value></parameter><parameter><name>I_D76.V10</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V2</name><value>C00-D48 (Neoplasms) </value></parameter><parameter><name>I_D76.V25</name><value>All Causes of Death </value></parameter><parameter><name>I_D76.V27</name><value>*All* (The United States) </value></parameter><parameter><name>I_D76.V9</name><value>*All* (The United States) </value></parameter><parameter><name>M_1</name><value>D76.M1</value></parameter><parameter><name>M_2</name><value>D76.M2</value></parameter><parameter><name>M_3</name><value>D76.M3</value></parameter><parameter><name>M_9</name><value>D76.M9</value></parameter><parameter><name>O_V10_fmode</name><value>freg</value></parameter><parameter><name>O_V1_fmode</name><value>freg</value></parameter><parameter><name>O_V25_fmode</name><value>freg</value></parameter><parameter><name>O_V27_fmode</name><value>freg</value></parameter><parameter><name>O_V2_fmode</name><value>freg</value></parameter><parameter><name>O_V9_fmode</name><value>freg</value></parameter><parameter><name>O_aar</name><value>aar_std</value></parameter><parameter><name>O_aar_CI</name><value>true</value></parameter><parameter><name>O_aar_SE</name><value>true</value></parameter><parameter><name>O_aar_enable</name><value>true</value></parameter><parameter><name>O_aar_pop</name><value>0000</value></parameter><parameter><name>O_age</name><value>D76.V5</value></parameter><parameter><name>O_javascript</name><value>on</value></parameter><parameter><name>O_location</name><value>D76.V9</value></parameter><parameter><name>O_oc-sect1-request</name><value>close</value></parameter><parameter><name>O_precision</name><value>1</value></parameter><parameter><name>O_rate_per</name><value>100000</value></parameter><parameter><name>O_show_suppressed</name><value>true</value></parameter><parameter><name>O_show_totals</name><value>true</value></parameter><parameter><name>O_show_zeros</name><value>true</value></parameter><parameter><name>O_timeout</name><value>600</value></parameter><parameter><name>O_title</name><value>Example1</value></parameter><parameter><name>O_ucd</name><value>D76.V2</value></parameter><parameter><name>O_urban</name><value>D76.V19</value></parameter><parameter><name>VM_D76.M6_D76.V10</name><value/></parameter><parameter><name>VM_D76.M6_D76.V17</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V1_S</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V7</name><value>*All*</value></parameter><parameter><name>VM_D76.M6_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V1</name><value/></parameter><parameter><name>V_D76.V10</name><value/></parameter><parameter><name>V_D76.V11</name><value>*All*</value></parameter><parameter><name>V_D76.V12</name><value>*All*</value></parameter><parameter><name>V_D76.V17</name><value>*All*</value></parameter><parameter><name>V_D76.V19</name><value>*All*</value></parameter><parameter><name>V_D76.V2</name><value/></parameter><parameter><name>V_D76.V20</name><value>*All*</value></parameter><parameter><name>V_D76.V21</name><value>*All*</value></parameter><parameter><name>V_D76.V22</name><value>*All*</value></parameter><parameter><name>V_D76.V23</name><value>*All*</value></parameter><parameter><name>V_D76.V24</name><value>*All*</value></parameter><parameter><name>V_D76.V25</name><value/></parameter><parameter><name>V_D76.V27</name><value/></parameter><parameter><name>V_D76.V4</name><value>*All*</value></parameter><parameter><name>V_D76.V5</name><value>*All*</value></parameter><parameter><name>V_D76.V51</name><value>*All*</value></parameter><parameter><name>V_D76.V52</name><value>*All*</value></parameter><parameter><name>V_D76.V6</name><value>00</value></parameter><parameter><name>V_D76.V7</name><value>*All*</value></parameter><parameter><name>V_D76.V8</name><value>*All*</value></parameter><parameter><name>V_D76.V9</name><value/></parameter><parameter><name>action-Send</name><value>Send</value></parameter><parameter><name>dataset_code</name><value>D76</value></parameter><parameter><name>dataset_label</name><value>Underlying Cause of Death, 1999-2016</value></parameter><parameter><name>dataset_vintage</name><value>2016</value></parameter><parameter><name>finder-stage-D76.V1</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V10</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V2</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V25</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V27</name><value>codeset</value></parameter><parameter><name>finder-stage-D76.V9</name><value>codeset</value></parameter><parameter><name>saved_id</name><value/></parameter><parameter><name>stage</name><value>request</value></parameter></request-parameters>'

export interface Clean_Wonder_Table {
  columnNames: string[]
  columnCodes: string[]
  rows: Array<(string | number)>[]
}
export interface RawWonder_Response {
  caveats: any[]
  'data-table': Array<RawWonder_DataTable>
  request: Array<RawWonder_Request>
  'measure-selections': RawWonder_MeasureSelections[]
}
export interface RawWonder_Request {
  'measure-selections': RawWonder_MeasureSelections[]
  byvariables: Array<{ variable: Array<{ $: { code: string } }> }>
}
export interface RawWonder_MeasureSelections {
  measure: RawWonder_Measure[]
}
export interface RawWonder_Measure {
  $: { code: WonderQueryParam }
}

export interface RawWonder_Page {
  'agreement-signed': string
  message?: string[]
  dataset: any
  defaultMap: string[]
  platorm: string[]
  response: RawWonder_Response[]
}
export interface RawWonder_DataTable {
  '$': { 'show-all-labels': string }
  r: Array<RawWonder_TableRow>
}
export interface RawWonder_TableRow {
  c: Array<RawWonder_TableColumn>
}
export interface RawWonder_TableColumn {
  '$': {
    l?: string
    v?: string
    r?: string
  }
}
function test() {
  let val: RawWonder_Response
  val

}
export type RawRonaColumns = [DataAsOf: number, StartDate: number, EndDate: number, Group: string, Year: number, Month: number, State: string, Sex: string, AgeGroup: string,
  COVID19Deaths: number,//9
  TotalDeaths: number,//10
  PneumoniaDeaths: number,//11
  PneumoniaAndCOVID19Deaths: number,//12
  InfluenzaDeaths: number,//13
  PneumoniaInfluenzaOrCOVID19Deaths: number,//14
  Footnote: string]
const RawRonaColumnsDefault: RawRonaColumns = [0, 0, 0, '', 0, 0, '', '', '', 0, 0, 0, 0, 0, 0, '']
export type AgeGroup = '< 1 year' | '1-4 years' | '5-14 years' | '15-24 years' | '25-34 years' | '35-44 years' | '45-54 years' | '55-64 years' | '65-74 years' | '75-84 years' | '85+ years' | 'Not Stated'

export class Database {
  deathsByCause: Map<string, DataChannel> = new Map()
  populationByAge: Map<AgeGroup, DataChannel> = new Map()
  constructor() {

  }
  private getColorForAgeGroup(ageGroup: AgeGroup): FColor {
    switch (ageGroup) {
      case '1-4 years':
        return fColor.blue.darken1
      case '15-24 years':
        return fColor.blue.darken2
      case '25-34 years':
        return fColor.blue.darken3
      default:
        return fColor.blue.base
    }
  }
  private updateListeners: Map<number, () => void> = new Map()
  private updateListenerCount = 0
  addListener(onUpdate: () => void) {
    let index = this.updateListenerCount++
    this.updateListeners.set(index, onUpdate)
    return index;
  }
  removeListener(index: number) {
    this.updateListeners.delete(index)
  }
  notifyListeners() {
    for (let listener of this.updateListeners.values()) {
      listener()
    }
  }
  getPopulationForAge(ageGroup: AgeGroup) {
    let ths = this;
    return this.populationByAge.getWithDefault(ageGroup, (ag) => new DataChannel(`AgeGroup${ag}`, ths.getColorForAgeGroup(ag)))
  }
  getDeathsForCause(causeName: string) {
    if (!this.deathsByCause.has(causeName)) {
      this.deathsByCause.set(causeName, new DataChannel(`DeathsForCause${causeName}`))
    }
    return this.deathsByCause.get(causeName)
  }
  async pullCdcData() {
    let result = await fetch('https://data.cdc.gov/api/views/9bhg-hcku/rows.csv')
    let text = await result.text()
    let lines = text.split('\n')
    let columnNames = lines[0]
    lines.splice(0, 1)
    let values: Array<RawRonaColumns> = lines.mapOrDrop((line, index) => {
      let raw = line.split(',')
      if (raw[3] != 'By Month' || raw[7] != 'All Sexes') {
        return 'DROP'
      }
      let out: RawRonaColumns = [] as any
      for (let i = 0; i < raw.length; i++) {
        switch (i) {
          case 0:
          case 1:
          case 2:
            out.push(new Date(raw[i]).getTime())
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
            out.push(Number(raw[i]))
            break;
          case 8:
            out.push(raw[i].replace('Under 1 year', '< 1 year').replace('85 years and over', '85+ years'))
            break;
          default:
            out.push(raw[i])
            break;
        }
      }
      while (out.length < RawRonaColumnsDefault.length) {
        out.push(RawRonaColumnsDefault[out.length - 1])
      }
      return out;
      // return [raw[0], raw[1], raw[2], raw[3], raw[4], raw[5], raw[6], raw[7], raw[8], raw[9], raw[10], raw[11], raw[6], raw[6], raw[6], raw[6]] as RawColumns
    })
    let output = { columns: columnNames, rows: values }
    console.log(output)
    window['lastCdc'] = output

  }
  async pullPopulation() {
    let ths = this;
    let population = await new WonderRequest().groupBy('Year').groupBy('AgeGroups').requestTable(true, true)

    population.rows.forEach((row: [year: string, ageGroup: string, deaths: number, population: number, crudeRate: number | string]) => {
      let time = new Date(row[0].isNumber() ? `${row[0]} 1 1` : row[0]).getTime()
      let tree = ths.getPopulationForAge(row[1] as AgeGroup)

      tree.set(time, row[3])
    })
    return this.populationByAge
  }
  async pullDeathsByCause() {
    let ths = this;
    for (let year = 1999; year <= 2020; year++) {
      for (let month = 1; month <= 12; month++) {
        let yearMonth: YearAndMonthString<any, any> = `${year}/${month <= 9 ? '0' + month : month}`
        console.log(`Pulling deaths in ${yearMonth}`)
        let deaths = await new WonderRequest().groupBy('CauseOfdeath').groupBy('AgeGroups').groupBy('Month').filterByYear([yearMonth]).requestTable(true, true)
        let count = 0
        deaths.rows.forEach((row: [causeOfDeath: string, tenYear: string, month: string, deaths: number, population: number, crudeRate: number | string], index) => {
          let time = new Date(row[2].isNumber() ? (row[2].includes('/') ? `${row[2].split('/')[0]} ${row[2].split('/')[1]} 1` : `${row[2]} 1 1`) : row[2]).getTime()
          let tree = ths.getDeathsForCause(row[0])
          tree.set(time, row[3])
          count++
          if (count > 1000) {
            count = 0;
            // console.log(`Added ${index} rows`)
          }
        })
        ths.notifyListeners()
      }
    }

    return this.deathsByCause
  }

}

export class DataChannel {
  title: string
  color: FColor
  tree: BTree<number, number> = new BTree()
  minValue: number = null
  maxValue: number = null
  constructor(title: string, color: FColor = fColor.randomColor()) {
    this.title = title;
    this.color = color;
  }
  set(time: number, value: number) {
    if (this.minValue == null || value < this.minValue) {
      this.minValue = value;
    }
    if (this.maxValue == null || value > this.maxValue) {
      this.maxValue = value;
    }
    this.tree.set(time, value)
  }
}