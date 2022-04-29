const Xml2JS = require('xml2js').parseString;
declare global {

    interface String {
        replaceAll(a: string, b: string): string;
        isNumber(): boolean
        isBoolean(): boolean
    }
    interface Array<T> {
        pushAll(stuff: T | T[]): void
    }
    interface Map<K, V> {
        toArray(): Array<[K, V]>
    }
}
Array.prototype.pushAll = function <T>(stuff: T | T[]) {
    if (Array.isArray(stuff)) {
        for (let item of stuff) {
            this.push(item)
        }
    } else {
        this.push(stuff)
    }
}
String.prototype.isBoolean = function () {
    return this.toLowerCase() == 'true' || this.toLowerCase() == 'false'
}
String.prototype.isNumber = function () {
    return !Number.isNaN(Number(this))
}
if (typeof Map.prototype.toArray == 'undefined') {
    console.log(`Shimming Map.toArray`)
    Map.prototype.toArray = function <K, V>() {
        let ths: Map<K, V> = this
        let out: Array<[K, V]> = []
        for (let key of ths.keys()) {
            out.push([key, ths.get(key)]);
        }
        return out
    }
}
export function ensureFBF_Helpers() {
    console.log()
}
export interface XmlElement {
    tag: string
    parameters: { [key: string]: number | string }
    children?: XmlElement[]
}
function cleanXmlToJson(obj: Object, name: string = null, asElement: boolean = true): XmlElement | XmlElement[] {
    if (typeof obj != 'object') {
        return obj;
    }

    if (asElement) {//(obj['$'] || (typeof obj['_'] == 'string')) {// is element
        console.log('Cleaning element ', obj)
        let out: XmlElement = {
            tag: name,
            parameters: {},
        }

        for (let childName of Object.keys(obj)) {
            switch (childName) {
                case '_':
                    if (!out.children) {
                        out.children = []
                    }
                    out.children.push(obj['_'])
                    break;
                case '$':
                    for (let paramName of Object.keys(obj['$'])) {
                        out.parameters[paramName] = obj['$'][paramName]
                    }
                    break;
                default:
                    if (!out.children) {
                        out.children = []
                    }
                    if (Array.isArray(obj[childName])) {
                        for (let child of obj[childName]) {
                            out.children.pushAll(cleanXmlToJson(child, childName))
                        }
                    } else {
                        out.children.pushAll(cleanXmlToJson(obj[childName], childName))
                    }
                    break;
            }
            // out.parameters[childName] = obj['$'][childName]
        }
        return out;
    } else {
        let outlist = []
        for (let key of Object.keys(obj)) {
            outlist.push(cleanXmlToJson(obj[key], key))
        }
        return outlist;
    }

}
export function flatten<T>(arr: T[][]): T[] {
    let out: T[] = []
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            out.push(arr[i][j])
        }
    }
    return out;
}
export function concactinate<T>(a: T[], b: T[]){
    let out: T[] = []
    a.forEach((aa)=>{
        out.push(aa)
    })
    b.forEach((bb)=>{
        out.push(bb)
    })
    return out;
}
export async function XmlToJson(xml: string) {
    return new Promise((acc, rej) => {
        Xml2JS(`<data>${xml}</data>`, (err, value) => {
            if (err) {
                rej(err)
            } else {
                // console.log('cleaning',value)
                // let result = cleanXmlToJson(value) as XmlElement;

                acc(value.data)
            }
        })
    });
}

if (typeof String.prototype.replaceAll == 'undefined') {
    String.prototype.replaceAll = function (a: string, b: string) {
        return this.split(a).join(b);
    };
}
export function isAllTrue(bools: Boolean[]) {
    for (let i = 0; i < bools.length; i++) {
        if (bools[i]) {
            return true
        }
    }
    return false;
}
export function replaceAllInString(target: string, a: string, b: string) {

    return target.split(a).join(b);

}