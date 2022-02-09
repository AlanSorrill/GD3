import React from 'react';
import ReactDom from 'react-dom'
import { Project1Root } from './StudentTradingCard';
let mainContainer = document.getElementById('root')
if(!mainContainer){
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
ReactDom.render(<Project1Root />, mainContainer);
