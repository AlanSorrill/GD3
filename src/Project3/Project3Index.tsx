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
window['database'] = new Database()
 
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
 