import React from 'react';
import ReactDom from 'react-dom'
import { Project2Root } from './HistoryOfJS';
import { ImportGoogleFont, RenderIntoRoot } from '../Helper'
let data = ['First', 'second', 'third', 'fourth', 'fifth']
let images = ['./sandbox/doge.jpg', './sandbox/raman.jpg', './sandbox/stolin.jpg']
ImportGoogleFont('Roboto+Slab');
RenderIntoRoot(<div style={{ fontFamily: 'Roboto Slab', minHeight: 4000 }}>
    <div id='navbarWrapper' style={{ height: 50, width: '100%', position: 'fixed', display: 'flex', justifyContent: 'center' }}>
        <div style={{ height: 50, width: '60%', backgroundColor: 'blue', display: 'flex' }}>

            {(data).map((value: string) => (
                <div style={{ backgroundColor: 'green', flexGrow: 1, textAlign: 'center', margin: 5 }}><h1 style={{ margin: 0 }}>{value}</h1></div>
            ))}
        </div>
    </div>
    <section style={{ backgroundColor: 'black', minHeight: 200 }}>

    </section>
    <section style={{ backgroundColor: 'red', minHeight: 200, justifyContent: 'center', display: 'flex' }}>
        {images.map((imgSrc: string)=>(<img src={imgSrc} style={{ width: 300, height: 'auto', position: 'relative', left: 50 }}></img>))}
    </section>
    <section style={{ backgroundColor: 'yellow', minHeight: 200, position: 'relative' }}>

    </section>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
</div>)