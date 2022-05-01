import { fColor } from "bristolboard";
import React, { RefObject } from "react";
import { Device } from "../../Helper";
import { htmlLinesAndTabs } from "../../Imports";
import { ExplainCard } from "../ExplainCard";
import { Project2Root } from "../HistoryOfJS";
import { PosInterper } from "../PosInterper";
import { Section } from "../Section";
import { Spritesheet } from "../Spritesheet";
export interface Examples_Section_Props {

}
export interface Examples_Section_State {
    testSlide: number
}
export interface ExapleData {
    icon: string
    title: string
    description: string

}
export class Examples_Section extends Section {
    constructor(root: Project2Root) {
        super('What is JS', root)

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
                        ref={this.getExplainCardRef('thread')}
                        iconSize={this.iconSize}
                        width={Device.switch({desktopHorizontal: this.root.col4, tabletHorizontal: this.root.col10, phoneVertical: this.root.col12})}

                        iconImage={"./project2/icons/CurlyBrackets.png"}
                        titleText={"A Single Thread"}
                        descriptionText={"Javascript’s lexical scopes are delimited by curly brackets and parenthasis. This grammer effects control structures and function declarations."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        ref={this.getExplainCardRef('functions')}
                        iconSize={this.iconSize}
                        width={this.cardWidth}

                        iconImage={"./project2/icons/function.png"}
                        titleText={"First Class Functions"}
                        descriptionText={"Inspired by functional research languages, functions are just another data type to be stuffed inside variables."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {htmlLinesAndTabs(`function doTwice(inputFunc){
\tinputFunc();
\tinputFunc();
}
function laugh(){
\tconsole.log(“ha”);
}
doTwice(laugh);`)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        iconSize={this.iconSize}
                        width={this.cardWidth}
                        ref={this.getExplainCardRef('types')}
                        iconImage={"./project2/icons/transgender.png"}
                        titleText={"Dynamic & Implicit Types"}
                        descriptionText={"The implicit type system was friendly to novices, and allowed designers to focus on business logic rather than which number format to use. "} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {htmlLinesAndTabs(`var myNumber = 5;\n
var myText = “stuff and things”;\n
var person = new Person();\n
var answer = addNumbers(9, 10);`)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        iconSize={this.iconSize}
                        width={this.cardWidth}
                        ref={this.getExplainCardRef('thread')}
                        iconImage={"./project2/icons/line_style.png"}
                        titleText={"A Single Thread"}
                        descriptionText={"Javascript would be executed in the same thread as the rendering and in the some cases networking. This meant that functions could never block. To accomplish long tasks a callback function is given to be executed when the task completes"} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        iconSize={this.iconSize}
                        width={this.cardWidth}
                        ref={this.getExplainCardRef('interpreted')}
                        iconImage={"./project2/icons/gavel.png"}
                        titleText={"Interpreted"}
                        descriptionText={"Javascript was designed to run on an infinite set of hardware. Instead of compiling to bespoke binary languages, it’s instructions are carried out by an interpreter"} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>

                    


                </div>
                <div style={{ flexGrow: 1 }} />
            </div>

        </div>
    }
}