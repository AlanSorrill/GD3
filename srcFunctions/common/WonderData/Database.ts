import { FColor } from "bristolboard";
import { isNode } from "../FBF_Helpers";
import { AgeGroup, AgeGroupDataChannels, AgeGroupDataChannels_JSON, DataChannel, DataChannelStreaming, DataChannelStreaming_ID, DataChannel_JSON, Disease, DiseaseData_JSON, DiseaseDescription, RawRonaColumns, WonderRequest, YearAndMonthString } from "./WonderDataImports";


// export function firebaseFile(url?: string) {
//   return FirebaseStorage.ref(firebaseStorage, url)
// }

// export async function firebaseFileExists( filePath: String | FirebaseStorage.StorageReference) {
//   let reference = (typeof filePath == 'string') ? firebaseFile(filePath) : (filePath as FirebaseStorage.StorageReference)

//   return new Promise<boolean>((acc)=>{
//     FirebaseStorage.getDownloadURL(reference).then(s=>acc(true)).catch(e=>acc(false))
//   })
// }
// export async function downloadFirebaseFile( filePath: String | FirebaseStorage.StorageReference) {
//   let reference = (typeof filePath == 'string') ? firebaseFile(filePath) : (filePath as FirebaseStorage.StorageReference)
//   let url = await FirebaseStorage.getDownloadURL(reference)
//   let resp = await fetch(url)
//   let blob = await resp.blob()
//   return blob.text()
// }
// export async function uploadFirebaseFile(content: string, filePath: String | FirebaseStorage.StorageReference) {
//   let reference = (typeof filePath == 'string') ? firebaseFile(filePath) : (filePath as FirebaseStorage.StorageReference)

//   return FirebaseStorage.uploadString(reference, content)
// }

