import { fColor } from "bristolboard";
import React from "react";
import { Device } from "../../Helper";

import { brNewlines, interpolate, Project2Root, RectOnScreen, Section } from "../Imports_Project2";
// import "./starwarsintro.css"

export class Http_Section extends Section {
    browserWarsHoldContainer: React.RefObject<HTMLDivElement> = React.createRef()
    browserWarsScrollContainer: React.RefObject<HTMLDivElement> = React.createRef()
    warpedContainer: React.RefObject<HTMLDivElement> = React.createRef()
    childContainer: React.RefObject<HTMLDivElement> = React.createRef()
    stickyDiv: React.RefObject<HTMLDivElement> = React.createRef()

    constructor(root: Project2Root) {
        super('1995', root)

    }

    getLogoLength() {
        return window.innerHeight * 0.5;
    }
    getScrollSectionLength() {
        if (!this.browserWarsHoldContainer.current) {
            return 0;
        }
        return this.getWarpedContainerLength() + this.getLogoLength();
    }
    shouldHideStickyDiv() {
        if (!this.browserWarsScrollContainer.current) {
            return false;
        }
        let rect = this.browserWarsScrollContainer.current.getBoundingClientRect()
        // if (rect.top > window.innerHeight) {
        //     return true
        // }
        // return rect.bottom < 0;
        return false;
    }

    calcBeta() {
        if (!this.browserWarsScrollContainer.current) {
            return 0;
        }
        let rect = this.browserWarsScrollContainer.current.getBoundingClientRect()
        return RectOnScreen.verticalBeta(rect)
        // if (rect.top < window.innerHeight) {
        //     if(rect.bottom < window.innerHeight){
        //         return (rect.bottom / window.innerHeight).clamp(0,1)
        //     } 
        //     return 1 - (rect.top / window.innerHeight).clamp(0, 1)
        // }
        // return 0
    }
    getWarpedContainerLength() {
        if (!this.warpedContainer.current) {
            return 0
        }
        return this.childContainer.current.getBoundingClientRect().height * 1
    }

    render(alpha: number): React.ReactNode {
        let beta = this.calcBeta();
        let transparency = interpolate([[-1, 0], [-0.6, 1], [1, 1], [2, 0]], beta);

        return <div style={{ backgroundColor: fColor.darkMode[0].toHexString(), color: fColor.lightText[1].toHexString() }}>

            <div ref={this.browserWarsScrollContainer} style={{ height: '400vh' }}>
                <div ref={this.stickyDiv} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: this.root.navHeight,
                    bottom: 0,
                    backgroundColor: `rgba(0, 0, 0, ${transparency})`,
                    display: (transparency > 0) ? 'flex' : 'none',
                    flexDirection: 'column'
                }}>
                    {/* <div style={{ color: 'white', position: 'absolute', left: 10, top: 30 }}>{beta}<br />{beta}</div> */}
                    {/* <div style={{ color: 'white' }}><br />{this.getBackgroundTransparency(beta)}<br />{this.calcBeta()}</div> */}
                    <div style={{ flexGrow: 1 }}></div>
                    <div style={{ marginLeft: 'auto', marginRight: 'auto', textAlign: 'center' }}>
                        <img
                            src="./project2/browserWars.png"
                            style={{
                                visibility: beta < -0.6 ? 'hidden' : 'visible',
                                height: 'auto',
                                width: interpolate([[-0.6, this.root.col11], [0, 0]], beta)
                            }} /></div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div ref={this.warpedContainer} className="browserWars" style={{ fontSize: Device.switch({desktopHorizontal: 80, tabletHorizontal: 40, phoneHorizontal: 40})}}>
                        <div ref={this.childContainer} style={{
                            position: 'relative',
                            top: interpolate([[-0.25, 100], [0, 0], [1, -150]], beta) + "%",
                            color: fColor.yellow.base.toHexStringAlpha(interpolate([[-1, 0], [-0.9, 1], [1, 1], [1.6, 0]], beta))
                        }}>
                            <h1 style={{ textAlign: 'center' }}>A NEW BROWSER</h1>
                            {brNewlines([
                                "Netscape2, is in development. The goal of this new browser: an interactive web. Time runs short; Microsoft has just tried to purchase Netscape. They predict that Microsoft will copy their first browser and use Window’s massive market share to destroy the Netscape Navigator. Netscape has partnered with Sun Microsystems to embed the Java programming language in their new browser. ",
                                "Java is an object oriented, strict typed, partially compiled language. It is selected because unlike other compiled languages, it transpiles into a cross platform binary format which is interpreted by the JavaVM. ",
                                "Unfortunately, Java does not have access to the HTML elements on the page, and would be “stuck in a box”, only able to draw in one rectangle. It’s updated versions often break old code, requiring users to constantly update their Java plugin. Netscape wants a “companion” language which will glue the Java applets to the webpage, and manipulate the DOM. This language will be written in the same files as the HTML and CSS.",
                                "Brendan Eich is hired to implement such a language. Given the imminent Microsoft threat, he is tasked with prototyping this language in 10 days"
                            ], { brCount: 2, indent: false })}

                            {/* {([1, 1, 1, 1, 1, 1, 1].map(() => (<br />)))} */}

                        </div> 
                    </div>
                </div>
                <div ref={this.browserWarsHoldContainer} style={{ width: this.root.col3, fontSize: 20, textAlign: 'justify', color: fColor.yellow.base.toHexString() }}>
                    {/* &emsp;{this.getScrollText()} */}
                </div>
            </div>
            
        </div >
    }

}