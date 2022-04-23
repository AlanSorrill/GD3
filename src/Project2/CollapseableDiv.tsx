import React from "react";
import { fillDefaults, ListOptionals } from "../Helper";

export interface CollapseableDiv_Props {
    style: React.CSSProperties
    heightAlpha?: number
    widthAlpha?: number
}
export class CollapseableDiv extends React.Component<CollapseableDiv_Props> {
    measureContainer: React.RefObject<HTMLDivElement> = React.createRef();
    displayContainer: React.RefObject<HTMLDivElement> = React.createRef();
    constructor(props: CollapseableDiv_Props) {
        super(props)

    }
    get alpha() {
        return this.props.heightAlpha;//return (Math.cos(Date.now()) + 1) / 2
    }
    get widthAlpha() {
        return (this.props.widthAlpha) ? this.props.widthAlpha : 1
    }
    get heightAlpha() {
        return (this.props.heightAlpha) ? this.props.heightAlpha : 1
    }
    render() {
        let measureDimensions = null
        if (this.measureContainer.current) {
            measureDimensions = this.measureContainer.current.getBoundingClientRect();
        }
        return <div style={this.props.style}>
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
            <div ref={this.measureContainer} style={{
                position: 'absolute',
                left: 0, right: 0, top: 0,
                visibility: 'hidden'
            }}>{this.props.children}</div>
            <div ref={this.displayContainer} style={{
                width: measureDimensions?.width * this.props.widthAlpha,
                height: measureDimensions?.height * this.props.heightAlpha,
                overflowY: 'hidden'
            }}>{this.props.children}</div>
            </div>
        </div>
    }
}

