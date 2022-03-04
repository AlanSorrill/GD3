import React, { RefObject } from "react";
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
    render(alpha: number) {
        return <div style={{ height: window.innerHeight * 3, backgroundColor: fColor.black.toHexString() }}>
            <div style={{ color: fColor.red.base.toHexString() }}>{alpha - (this.index - 1)}</div>
            <div style={{ width: '100%', height: window.innerHeight, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1 }} />

                <div style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <ExplainCard
                        ref={this.getExplainCardRef('thread')}
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
                        ref={this.getExplainCardRef('functions')}
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
                        ref={this.getExplainCardRef('types')}
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
                        ref={this.getExplainCardRef('thread')}
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
                        ref={this.getExplainCardRef('interpreted')}
                        iconImage={"./project2/icons/gavel.png"}
                        titleText={"Interpreted"}
                        descriptionText={"Javascript was designed to run on an infinite set of hardware. Instead of compiling to bespoke binary languages, it’s instructions are carried out by an interpreter"} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>
                            {`if(stuff >= things){\n}`.split('\n').insertBetweenEach(<br />)}
                        </div>
                    </ExplainCard>

                    <ExplainCard
                        iconSize={this.root.col1 / 2}
                        width={this.root.col4}
                        ref={this.getExplainCardRef('success')}
                        iconImage={""}
                        titleText={"Interpreted"}
                        descriptionText={"The language was a success, as it allowed web developers to create things never possible before. However it had some warts, and one major disadvantage: speed. Being an interpreted language, it was too slow to handle things like games and video streaming. For the time being, these tasks would be handled by Java applets or Flash plugins. "} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>

                        </div>
                    </ExplainCard>

                    <ExplainCard
                        iconSize={this.root.col1 / 2}
                        width={this.root.col4}
                        ref={this.getExplainCardRef('socialize')}
                        iconImage={"./project2/euStars.png"}
                        titleText={"European Socialization"}
                        descriptionText={"A year after its debut in Netscape2, it’s design was turned over to the European Computer Manufacturers Association (ECMA) for standardization; Giving Javascript it’s technical name, EcmaScript. This was an important step, as it democratized the design of the language and allowed other browsers to implement the same language. The ECMA committee is mostly composed of representatives from the browser vendors and other large tech companies; Such as Google, Microsoft, Apple, Mozilla, Adobe, and Intel. "} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>

                        </div>
                    </ExplainCard>
                    <PosInterper alpha={this.getExplainCardRef('socialize')?.current?.alpha_firstExpansion} frames={[
                        [0, this.getExplainCardRef('success')?.current?.airplaneContainer],
                        [0, this.getExplainCardRef('socialize')?.current?.airplaneContainer]]}>
                        <Spritesheet imageSrc={"./project2/spritesheet.png"} columns={5} rows={5} style={{ borderStyle: 'solid', borderWidth: 2, borderColor: '#00FF00', width: '100%', height: '100%' }} 
                        currentFrame={Math.round(this.getExplainCardRef('socialize')?.current?.alpha_firstExpansion * 20) % 21}
                         />
                    </PosInterper>

    
                    
                </div>
                <div style={{ flexGrow: 1 }} />
            </div>

        </div>
    }
}