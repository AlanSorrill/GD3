
export * from './Helper'
import { FColorDirectory } from './FColor';

export * from './FColor'
export * from './Project2/Section'
export * from './Project2/Sections/Prehistoric_Section'
export * from './Project2/Sections/BrowserWars_Section'
export * from './Project2/HistoryOfJS'
export * from './Project2/Project2Index'
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