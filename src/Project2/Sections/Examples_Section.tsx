import React from "react";
import { ExplainCard } from "../ExplainCard";
import { Project2Root } from "../HistoryOfJS";
import { Section } from "../Section";
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

    render(alpha: number) {
        return <div style={{ height: window.innerHeight * 3, backgroundColor: fColor.black.toHexString() }}>
            <div style={{ color: fColor.red.base.toHexString() }}>{alpha - (this.index - 1)}</div>
            <div style={{ width: '100%', height: window.innerHeight, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1 }} />

                <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <ExplainCard
                        iconSize={this.root.col1 / 2}
                        width={this.root.col4}

                        iconImage={"./project2/icons/CurlyBrackets.png"}
                        titleText={"A Single Thread"}
                        descriptionText={"Javascript’s lexical scopes are delimited by curly brackets and parenthasis. This grammer effects control structures and function declarations."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        iconSize={this.root.col1 / 2}
                        width={this.root.col4}

                        iconImage={"./project2/icons/function.png"}
                        titleText={"First Class Functions"}
                        descriptionText={"Inspired by functional research languages, functions are just another data type to be stuffed inside variables."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        iconSize={this.root.col1 / 2}
                        width={this.root.col4}

                        iconImage={"./project2/icons/transgender.png"}
                        titleText={"Dynamic & Implicit Types"}
                        descriptionText={"The implicit type system was friendly to novices, and allowed designers to focus on business logic rather than which number format to use. "} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        iconSize={this.root.col1 / 2}
                        width={this.root.col4}

                        iconImage={"./project2/icons/line_style.png"}
                        titleText={"A Single Thread"}
                        descriptionText={"Javascript would be executed in the same thread as the rendering and in the some cases networking. This meant that functions could never block. To accomplish long tasks a callback function is given to be executed when the task completes"} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>
                    <ExplainCard
                        iconSize={this.root.col1 / 2}
                        width={this.root.col4}

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