import React from "react";
import { interpolate, lerp, lerpTuple } from "../Helper";
import { FColor } from "../Imports";
import { CollapseableDiv } from "./CollapseableDiv";

export interface ExplainCard_Props {
    width: number
    iconSize?: number
    // transitionAlpha?: number


    iconImage: string
    titleText: string
    descriptionText: string
}
export interface ExplainCard_State {

}
export class ExplainCard extends React.Component<ExplainCard_Props, ExplainCard_State> {
    constructor(props: ExplainCard_Props) {
        super(props);
        this.state = { transitionAlpha: 0 }

    }
    get iconSize() {
        return (typeof this.props.iconSize == 'number') ? this.props.iconSize : 50
    }
    get calcWidth() {
        return lerp(this.iconSize, this.props.width, this.fromTopAlpha.alphaInRange(0.1,0.15))
    }

    get ontoScreenAlpha() {
        if (!this.containerRef.current) {
            return -1
        }
        let rect = this.containerRef.current.getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
            return ((window.innerHeight - rect.top) / rect.height)
        }
        return 1
    }
    get fromTopAlpha() {
        if (!this.containerRef.current) {
            return -1;
        }

        let rect = this.containerRef.current.getBoundingClientRect();
        if(rect.top > window.innerHeight){
            return 0
        }
        if(rect.top < 0){
            return 1
        }
        return (rect.top / window.innerHeight).oneMinus()
    }
    // get alpha() {
    //     if (this.props.transitionAlpha) {
    //         return this.props.transitionAlpha
    //     }
    //     if (this.containerRef.current) {

    //     }
    //     return 0;
    // }
    slider: React.RefObject<HTMLInputElement> = React.createRef()
    containerRef: React.RefObject<HTMLDivElement> = React.createRef();
    render() {
        return <div ref={this.containerRef} style={{
            width: this.calcWidth,
            textAlign: 'center',
            marginLeft: 'auto', marginRight: 'auto', marginBottom: this.iconSize * 2
        }}>
            {/* <input style={{ marginLeft: 'auto', marginRight: 'auto' }} type="range" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                //({ transitionAlpha: Number(event.target.value) / 100 })
            }} ref={this.slider} /> */}
            <div style={{
                textAlign: 'left',
                width: this.calcWidth,
                backgroundColor: FColor.hsvToRgbString(lerpTuple(fColor.black.toHsv(), fColor.darkMode[5].toHsv(), this.ontoScreenAlpha.alphaInRange(0.5, 1), ['start', 'startToEnd', 'startToEnd'])),
                borderWidth: interpolate([[0, 0], [0.5, 3], [1, 0]], this.ontoScreenAlpha),
                borderRadius: lerp(0, 10, this.ontoScreenAlpha.alphaInRange(0, 0.5)),
                borderColor: fColor.darkMode[11].toHexString(),
                borderStyle: 'solid',
                overflow: 'hidden'
            }}>
                <div style={{
                    backgroundColor: fColor.darkMode[9].toHexString(),
                    position: 'relative',
                    height: this.iconSize,

                }}>
                    <div style={{ float: 'left', width: this.iconSize, height: this.iconSize, backgroundColor: FColor.hsvToRgbString(lerpTuple(fColor.black.toHsv(), fColor.darkMode[11].toHsv(), this.ontoScreenAlpha.alphaInRange(0.5, 1), ['start', 'startToEnd', 'startToEnd'])), }}>
                        <div style={{ width: this.iconSize, height: this.iconSize, backgroundSize: 'contain', backgroundImage: `url("${this.props.iconImage}")` }}></div>
                    </div>
                    <div style={{ position: 'absolute', left: this.iconSize, top: 0, width: this.props.width - this.iconSize }}>
                        <div style={{ height: this.iconSize, display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flexGrow: 1 }} />
                            <div style={{ marginLeft: this.iconSize * 0.25, fontSize: this.iconSize * 0.3, color: fColor.white.toHexString() }}>{this.props.titleText}</div>
                            <div style={{ flexGrow: 1 }} />
                        </div>
                    </div>
                </div>

                <div>
                    <CollapseableDiv heightAlpha={this.fromTopAlpha.alphaInRange(0.25, 0.5, true)} style={{}}>
                        {this.props.children}
                    </CollapseableDiv>

                    <CollapseableDiv heightAlpha={this.fromTopAlpha.alphaInRange(0.15, 0.25, true)} style={{}}>
                        <div style={{ backgroundColor: fColor.darkMode[9].toHexString(), color: fColor.white.toHexString(), padding: this.iconSize * 0.25 }}>
                            {this.props.descriptionText}
                        </div>
                    </CollapseableDiv>
                </div>
            </div></div>
    }
}