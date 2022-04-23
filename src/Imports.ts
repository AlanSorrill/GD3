
export * from './Helper'
import { FColorDirectory } from './FColor';

export * from './FColor'

import * as HELPERS from './Helper'
import { tColor, TColorDir } from './TColor';
declare global {

   
    var fColor: FColorDirectory
    
}
window['tColor'] = tColor
window['HELPERS'] = HELPERS

export function ensureFColor(){
    if(typeof window.fColor == 'undefined'){
        window.fColor = new FColorDirectory()
    }
}
ensureFColor()
export { fColor } 