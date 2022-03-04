import React from "react";
import { lerp } from "../Helper";
export interface PosInterper_Props {
    alpha: number
    frames: Array<[number, React.RefObject<HTMLDivElement>]>
}
export interface PosInterper_State { }
export class PosInterper extends React.Component<PosInterper_Props, PosInterper_State>{

    render() {
        let startIndex = 0;
        for (let i = 0; i < frames.length - 1; i++) {
            if (this.props.frames[i][0] >= this.props.frames[startIndex][0]) {
                startIndex = i;
            } else {
                break;
            }
        }
        let endIndex = Math.min(startIndex + 1, this.props.frames.length - 1);
        let startRect: DOMRect = (this.props.frames[startIndex][1]?.current) ? this.props.frames[startIndex][1]?.current?.getBoundingClientRect() : { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0, toJSON: null }
        let endRect: DOMRect = (this.props.frames[endIndex][1]?.current) ? this.props.frames[endIndex][1]?.current?.getBoundingClientRect() : { bottom: 0, height: 0, left: 0, right: 0, top: 0, width: 0, x: 0, y: 0, toJSON: null }

        return <div style={{
            position: 'fixed',
            left: lerp(startRect.left, endRect.left, this.props.alpha),
            top: lerp(startRect.top, endRect.top, this.props.alpha),
            width: lerp(startRect.width, endRect.width, this.props.alpha),
            height: lerp(startRect.height, endRect.height, this.props.alpha)
        }}>
            {this.props.children}
            <div>{startIndex} to {endIndex}</div>
        </div>
    }
}