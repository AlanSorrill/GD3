import React from 'react';
import ReactDom from 'react-dom'
import { Project2Root } from './HistoryOfJS';
import {} from '../Helper'
let mainContainer = document.getElementById('root')
document.body.style.overflowY = 'hidden'
mainContainer.style.overflowY = 'hidden'
ReactDom.render(<Project2Root />, mainContainer);
