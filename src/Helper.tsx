
import React, { DOMAttributes, DOMElement } from 'react';
import ReactDom from 'react-dom'
import BTree from 'sorted-btree';

export type DeviceType = 'phone' | 'tablet' | 'desktop'
export type Orientation = 'vertical' | 'horizontal'
export class Device {
    static isPhone() {
        return window.innerWidth < 600
        // let check = false;
        // (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window['opera']);
        // return check;
    };
    static isTabletOrPhone() {
        return window.innerWidth < 900;
        // let check = false;
        // (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window['opera']);
        // return check;
    };
    static getType(): DeviceType {
        if (this.isPhone()) {
            return 'phone'
        } else if (this.isTabletOrPhone()) {
            return 'tablet'
        } else {
            return 'desktop'
        }
    }
    static getOrientation(): Orientation {
        return (window.innerWidth < window.innerHeight) ? 'vertical' : 'horizontal'
    }
    static switch(desktop: number, tablet: number, phone: number) {
        switch (this.getType()) {
            case 'desktop':
                return desktop;
            case 'tablet':
                return tablet;
            case 'phone':
                return phone;
        }
    }
}
export type OptFunc<T> = T | (() => T)
export function evalOptionalFunc<T>(input: OptFunc<T>, def: T = null): T {
    if (input == null || input == undefined) {
        return def;
    }
    if (typeof input == 'function') {
        return (input as (() => T))();
    }


    return input;
}
export function CombineCopyObjects<A, B>(a: A, b: B): A & B {
    let out: A & B = {} as any;
    Object.entries(a).forEach((value: [string, any]) => {
        out[value[0]] = value[1];
    })
    Object.entries(b).forEach((value: [string, any]) => {
        out[value[0]] = value[1];
    })
    return out;
}

declare global {

    interface String {
        replaceAll(a: string, b: string): string;
    }
    interface Array<T> {
        mapWhile<B>(predicate: (value: T) => boolean, transform: (value: T) => B): B[]
        forMap<B>(transform: (value: T, index: number) => B, startValue: OptFunc<number>, predicate: (index: number, arr: this) => boolean, update: OptFunc<number>): B[]
        insertBetweenEach<T>(item: T | ((afterIndex: number, left: T, right: T) => T)): T[]
    }
    interface Number {
        clamp(low: number, high: number): number
        alphaInRange(low: number, high: number, clamped?: boolean): number
        isInRange(low: number, high: number): boolean
        negate(): number
        oneMinus(): number
        isEven(): boolean
    }

}
if (typeof Number.prototype.isEven == 'undefined') {
    Number.prototype.isEven = function () {
        return this % 2 == 0;
    }
}
if (typeof Number.prototype.oneMinus == 'undefined') {
    Number.prototype.oneMinus = function () {
        return 1 - this;
    }
}
if (typeof Number.prototype.negate == 'undefined') {
    Number.prototype.negate = function () {
        return this * -1;
    }
}
if (typeof Number.prototype.isInRange == 'undefined') {
    Number.prototype.isInRange = function (low: number, high: number) {
        return this >= low && this <= high;
    }
}
if (typeof Number.prototype.alphaInRange == 'undefined') {
    Number.prototype.alphaInRange = function (low: number, high: number, clamped: boolean = true) {
        let a = (this - low) / (high - low)
        return clamped ? a.clamp(0, 1) : a;
    }
}
if (typeof Number.prototype.clamp == 'undefined') {
    Number.prototype.clamp = function (low, high) {
        return Math.max(0, Math.min(1, this))
    }
}
if (typeof Array.prototype.insertBetweenEach == 'undefined') {
    Array.prototype.insertBetweenEach = function <T>(item: T | ((afterIndex: number, left: T, right: T) => T)) {
        let out: T[] = []
        let getItem = (typeof item == 'function') ? item as (((afterIndex: number, left: T, right: T) => T)) : ((afterIndex: number, left: T, right: T) => (item))
        for (let i = 0; i < this.length - 1; i++) {
            out.push(this[i])
            out.push(getItem(i, this[i], this[i + 1]))
        }
        out.push(this[this.length - 1])
        return out;
    }
}
if (typeof Array.prototype.mapWhile == 'undefined') {
    Array.prototype.mapWhile = function (predicate, transform) {
        let out = []
        for (let i = 0; i < this.length; i++) {
            if (predicate(this[i])) {
                out.push(transform(this[i]))
            }
        }
        return out;
    }
}
if (typeof Array.prototype.forMap == 'undefined') {
    Array.prototype.forMap = function (transform, startValue, predicate, update = 1) {
        let out = []
        for (let i = evalOptionalFunc(startValue); predicate(i, this); i += evalOptionalFunc(update)) {

            out.push(transform(this[i], i))

        }
        return out;
    }
}
if (typeof String.prototype.replaceAll == 'undefined') {
    String.prototype.replaceAll = function (a: string, b: string) {
        return this.split(a).join(b);
    };
}
export type Optionalize<Type> = {
    [Property in keyof Type]?: Type[Property]
}
export type ListOptionals<T extends object> = Exclude<{
    [K in keyof T]: T extends Record<K, T[K]>
    ? never
    : K
}[keyof T], undefined>
export type OnlyOptionals<T extends Object> = {
    [K in ListOptionals<T>]: T[K]
}
export async function downloadImage(src: string): Promise<HTMLImageElement> {
    return new Promise((acc, rej) => {
        let img = new Image();
        img.addEventListener('load', () => {
            // alert('loaded')
            acc(img);
        });
        img.src = src;
    })

}

