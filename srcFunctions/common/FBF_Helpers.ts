import { Key } from "react";

const Xml2JS = require('xml2js').parseString;
declare global {

    interface String {
        replaceAll(a: string, b: string): string;
        isNumber(): boolean
        isBoolean(): boolean
    }
    interface Array<T> {
        mapOrDrop<N>(shouldKeep: (value: T, index: number) => (N | 'DROP')): N[]
        pushAll(stuff: T | T[]): void
        forEachAsync(onEach: (item: T, index: number, ths: this) => Promise<void | 'BREAK'>): Promise<void>
    }
    interface Map<K, V> {
        keysAsArray(): K[]

        getWithDefault(key: K, defaultValue: (key: K) => V): V
    }
    interface BTree<K, V> {

    }

}
export function isNode() {
    return typeof window == 'undefined'
}
export async function promiseDefault<T>(prom: Promise<T>, defaultValue: T): Promise<T> {
    return new Promise((acc) => {
        prom.then(acc).catch(e => acc(defaultValue))
    })
}
// export function ObjectMap<A,B>(input: A, transform: <k extends keyof A>()=>B): B {
// return null
// }
Array.prototype.forEachAsync = async function <T>(onEach: (item: T, index: number, ths: Array<T>) => Promise<void | 'BREAK'>) {
    for (let i = 0; i < this.length; i++) {
        if (await onEach(this[i], i, this) == 'BREAK') {
            break;
        }
    }
}
Map.prototype.keysAsArray = function <K, V>() {
    let ths = this as Map<K, V>
    let out: K[] = []
    for (let key of ths.keys()) {
        out.push(key)
    }
    return out;
}
Array.prototype.mapOrDrop = function <T, N>(shouldKeep: (value: T, index: number) => (N | 'DROP')): N[] {
    let ths = this as Array<T>
    let out: N[] = []
    for (let i = 0; i < ths.length; i++) {
        let fresh = shouldKeep(this[i], i)
        if (fresh == 'DROP') {
            // console.log(`Dropping ${i}`,this[i])
        } else {
            out.push(fresh)
        }
    }
    return out;
}
Map.prototype.getWithDefault = function <K, V>(key: K, defaultValue: (key: K) => V) {
    let ths = this as Map<K, V>

    if (!ths.has(key)) {
        ths.set(key, defaultValue(key))
    }
    return ths.get(key)


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
// if (typeof Map.prototype.toArray == 'undefined') {
//     console.log(`Shimming Map.toArray`)
//     Map.prototype.toArray = function <K, V>() {
//         let ths: Map<K, V> = this
//         let out: Array<[K, V]> = []
//         for (let key of ths.keys()) {
//             out.push([key, ths.get(key)]);
//         }
//         return out
//     }
// }
export function ensureFBF_Helpers() {
    console.log()
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
export function concactinate<T>(a: T[], b: T[]) {
    let out: T[] = []
    a.forEach((aa) => {
        out.push(aa)
    })
    b.forEach((bb) => {
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