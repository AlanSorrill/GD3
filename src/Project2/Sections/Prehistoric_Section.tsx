import React from "react";
import { lerpTuple } from "../../Helper";
import { Device, FColor, interpMap, lerp, Project2Root, Section } from "../../Imports";


export class Section_Prehistoric extends Section {
    backgroundColorInterp: (alpha: number) => string;

    childContainerRef: React.RefObject<HTMLDivElement>
    parentContainerRef: React.RefObject<HTMLDivElement>

    constructor(root: Project2Root) {
        super('1974', root)
        this.childContainerRef = React.createRef();
        this.parentContainerRef = React.createRef();
        let startColor = fColor.green.darken2.toHsv()
        let endColor = fColor.black.toHsv()

        this.backgroundColorInterp = (alpha: number) => FColor.hsvToRgbString([startColor[0],
        lerp(startColor[1], endColor[1], alpha),
        lerp(startColor[2], endColor[2], alpha)
        ]);

    }
    calcHolderHeight() {
        if (!this.childContainerRef.current) {
            return 0
        } else {
            return window.innerWidth * (2 + (window.innerHeight / window.innerWidth)) //- window.innerHeight / window.innerWidth
        }
    }
    getScrollLeft(parentRect: DOMRect) {
        if (parentRect == null) {
            return 0
        }

        if (parentRect.top > 0) {
            return 0
        }
        if (parentRect.bottom < window.innerHeight) {
            // console.log('over',parentRect.bottom)
            return (this.calcHolderHeight() - window.innerHeight) * -1
        }
        // console.log(-1 * parentRect.top)
        return parentRect.top
    }

    getNavToSideAlpha() {
        if (!this.parentContainerRef.current) {
            return 0
        }
        let parentRect = this.parentContainerRef.current.getBoundingClientRect();
        if (parentRect.top > 0) { return 0 }

        // let p = (parentRect.bottom / window.innerHeight).clamp(0, 1).oneMinus()
        // console.log(p) 
        // return p
        return (((parentRect.top) / window.innerWidth) / -2).alphaInRange(0.9, 1, true)
        // interpMap()//.clamp(0,1)
    }
    getScrollTop(parentRect: DOMRect) {
        if (parentRect == null) {
            return 0
        }

        if (parentRect.bottom < window.innerHeight) {
            return (this.calcHolderHeight() - window.innerHeight)
        }
        return 0;
    }
    private getPosType(parentRect: DOMRect) {
        if (parentRect == null) {
            return 'fixed'
        }

        if (parentRect.top > 0 || parentRect.bottom < window.innerHeight) {
            return 'relative'
        }
        return 'fixed'
    }

