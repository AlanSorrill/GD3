declare global {

    interface String {
        replaceAll(a: string, b: string): string;
    }
    interface Map<K, V> {
        toArray(): Array<[K, V]>
    }
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
if (typeof String.prototype.replaceAll == 'undefined') {
    String.prototype.replaceAll = function (a: string, b: string) {
        return this.split(a).join(b);
    };
}
export function replaceAllInString(target: string, a: string, b: string) {

    return target.split(a).join(b);

}