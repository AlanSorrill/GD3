import React, { RefObject } from "react";
import { Device } from "../../Helper";
import { htmlLinesAndTabs } from "../../Imports";
import { ExplainCard } from "../ExplainCard";
import { Project2Root } from "../HistoryOfJS";
import { PosInterper } from "../PosInterper";
import { Section } from "../Section";
import { Spritesheet } from "../Spritesheet";

export class Node_Section extends Section {
    constructor(root: Project2Root) {
        super('Server Side', root)

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
                        ref={this.getExplainCardRef('nodeJs')}
                        iconImage={"./project2/nodeJs.png"}
                        titleText={"NodeJS"}
                        descriptionText={"For the first 14 years of its life, Javascript had been stuck in the browser. Then in 2009 the NodeJS team took Javascript server side."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), height: '100%', margin: this.root.col1 / 2 * 0.25 }}>
                            Node uses the V8 engine developed by Chrome to run Javascript. Instead of having access to the browser DOM, Node has access to files and ports. The event driven nature of Javascript became handy once again; Instead of handling onClicks, Node events handle incoming requests for files. Though it can serve plain files, it can also generate responses at request time.
                        </div>
                        <div style={{ height: this.root.col1 / 2 * 0.25 }}></div>
                    </ExplainCard>
                   


                </div>
                <div style={{ flexGrow: 1 }} />
            </div>

        </div>
    }
}