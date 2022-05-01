import { fColor } from "bristolboard";
import React, { RefObject } from "react";
import { Device } from "../../Helper";
import { htmlLinesAndTabs } from "../../Imports";
import { ExplainCard } from "../ExplainCard";
import { Project2Root } from "../HistoryOfJS";
import { PosInterper } from "../PosInterper";
import { Section } from "../Section";
import { Spritesheet } from "../Spritesheet";

export class Jit_Section extends Section {
    constructor(root: Project2Root) {
        super('JIT Speed', root)

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
                        ref={this.getExplainCardRef('speed')}
                        iconImage={"./project2/v8Color.png"}
                        titleText={"Speed"}
                        descriptionText={"To this point Javascript has had a severe speed deficiency when compared to other languages of the time. Traditional interpreters read Javascript one line at a time and decide what to do next with software level logic. This was changed by researchers at Google with the V8 Javascript Engine in Chrome."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), height: '100%', margin: this.root.col1 / 2 * 0.25 }}>
                            V8 has a classic interpreter which it uses at first, but as it interprets code it looks for type patterns in data structures. When it finds a recurring theme, it compiles chunks of code into native binary which is interpreted directly by the CPU. When the pattern is violated, V8 drops back to it’s classic interpreter. This Just In Time Compiler (JIT) technology made EcmaScript almost on par with more “powerful” languages such as Java. Google claims it’s current v8 engine is only 20% slower than C++.
                        </div>
                        <div style={{ height: this.root.col1 / 2 * 0.25 }}></div>
                    </ExplainCard>

                  


                </div>
                <div style={{ flexGrow: 1 }} />
            </div>

        </div>
    }
}