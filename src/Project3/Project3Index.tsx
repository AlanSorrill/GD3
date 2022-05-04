import React from 'react';
import ReactDom from 'react-dom'
import { CaronaRoot } from './CaronaRoot';
// import { ensureFColor } from '../Imports'
import { ImportGoogleFont } from '../Helper';
import { Database, DeWonder, WonderRequest } from '../../srcFunctions/common/WonderData';
import './Project3Styles.css'

import { XmlToJson } from '../../srcFunctions/common/FBF_Helpers';
import { WonderClient } from './WonderClient';
import { ensureBristolImports } from 'bristolboard';

// import * as soda from 'soda-js'
ensureBristolImports();
ImportGoogleFont('Ubuntu:wght@400;700')

window['WonderRequest'] = WonderRequest;
window['WonderClient'] = WonderClient
window['DeWonder'] = DeWonder;
window['database'] = new Database({
    async readFile<T>(path: string): Promise<T | { error: string }>{
        if(path.startsWith('./')){
            path = path.substring(2)
        }
        if(path.startsWith('/')){
            path = path.substring(1)
        }

        let result = await fetch(`http://${location.hostname}:5001/gdsn3-22/us-central1/Data/${path}`)
        let resultJson = await result.json()
        console.log(`Client got file ${path}`,resultJson)
        return resultJson;
    },
    async writeFile<T>(path: string, data: T | string): Promise<'success' | string>{
        throw new Error(`Not implemented`)
    },
    async exists(path: string){
        if(path.startsWith('./')){
            path = path.substring(2) 
        }
        if(path.startsWith('/')){
            path = path.substring(1)
        }
        let result = await fetch(`http://${location.hostname}:5001/gdsn3-22/us-central1/DataExists/${path}`)
        let resultText = await result.text()
        console.log(`Checking if ${path} exists`)
        return resultText.toLowerCase() == 'true'
    }
})
 
window['XmlToJson'] = XmlToJson
// window["sodaConsumer"] = new soda.Consumer("explore.data.gov")
let mainContainer = document.getElementById('root')
if (!mainContainer) {
    mainContainer = document.createElement('div');
    document.body.append(mainContainer);
    mainContainer.style.position = 'absolute'
    mainContainer.style.left = '0px'
    mainContainer.style.right = '0px'
    mainContainer.style.top = '0px' 
    mainContainer.style.bottom = '0px'
}
document.body.style.overflowY = 'hidden'
mainContainer.style.overflowY = 'hidden'
ReactDom.render(<CaronaRoot />, mainContainer);
 