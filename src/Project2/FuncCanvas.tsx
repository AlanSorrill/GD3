import React, { CSSProperties } from "react";
import { CombineCopyObjects } from "../Helper";

export interface FuncCanvas_Props {
    style?: CSSProperties
    // redraw?: number
    draw: (ctx: CanvasRenderingContext2D, bounds: DOMRect, element: HTMLCanvasElement) => void
}
export interface FuncCanvas_State { }
export class FuncCanvas extends React.Component<FuncCanvas_Props, FuncCanvas_State>{
    ctx: CanvasRenderingContext2D;
    constructor(props: FuncCanvas_Props) {
        super(props);
    }
    canvasReference: React.RefObject<HTMLCanvasElement> = React.createRef();

    componentDidMount(): void {
        this.ctx = this.canvasReference.current.getContext('2d');
        this.invalidate();

    }
    invalidate() {
        if (!this.canvasReference.current) {
            let ths = this;
            // setTimeout(()=>{ths.setState({})},1)
            return;
        }
        let boundingBox = this.canvasReference.current.getBoundingClientRect();
        this.props.draw(this.ctx, boundingBox, this.canvasReference.current);
        
    }
    render() {
        this.invalidate();
        return <canvas
            width={this.canvasReference.current ? this.canvasReference.current.getBoundingClientRect().width : this.props.style.width ?? 0}
            height={this.canvasReference.current ? this.canvasReference.current.getBoundingClientRect().height : this.props.style.height ?? 0}
             ref={this.canvasReference} style={this.props.style}></canvas>
    }
}