export function fillDefaults<T extends Object>(input: T, defaults: OnlyOptionals<T>) {
    let out: T = {} as any
    for (let key in defaults) {
        if (typeof input[key] == 'undefined') {
            out[key] = defaults[key]
        } else {
            out[key] = input[key]
        }
    }
    return out;
}
export function brNewlines(lines: string[], options: { brCount?: number, indent?: boolean } = {}): React.ReactNode[] {
    options = fillDefaults(options, { brCount: 1, indent: true })
    let out: React.ReactNode[] = [];
    for (let i = 0; i < lines.length; i++) {
        out.push(`${options.indent ? '&emsp;' : ''}${lines[i]}`)
        for (let b = 0; b < options.brCount; b++) {
            out.push(<br />)
        }
    }
    return out;
}
export function lerp(start: number, end: number, alpha: number) {
    return start + (end - start) * alpha
}

export function interpolate(stops: [time: number, value: number][], alpha: number, interp: (s: number, e: number, a: number) => number = lerp) {
    let startIndex: number = -1;

    for (let i = 0; i < stops.length; i++) {
        if (alpha >= stops[i][0]) {
            startIndex = i;
        }
    }
    if (startIndex == -1) {
        return stops[0][1]
    }
    if (startIndex < stops.length - 1) {
        // console.log(`Interp ${startIndex} to ${startIndex + 1}`)
        return interp(stops[startIndex][1], stops[startIndex + 1][1], alpha.alphaInRange(stops[startIndex][0], stops[startIndex + 1][0]));
    }
    return stops[startIndex][1];
}

export type lerpTupleOptions<T extends number[]> = { [Property in keyof T]?: 'start' | 'end' | 'startToEnd' | 'endToStart'; }
export function lerpTuple<T extends number[]>(start: T, end: T, alpha: number, options: lerpTupleOptions<T> = {}) {
    let out: T = [] as any
    for (let i = 0; i < start.length; i++) {
        if (typeof options[i] == 'undefined') {
            out[i] = lerp(start[i], end[i], alpha);
        } else {
            switch (options[i]) {
                case 'end':
                    out[i] = end[i];
                    break;
                case 'start':
                    out[i] = start[i];
                    break;
                case 'startToEnd':
                    out[i] = lerp(start[i], end[i], alpha);
                    break;
                case 'endToStart':
                    out[i] = lerp(end[i], start[i], alpha);
                    break;
            }
        }
    }
    return out;
}


//