    render(alpha: number): React.ReactNode {
        let parentBounds = (this.parentContainerRef.current) ? this.parentContainerRef.current.getBoundingClientRect() : null;
        let childBounds = (this.childContainerRef.current) ? this.childContainerRef.current.getBoundingClientRect() : null;
        return <div onScroll={(event: any) => {
            window.scrollBy(0, event.deltaX)
            console.log('synthetic scroll', event)
        }} ref={this.parentContainerRef} style={{
            height: this.calcHolderHeight(),
            color: fColor.lightText[1].toHexString(),
            backgroundColor: FColor.hsvToRgbString(lerpTuple(fColor.green.darken2.toHsv(), fColor.black.toHsv(), alpha.alphaInRange(-1, 0), ['start', 'startToEnd', 'startToEnd'])),
            // 'tst': this.backgroundColorInterp(alpha.alphaInRange(-1, 0))
        }}>

            <div style={{ width: '300vw', display: 'inline-block', top: this.getScrollTop(parentBounds), position: this.getPosType(parentBounds), left: this.getScrollLeft(parentBounds) }}
                ref={this.childContainerRef}>

                <div style={{ width: '100vw', height: '100vh', float: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <div style={{ flexGrow: 1 }} />
                    <div>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
                            <h2>Prehistoric Internet</h2>
                            <img src='./project2/chromeDino.png'></img>
                        </div>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: Device.switch(this.root.col8, this.root.col12, this.root.col12) }}>
                            &emsp;The Internet evolved from university researchers trying to connect their computers together. The idea of transmitting encoded data via electrical signals was nothing new, but standardizing the format of these messages hailed a new era. The Transmission Control Protocol (TCP) was published in 1974. It handled data loss automatically, allowing computers to send data to each other reliably. Various protocols were developed on top of this, such as HTTP
                        </div>
                    </div>
                    <div style={{ flexGrow: 1 }} />
                </div>
                <div style={{ width: '100vw', float: 'left', display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <div style={{ flexGrow: 1 }}></div>
                    <div>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', width: Device.switch(this.root.col8, this.root.col12, this.root.col12) }}>
                            &emsp;The internet that we think of today is mostly powered by the Hypertext Transfer Protocol (HTTP) which began development in 1989. HTTP uses text messages over TCP to transfer files for web browsing. Each transmission begins with a “header” which contains meta data. This is followed by a blank line, which is followed by a payload data package or “body”.  The Hyper Text Transfer Protocol is initiated in text, but can send arbitrary data in the body
                            <div style={{ height: '10vh' }} />
                            <div style={{}}>
                                <div style={{ display: 'flex', marginBottom: 16, justifyContent: 'center' }}>
                                    <span className="material-icons" style={{ fontSize: 100 }}>
                                        dns
                                    </span>
                                    <span className="material-icons" style={{ fontSize: 100 }}>
                                        west
                                    </span>
                                    <span className="material-icons" style={{ fontSize: 100 }}>
                                        laptop_mac
                                    </span>
                                    <div style={{ fontFamily: 'Roboto Mono', marginLeft: 16, padding: 4, height: 100, width: 300, backgroundColor: fColor.darkMode[7].toHexString() }}>
                                        {'GET myPage.html HTTP/1.0'}
                                        <br />
                                        {'Content-Type: Text/HTML'}
                                        <br />
                                        {'User-Agent: Chrome'}
                                        <br />
                                        {'Cache-Control: no-cache'}
                                        <br />

                                    </div>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'center' }}>
                                    <span className="material-icons" style={{ fontSize: 100 }}>
                                        dns
                                    </span>
                                    <span className="material-icons" style={{ fontSize: 100 }}>
                                        east
                                    </span>
                                    <span className="material-icons" style={{ fontSize: 100 }}>
                                        laptop_mac
                                    </span>
                                    <div style={{ fontFamily: 'Roboto Mono', marginLeft: 16, padding: 4, width: 300, backgroundColor: fColor.darkMode[7].toHexString() }}>
                                        {'HTTP 200 OK'}
                                        <br />
                                        {'Date: Sun Feb, 12'}
                                        <br />
                                        <br />
                                        {'<HTML>'}
                                        <br />
                                        {'...'}
                                        <br />
                                        {'</HTML>'}
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                </div>
                <div style={{ width: '100vw', float: 'left', display: 'flex', flexDirection: 'column', height: '100vh' }}>
                    <div style={{ flexGrow: 1 }}></div>
                    <div>
                        <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center', width: Device.switch(this.root.col8, this.root.col12, this.root.col12) }}>
                            <img src='./project2/dawnOfMosaic.gif' />
                            <div style={{ height: '10vh' }} />
                            &emsp;The first popular web browser was Mosaic built in 1993, it used HTTP to transfer HTML files which described layout for text and images.<br /> <span style={{ cursor: 'pointer', color: fColor.blue.lighten1.toHexString() }}><u>Hyperlinks</u></span> could be used to take the user between pages, but each page was static.


                        </div>

                    </div>
                    <div style={{ flexGrow: 1 }}></div>
                </div>
            </div>


        </div >
    }

}


