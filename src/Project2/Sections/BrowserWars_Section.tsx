import React from "react";
import { interpolate } from "../../Helper";
import { Device, Project2Root, RectOnScreen, Section } from "../../Imports";
// import "./starwarsintro.css"

export class Section_Http extends Section {
    browserWarsHoldContainer: React.RefObject<HTMLDivElement> = React.createRef()
    browserWarsScrollContainer: React.RefObject<HTMLDivElement> = React.createRef()
    warpedContainer: React.RefObject<HTMLDivElement> = React.createRef()
    stickyDiv: React.RefObject<HTMLDivElement> = React.createRef()

    constructor(root: Project2Root) {
        super('1995', root)

    }
    getScrollText() {
        return "Netscape2, is in development. The goal of this new browser: an interactive web. Time runs short; Microsoft has just tried to purchase Netscape. They predict that Microsoft will copy their first browser and use Window’s massive market share to destroy the Netscape Navigator. Netscape has partnered with Sun Microsystems to embed the Java programming language in their new browser. "
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
        return this.warpedContainer.current.getBoundingClientRect().height * 15;
    }

    render(alpha: number): React.ReactNode {
        let beta = this.calcBeta();
        let transparency = interpolate([[-1, 0], [-0.6, 1], [1, 1], [2, 0]], beta);
        return <div style={{ backgroundColor: fColor.darkMode[0].toHexString(), color: fColor.lightText[1].toHexString() }}>

            <div ref={this.browserWarsScrollContainer} style={{ height: '250vh' }}>
                <div ref={this.stickyDiv} style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
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
                                visibility: beta < -0.5 ? 'hidden' : 'visible',
                                height: 'auto',
                                width: interpolate([[-0.7, this.root.col11], [0, 0]], beta)
                            }} /></div>
                    <div style={{ flexGrow: 1 }}></div>
                    <div ref={this.warpedContainer} className="browserWars">
                        <div style={{
                            position: 'relative',
                            top: interpolate([[-0.25, 100], [1, 0], [2, -100]], beta) + "%",
                            color: fColor.yellow.base.toHexStringAlpha(interpolate([[-1, 0], [-0.9, 1], [1, 1], [2, 0]], beta))
                        }}>
                            <h1 style={{ textAlign: 'center' }}>A new browser</h1>
                            {this.getScrollText()}
                            {/* {([1, 1, 1, 1, 1, 1, 1].map(() => (<br />)))} */}

                        </div>
                    </div>
                </div>
                <div ref={this.browserWarsHoldContainer} style={{ width: this.root.col3, fontSize: 20, textAlign: 'justify', color: fColor.yellow.base.toHexString() }}>
                    {/* &emsp;{this.getScrollText()} */}
                </div>
            </div>
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', }}>
                    <img src="./project2/squareJava.png" style={{ height: 'auto', width: '30vh', marginLeft: this.root.col1 }} />
                    <div style={{ marginLeft: this.root.col1, marginRight: this.root.col1 }}>
                        Java is an object oriented, strict typed, partially compiled language. It was selected because unlike other compiled languages, it transpiles into a cross platform binary format which is interpreted by the JavaVM. Unfortunately, Java would not have access to the HTML elements on the page, and would be “stuck in a box”, only able to draw in one rectangle. It’s updated versions often broke old code, requiring users to constantly update their Java plugin. Netscape wanted a “companion” language which would glue the Java applets to the webpage, and manipulate the DOM This language would be written in the same files as the HTML and CSS.
                    </div>
                </div>
                <div style={{ display: 'flex', marginTop: this.root.col1 }}>
                    <img src="./project2/brendanEich02.png" style={{ height: 'auto', width: '30vh', marginLeft: this.root.col1 }} />
                    <div style={{ marginLeft: this.root.col1, marginRight: this.root.col1 }}>
                        His bosses wanted it to look like Java and be easy to learn, while Brendan was interested in functional research languages. The result was a single threaded, dynamically typed, C based, interpreted programming language. It’s operators and variable declaration looked a lot like Java, but it had support for first class functions. Its dynamic typing system had very few types: number, string, object, and function. It’s objects were essentially key-value maps with prototypical inheritance. It’s single thread operated on an asynchronous event loop. Brendan was tasked with creating this language in 10 days as Netscape was aware that Microsoft was building a browser, and they valued their first mover advantage.
                    </div>
                </div>
            </div>
        </div >
    }

}