export function interpMap(inputA: number, inputB: number, outputA: number, outputB: number, clamp: boolean = true) {

    return (input: number) => {
        let alpha = (input - inputA) / (inputB - inputA)
        if (clamp) {
            alpha = Math.max(0, Math.min(alpha, 1))
        }
        return lerp(outputA, outputB, alpha)
    }
}
export function RenderIntoRoot<T extends Element>(element: React.FunctionComponentElement<T> | React.FunctionComponentElement<T>[]) {
    let mainContainer = document.getElementById('root')
    if (!mainContainer) {
        mainContainer = document.createElement('div');
        document.body.append(mainContainer);
        while (document.body.children.length > 0) {
            document.body.children.item(0).remove();
        }
        mainContainer.style.position = 'absolute'
        mainContainer.style.left = '0px'
        mainContainer.style.right = '0px'
        mainContainer.style.top = '0px'
        mainContainer.style.bottom = '0px'
    }
    document.body.style.overflowY = 'hidden'
    mainContainer.style.overflowY = 'hidden'

    ReactDom.render(element, mainContainer);
}

export class RectOnScreen {
    static fromLeft(box: DOMRect) {
        return (box.right / window.innerWidth)
    }
    static fromRight(box: DOMRect) {
        return 1 - (box.left / window.innerWidth)
    }
    static fromTop(box: DOMRect) {
        return (box.bottom / window.innerWidth)
    }
    static fromBottom(box: DOMRect) {
        return 1 - (box.top / window.innerHeight)
    }
    static verticalOverlap(box: DOMRect) {
        if (box.top < window.innerHeight) {

            if (box.bottom > 0) {
                if (box.bottom < window.innerHeight) {
                    return box.bottom / window.innerHeight
                } else {
                    return 1 - box.top / window.innerHeight;
                }
            }
            return (0).alphaInRange(box.top, box.bottom - window.innerHeight);
        }
    }

    //-1 = before
    // 0 = topAtTopOfWindow
    // 1 = bottomAtBottomOfWindow
    // 2 = after
    // box must be taller than window
    static verticalBeta(box: DOMRect) {
        if (box.top > window.innerHeight) {
            return -1
        }
        if (box.top > 0) {
            return (box.top / window.innerHeight) * -1
        }
        if (box.bottom < window.innerHeight) {
            return (1 - box.bottom / window.innerHeight) + 1
        }
        return (0).alphaInRange(box.top, box.bottom - window.innerHeight)
    }
}

export type FCurveInterp = 'linear'
export type FCurveStop = [time: number, value: number] | [time: number, value: number, interp: FCurveInterp]
export class FCurve<T extends FCurveStop[]> {
    // stops: T;
    index: BTree<number, FCurveStop>
    constructor(stops: T) {
        // this.stops = stops.sort((a: FCurveStop, b: FCurveStop)=>(a[0] - b[0]));
        this.index = new BTree(stops.map((value: FCurveStop) => ([value[0], value])))
    }
    getValue(time: number) {
        let low = this.index.getPairOrNextLower(time)
        let high = this.index.getPairOrNextHigher(time);
        if (high[0] - low[0] == 0) {
            high = this.index.getPairOrNextHigher(time + 0.001);
        }
        let alpha = time.alphaInRange(low[0], high[0], true);
        switch (this.getInterpMode(low[1])) {
            case 'linear':
                return lerp(low[1][1], high[1][1], alpha);

            default:
                throw new Error(`Unknown interp type ${this.getInterpMode(low[1])}`)
        }
    }
    private getInterpMode(stop: FCurveStop) {
        if (stop.length == 3) {
            return stop[2]
        }
        return 'linear'
    }
}
export function ImportGoogleFont(familyName: string) {
    let id = familyName + 'GoogleFont'
    if (document.getElementById(id)) {
        console.log('skipping font import')
        return;
    }
    console.log(`Importing ${familyName}`)
    let elem = document.createElement('link');
    elem.id = id; familyName + 'GoogleFont'
    elem.rel = 'stylesheet'
    elem.href = `https://fonts.googleapis.com/css2?family=${familyName}&display=swap`
    document.head.appendChild(elem);
}

export function GenerateImage() {
    let canvas = new OffscreenCanvas(256, 256);
}

export function setCookie(name, value, days?) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}


export function getCookie(name: string): string {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}

export function eraseCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
}