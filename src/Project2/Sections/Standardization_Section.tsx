import React, { RefObject } from "react";
import { Device } from "../../Helper";
import { htmlLinesAndTabs } from "../../Imports";
import { ExplainCard } from "../ExplainCard";
import { Project2Root } from "../HistoryOfJS";
import { PosInterper } from "../PosInterper";
import { Section } from "../Section";
import { Spritesheet } from "../Spritesheet";

export class Standardization_Section extends Section {
    constructor(root: Project2Root) {
        super('Standardization', root)

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
                        ref={this.getExplainCardRef('success')}
                        iconImage={""}
                        titleText={"Slow Success"}
                        descriptionText={"The language was a success, as it allowed web developers to create things never possible before. However it had some warts, and one major disadvantage: speed. Being an interpreted language, it was too slow to handle things like games and video streaming. For the time being, these tasks would be handled by Java applets or Flash plugins. "} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), padding: this.root.col1 / 2 * 0.25 }}>

                        </div>
                    </ExplainCard>

                    <ExplainCard
                        iconSize={this.iconSize}
                        width={this.cardWidth}
                        ref={this.getExplainCardRef('socialize')}
                        iconImage={"./project2/euStars.png"}
                        titleText={"European Socialization"}
                        descriptionText={"A year after its debut in Netscape2, it’s design was turned over to the European Computer Manufacturers Association (ECMA) for standardization; Giving Javascript it’s technical name, EcmaScript. This was an important step, as it democratized the design of the language and allowed other browsers to implement the same language. The ECMA committee is mostly composed of representatives from the browser vendors and other large tech companies; Such as Google, Microsoft, Apple, Mozilla, Adobe, and Intel. "} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), height: '100%', margin: this.root.col1 / 2 * 0.25 }}>
                            The socialization of Javascript made it a language for every platform. However history tells us that Socialism adversely affects innovation, and the tale of Javascript is no different.
                        </div>
                        <div style={{ height: this.root.col1 / 2 * 0.25 }}></div>
                    </ExplainCard>

                    <ExplainCard
                        iconSize={this.iconSize}
                        width={this.cardWidth}
                        ref={this.getExplainCardRef('communism')}
                        iconImage={"./project2/hammerAndSickle.png"}
                        titleText={"Socialization and Innovation"}
                        descriptionText={"Though ECMAScript was now an excellent language for small event driven tasks, it lacked syntax for separating code for large software structures. Es4 was designed to fix this, with classes, interfaces, and strict types. Strict types were extremely controversial and the ECMA committee argued over the exact syntax of classes. It was championed by Mozilla and the company running Flash. Though it was implemented in FireFox for a while, and many of the features were adopted by ActionScript in Flash, the standard was never accepted and was lost to time."} >
                        <div style={{ fontFamily: 'Cascadia Code', color: fColor.white.toHexString(), height: '100%', margin: this.root.col1 / 2 * 0.25 }}>
                            <img style={{ height: 'auto', width: '100%', paddingBottom: this.root.col1 / 2 * 0.25 }} src={'./project2/ieKillsNetscape.gif'} />
                            Microsoft’s dominance in the market stalled the development of ECMA and a new standard wouldn’t be released until 2009.
                        </div>
                    </ExplainCard>
                    

                    <PosInterper alpha={this.getExplainCardRef('socialize')?.current?.alpha_firstExpansion.alphaInRange(0.65, 1)} frames={[
                        [0, this.getExplainCardRef('success')?.current?.airplaneContainer],
                        [0, this.getExplainCardRef('socialize')?.current?.airplaneContainer]]}>
                        <Spritesheet imageSrc={"./project2/spritesheet.png"} columns={21} rows={1} style={{
                            // borderStyle: 'solid', borderWidth: 2, borderColor: '#00FF00', 
                            width: '100%', height: '100%'
                        }}
                            currentFrame={Math.round(this.getExplainCardRef('socialize')?.current?.alpha_firstExpansion * 20) % 21}
                        />
                    </PosInterper>



                </div>
                <div style={{ flexGrow: 1 }} />
            </div>

        </div>
    }
}