const RawRonaColumnsDefault: RawRonaColumns = [0, 0, 0, '', 0, 0, '', '', '', 0, 0, 0, 0, 0, 0, '']
export interface Database_Json {
  deathsByCause: { [key: string]: DataChannel_JSON }
  populationByAge: { [key: string]: DataChannel_JSON }
}
export class Database {
  deathsByCause: Map<string, DataChannel> = new Map()
  populationByAge: Map<AgeGroup, DataChannel> = new Map()
  fileAccessor: FileAccessor = null;
  arrested: boolean = false
  constructor(fileAccessor: FileAccessor = null) {
    this.fileAccessor = fileAccessor
    if (fileAccessor) {
      let ths = this;
      fileAccessor.exists(this.diseaseDirectoryPath).then(exists => {
        if (exists) {
          fileAccessor.readFile<DiseaseDescription[]>(this.diseaseDirectoryPath).then(data => {

            if (Array.isArray(data)) {
              for (let description of data) {
                ths.diseaseDirectory.set(description.icdCode, description)
                ths.notifyListeners()
              }
            } else {
              console.log(`Failed to read file`, data)
            }

          })
        }
      })

    } else if (!isNode()) {

    }
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

  async getDeathsForICD(icdCode: string) {
    if (this.deathsByICD.has(icdCode)) {
      return this.deathsByICD.get(icdCode)
    }

    if (this.diseaseDirectory.has(icdCode)) {
      if (this.fileAccessor) {
        let filePath = this.diseasePath(icdCode)
        if (await this.fileAccessor.exists(filePath)) {
          let fileResult = await this.fileAccessor.readFile<DiseaseData_JSON>(filePath)
          console.log(`Got disease from file`, filePath)
          if (fileResult != null && !isFileError(fileResult)) {
            this.deathsByICD.set(icdCode, Disease.fromJson(fileResult))
            return Disease.fromJson(fileResult)
          } else {
            console.log(`Couldn't read ICD file ${filePath}`, fileResult)
          }
        }
      }
      let result = await this.pullIcdCode(this.diseaseDirectory.get(icdCode))
      let disease = new Disease(this.diseaseDirectory.get(icdCode), result)
      return disease
    }
  }

  async findIcdCodes() {
    let csvResp = await fetch('https://raw.githubusercontent.com/k4m1113/ICD-10-CSV/master/codes.csv')
    let csv = await csvResp.text()
    let lines: Array<[id: string, techName: string, laymanName: string]> = csv.split('\n').map(line => {
      line = line.replaceAll(`"`, '')
      let parts: [section: string, item: string, junk: string, technicalLabel: string, junk: string, junk: string, junk: string, layman: string] = line.split(',') as any

      // 0: "A00"section
      // 1: "0"item
      // 2: "A000"junk
      // 3: "\"Cholera due to Vibrio cholerae 01"technicalLabel
      // 4: " biovar cholerae\""junk
      // 5: "\"Cholera due to Vibrio cholerae 01"junk
      // 6: " biovar cholerae\""
      // 7: "\"Cholera\""
      return [parts[1] && parts[1].isNumber() ? `${parts[0]}.${parts[1]}` : parts[0], parts[3], parts[parts.length - 1]]
    })
    console.log(lines)
    return lines;
  }
  async pullIcdCode(description: DiseaseDescription) {
    let ths = this;
    try {
      let data = await new WonderRequest().groupBy('AgeGroups').groupBy('Month').addParam('F_D76.V2', description.icdCode).requestTable<[ageGroup: AgeGroup, time: string, deaths: number, junk: number, junk: number]>(true)
      if (data != null) {

        let deathsByAge: AgeGroupDataChannels = {} as any;
        let current = Date.now();
        let last = Date.now();
        let count = 0;
        description.maxPerMonth = Math.max(description.maxPerMonth, data.rowMaximums[2])
        for (let row of data.rows) {
          if (typeof deathsByAge[row[0]] == 'undefined') {
            deathsByAge[row[0]] = new DataChannel(description.laymanName + ' ' + row[0], null)
          }
          let time = new Date(row[1].isNumber() ? (row[1].includes('/') ? `${row[1].split('/')[0]} ${row[1].split('/')[1]} 1` : `${row[1]} 1 1`) : row[1]).getTime()

          deathsByAge[row[0]].set(time, row[2])
          current = Date.now()
          if (current - last > 500) {
            await new Promise<void>((acc) => { console.log('pop'); acc() })
            console.log(`Popping event loop ${count}`)
            last = current;
          }
          if (ths.arrested) {
            break;
          }
          // console.log(`Processing icd ${row[0]} ${count}/${data.rows.length}`)
          count++
        }
        let disease = new Disease(description, deathsByAge)
        this.deathsByICD.set(description.icdCode, disease)
        ths.diseaseDirectory.set(description.icdCode, description)
        console.log(`Got data for icd ${description.icdCode}`, deathsByAge)
        return deathsByAge
      } else {
        return null;
      }
    } catch (err) {
      console.log(`Failed to pull ${description.icdCode}`, err)
    }
  }
  async pullIcdCodes(max: number = -1) {
    let codes = await this.findIcdCodes()
    let ths = this;
    let addedIcds: string[] = []
    await codes.forEachAsync(async (code, index) => {
      if (ths.diseaseDirectory.has(code[0])) {
        if (max != -1) {
          max++
        }
      } else {
        if (max != -1 && index >= max) {
          return 'BREAK'
        }
        console.log(`${max != -1 ? (max - index) + ' ' : ''}Pulling? data for ICD code ${code[0]}`, code)
        let description = { laymanName: code[2], technicalName: code[1], icdCode: code[0], maxPerMonth: -1 }

        let codeResult = await ths.pullIcdCode(description)
        if (codeResult == null) {
          if (max != -1) {
            max++
          }
        } else {
          // ths.diseaseDirectory.set(code[0], description)
          addedIcds.push(code[0])
        }

      }
    })
    let output = this.diseaseDirectory.toArrayWithKeys().sort((a, b) => b[1].maxPerMonth - a[1].maxPerMonth).map(s => s[1])//[s[1],ths.deathsByICD.get(s[0])])
    console.log(output, output.map(s => [s.icdCode, ths.deathsByICD.get(s.icdCode)]))
    if (this.fileAccessor) {
      this.fileAccessor.writeFile(this.diseaseDirectoryPath, output)
      for (let icd of addedIcds) {
        let disease = ths.deathsByICD.get(icd)
        let json = disease.toJson()
        if (json != null) {
          this.fileAccessor.writeFile(this.diseasePath(icd), json)
        }
      }
    }
    return output
  }
  diseasePath(icdCode: string) {
    return `./byICD/${icdCode.replaceAll('.', '_')}.json`
  }
  diseaseDirectoryPath: string = './directory.json'
  diseaseDirectory: Map<string, DiseaseDescription> = new Map()
  deathsByICD: Map<string, Disease> = new Map()

  // diseaseToJson(icdCode: string) {
  //   if (!this.deathsByICD.has(icdCode)) {
  //     console.log(`Cannot jsonify non-existant code ${icdCode}`)
  //     return null;
  //   }
  //   let out: DiseaseData_JSON = {
  //     description: this.diseaseDirectory.get(icdCode),
  //     deathsByAge: Database.ageGroupsToJson(this.deathsByICD.get(icdCode))
  //   }
  //   return out;
  // }
  // static fromJson(json: DataChannel_JSON): DataChannel {

  //     let out = new DataChannel(json.title);
  //     out.tree.setPairs(json.data)
  //     return out;
  // }
  static ageGroupsToJson(ageGroupChannels: AgeGroupDataChannels) {
    let out: AgeGroupDataChannels_JSON = {} as any
    for (let key of Object.keys(ageGroupChannels)) {
      out[key] = (ageGroupChannels[key] as DataChannel).toJson()
    }
    return out;
  }
  static ageGroupsFromJson(ageGroupChannels: AgeGroupDataChannels_JSON) {
    let out: AgeGroupDataChannels = {} as any
    for (let key of Object.keys(ageGroupChannels)) {
      out[key] = DataChannel.fromJson(ageGroupChannels[key])
    }
    return out;
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
    let population = await new WonderRequest().groupBy('Year').groupBy('AgeGroups').requestTable(true)

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
        let deaths = await new WonderRequest().groupBy('CauseOfDeath').groupBy('AgeGroups').groupBy('Month').filterByYear([yearMonth]).requestTable(true)
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
  async buildDataChannel<DirectoryName extends string, ChannelName extends string>(id: DataChannelStreaming_ID<DirectoryName, ChannelName>, color: FColor, side: 'Client' | 'Server') {
    if (side == 'Server') {
      let out: DataChannelStreaming<DirectoryName, ChannelName> = new DataChannelStreaming(id, color, async (request) => {
        let resp = await fetch(`http://${window.location.hostname}:5001/gdsn3-22/us-central1/DataChannels?id=${id}`)
        return null
      })
    } else {
      let out: DataChannelStreaming<DirectoryName, ChannelName> = new DataChannelStreaming(id, color, async (request) => {
        let resp = await fetch(`http://${window.location.hostname}:5001/gdsn3-22/us-central1/DataChannels?id=${id}`)
        return null
      })
    }


  }
}
export interface FileError {
  error: string
}
export function isFileError(obj: Object): obj is FileError {
  return typeof obj['error'] == 'string'
}
export interface FileAccessor {
  readFile<T>(path: string): Promise<T | FileError>
  writeFile<T>(path: string, data: T | string): Promise<'success' | string>
  exists(path: string): Promise<boolean>
}