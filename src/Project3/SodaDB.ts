// import { TimeMS } from "./RonaDB";

import { DeOptionalize, KeysOf, KeyToString, Optionalize, Time, TimeToISO } from "../Helper";

export interface SodaGetOptions {
    limit?: number
    timeRange?: [Time, Time]
}
const SodaGetOption_Empty: DeOptionalize<SodaGetOptions> = { limit: 0, timeRange: [0, 0] }
export interface SodaDBDescription<ColumnTypes> {
    dbId: string,
    name: string,
    columnTypes: ColumnTypes
}

export type Converter<RawType extends RawObjectOf<CookedType>, CookedType> = {
    rawToCooked: (raw: RawType) => CookedType,
    uncookField: <NAME extends keyof CookedType>(name: NAME, cookedValue: CookedType[NAME]) => RawType[NAME]
    cookField: <NAME extends keyof CookedType>(name: NAME, rawValue: RawType[NAME]) => CookedType[NAME]
}
export type FieldConverter<RawType extends RawObjectOf<CookedType>, CookedType, Field extends keyof CookedType> = [(raw: RawType[Field]) => CookedType[Field], (cooked: CookedType[Field]) => RawType[Field]]
export type FieldConverters<T> = {
    [Property in keyof T]?: FieldConverter<RawObjectOf<T>, T, Property>
}
function BuildConverter<T>(filedConverters: FieldConverters<T>): Converter<RawObjectOf<T>, T> {
    
    return {
        rawToCooked: (raw) => {
            return raw as any
        },
        uncookField: (name, cookedValue) => {
            if (filedConverters[name]) {
                return filedConverters[name][1](cookedValue);
            }
            switch (typeof cookedValue) {
                case 'string':
                case 'number':
                    return cookedValue;
                default:
                    return JSON.stringify(cookedValue)
            }

        },
        cookField: (name, rawValue) => {
            if (filedConverters[name]) {
                return filedConverters[name][0](rawValue);
            }
            return rawValue as any;
        }
    }
}

export class SodaDB<RawRowType extends RawObjectOf<RowType>, RowType> {
    databaseId: string;
    converter: Converter<RawRowType, RowType>

    constructor(dbId: string, converter: Converter<RawRowType, RowType>) {
        this.databaseId = dbId;
        this.converter = converter;
    }




    async get(options: SodaGetOptions & Optionalize<RowType> = {}): Promise<RowType[]> {
        try {
            let urlParams: Array<[string, string | number]> = []


            let keys: KeysOf<SodaGetOptions & Optionalize<RowType>> = Object.keys(options) as any
            let key: keyof (SodaGetOptions) | keyof Optionalize<RowType>
            for (let i = 0; i < keys.length; i++) {
                key = keys[i]
                switch (key) {
                    case 'limit':
                        urlParams.push(['limit', options.limit])
                        break;
                    case 'timeRange':
                        if (typeof options.timeRange != 'undefined' && Array.isArray(options.timeRange)) {
                            urlParams.push(['where', `submission_date between ${TimeToISO(options.timeRange[0])} and ${TimeToISO(options.timeRange[1])}`])
                        }
                        break;
                    default:
                        urlParams.push([KeyToString(key), this.converter.uncookField(key, options[key] as any)])
                }
            }
            let urlParamsString = urlParams.length > 0 ? `?${urlParams.map((value: [string, string | number]) => `${value[0]}=${value[1]}`).join('&')}` : ''
            let resp = await fetch(`https://data.cdc.gov/resource/${this.databaseId}.json${urlParamsString}`)
            if (resp.ok) {
                let out: RawRowType[] = await resp.json();
                let ths = this;
                return out.map((value: RawRowType) => ths.converter.rawToCooked(value))
            }
            throw new Error(resp.status + ': ' + resp.statusText)
        } catch (err) {
            console.log(err);
        }
    }
}

export type RawField = string | number
export type RawObject = {
    [key: string]: RawField
}
export type RawObjectOf<T> = {
    [Property in keyof T]: RawField
}
export type CaronaCasesAndDeathsOverTimeRow = {
    "submission_date": Date,
    "state": string,
    "tot_cases": number,
    "conf_cases": number,
    "prob_cases": number,
    "new_case": number,
    "pnew_case": number,
    "tot_death": number,
    "new_death": number,
    "pnew_death": number,
    "created_at": string,
    "consent_cases": "Agree" | "Not agree",
    "consent_deaths": "Agree" | "Not agree"
}

const SodaDBDirectory = {
    caronaCasesAndDeathsOverTime: new SodaDB<RawObjectOf<CaronaCasesAndDeathsOverTimeRow>, CaronaCasesAndDeathsOverTimeRow>('9mfq-cb36', BuildConverter<CaronaCasesAndDeathsOverTimeRow>({submission_date: [null,null]}))
}

export { SodaDBDirectory }