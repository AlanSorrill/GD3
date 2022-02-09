import React from "react";

export interface ReactCanvas_Props {
    draw: (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement)=>void
    style: React.CSSProperties
}
export interface ReactCanvas_State {}
export class ReactCanvas<P extends ReactCanvas_Props,S extends ReactCanvas_State> extends React.Component<P,S>{
    canvasRef: React.RefObject<HTMLCanvasElement>;
    ctx: CanvasRenderingContext2D;
    constructor(props: P){
        super(props)
        this.canvasRef = React.createRef();
    }
    componentDidMount(): void {
        this.ctx = this.canvasRef.current.getContext('2d')
        this.props.draw(this.ctx, this.canvasRef.current);
    }
    render(){
        return <canvas ref={this.canvasRef} style={this.props.style}/>
    }
}