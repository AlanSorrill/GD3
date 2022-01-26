import React from 'react';
import ReactDom from 'react-dom'
import { Project1Root } from './StudentTradingCard';
let mainContainer = document.getElementById('root')
document.body.style.overflowY = 'hidden'
mainContainer.style.overflowY = 'hidden'
ReactDom.render(<Project1Root />, mainContainer);
