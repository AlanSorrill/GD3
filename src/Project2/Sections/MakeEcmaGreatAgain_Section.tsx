import React, { RefObject } from "react";
import { Device, ExplainCard, htmlLinesAndTabs, Project2Root, Section } from "../Imports_Project2";


export class MakeEcmaGreatAgain_Section extends Section {
    constructor(root: Project2Root) {
        super('Modern JS', root)

    }
    explainCardRefs: Map<string, RefObject<ExplainCard>> = new Map();
    getExplainCardRef(name: string) {
        if (!this.explainCardRefs.has(name)) {
            this.explainCardRefs.set(name, React.createRef());
        }
        return this.explainCardRefs.get(name);
    }
    get cardWidth() {
        return Device.switch({ desktopHorizontal: this.root.col4, tabletHorizontal: this.root.col10, phoneVertical: this.root.col12 - this.root.navHeight });
    }
    get iconSize() {
        return Device.switch({ desktopHorizontal: this.root.col1 * 0.5, tabletHorizontal: this.root.col1 * 0.75, phoneVertical: this.root.col2 })
    }
    render(alpha: number) {
        return <div style={{ backgroundColor: fColor.black.toHexString() }}>
            {/* <div style={{ color: fColor.red.base.toHexString() }}>{alpha - (this.index - 1)}</div> */}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', marginRight: Device.isTabletOrPhone() ? this.root.navHeight : 0 }}>
                <div style={{ flexGrow: 1 }} />

                <div style={{ marginLeft: Device.isTabletOrPhone() ? '0px' : 'auto', marginRight: 'auto' }}>
                   


                    <ExplainCard
                        iconSize={this.iconSize}
                        width={this.cardWidth}
                        ref={this.getExplainCardRef('makeEcmaGreatAgain')}
                        iconImage={"./project2/ecma.png"}
                        titleText={"Make ECMA Great Again"}
                        descriptionText={"After the failure of ES4, the ECMA was ready to make Javascript great again. In 2009 rather than trying to make large breaking changes, they created ES5 with “no new syntax”. "} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), height: '100%', margin: this.root.col1 / 2 * 0.25 }}>
                            ES5 mostly added helper functions for processing lists of data. It also added JSON support which helps translate text to and from structured data. They did add some syntax, such as property getters and setters, but it’s hard to notice.
                        </div>
                        <div style={{ height: this.root.col1 / 2 * 0.25 }}></div>
                    </ExplainCard>

             
                    <ExplainCard
                        iconSize={this.iconSize}
                        width={this.cardWidth}
                        ref={this.getExplainCardRef('es6')}
                        iconImage={"./project2/ecma.png"}
                        titleText={"ES6"}
                        descriptionText={"In 2015 ES6 was released, which added language features for breaking large code bases into modules. It also added a general framework for processes with callbacks called Promises. Async/Await was added as syntactic sugar for dealing with promises and avoiding “callback hell”."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), height: '100%', margin: this.root.col1 / 2 * 0.25 }}>
                            {htmlLinesAndTabs(` async function downloadThing(){
                            \treturn new Promise((acc,rej)=>{
                                \t\tfetch('thingData.text').then((thingData) => {
                                    \t\t\tconsole.log(thingData);
                                    \t\t\tif(thingData != null){
                                    \t\t\t\tlet newThing = new Thing(thingData);
                                   \t\t\t\tacc(newThing);
                                   \t\t\t} else {
                                   \t\t\t\trej('No Data')
                                   \t\t\t}
                                \t\t});
                            \t});
                        }`)}
                        </div>
                        <div style={{ height: this.root.col1 / 2 * 0.25 }}></div>
                    </ExplainCard>

               


                </div>
                <div style={{ flexGrow: 1 }} />
            </div>

        </div>
    }
}