import React from "react";
import { Device, Project2Root, Section } from "../../Imports";


export class Section_Http extends Section {

    constructor(root: Project2Root) {
        super('1995', root)

    }
    render(alpha: number): React.ReactNode {
        return <div style={{ backgroundColor: fColor.darkMode[0].toHexString(), color: fColor.lightText[1].toHexString() }}>
            <div style={{ height: this.root.navHeight }}></div>
            <div style={{ height: '100vh' }}>
                &emsp;A new browser, Netscape2, is in development. The goal of this new browser: an interactive web. Time runs short; Microsoft has just tried to purchase Netscape. They predict that Microsoft will copy their first browser and use Window’s massive market share to destroy the Netscape Navigator. Netscape has partnered with Sun Microsystems to embed the Java programming language in their new browser.

            </div>
            <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', }}>
                    <img src="./Project2/squareJava.png" style={{ height: 'auto', width: '30vh', marginLeft: this.root.col1 }} />
                    <div style={{ marginLeft: this.root.col1, marginRight: this.root.col1 }}>
                        Java is an object oriented, strict typed, partially compiled language. It was selected because unlike other compiled languages, it transpiles into a cross platform binary format which is interpreted by the JavaVM. Unfortunately, Java would not have access to the HTML elements on the page, and would be “stuck in a box”, only able to draw in one rectangle. It’s updated versions often broke old code, requiring users to constantly update their Java plugin. Netscape wanted a “companion” language which would glue the Java applets to the webpage, and manipulate the DOM This language would be written in the same files as the HTML and CSS.
                    </div>
                </div>
                <div style={{ display: 'flex',marginTop: this.root.col1 }}>
                    <img src="./Project2/brendanEich02.png" style={{ height: 'auto', width: '30vh', marginLeft: this.root.col1 }} />
                    <div style={{ marginLeft: this.root.col1, marginRight: this.root.col1 }}>
                        Java is an object oriented, strict typed, partially compiled language. It was selected because unlike other compiled languages, it transpiles into a cross platform binary format which is interpreted by the JavaVM. Unfortunately, Java would not have access to the HTML elements on the page, and would be “stuck in a box”, only able to draw in one rectangle. It’s updated versions often broke old code, requiring users to constantly update their Java plugin. Netscape wanted a “companion” language which would glue the Java applets to the webpage, and manipulate the DOM This language would be written in the same files as the HTML and CSS.
                    </div>
                </div>
            </div>
        </div >
    }

}