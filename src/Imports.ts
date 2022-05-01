
export * from './Helper'
import { ensureBristolImports } from 'bristolboard';





import * as HELPERS from './Helper'
import { tColor, TColorDir } from './TColor';

window['tColor'] = tColor
window['HELPERS'] = HELPERS

// export function ensureFColor(){
//     if(typeof window.fColor == 'undefined'){
//         window.fColor = new FColorDirectory()
//     }
// }
// ensureFColor()
ensureBristolImports()
// export { fColor } 