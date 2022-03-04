import React, { CSSProperties } from "react";
import { CombineCopyObjects, downloadImage } from "../Helper";
import { FuncCanvas } from "./FuncCanvas";

export interface Spritesheet_Props {
    style?: CSSProperties
    imageSrc: string,
    columns: number,
    rows: number
    currentFrame: number
}
export interface Spritesheet_State { 
    test: number
}
export class Spritesheet extends React.Component<Spritesheet_Props, Spritesheet_State>{
    img: HTMLImageElement = null;
    constructor(props: Spritesheet_Props) {
        super(props);
    }
    imageReference: React.RefObject<HTMLDivElement> = React.createRef();
    containerReference: React.RefObject<HTMLDivElement> = React.createRef();
    async componentDidMount() {
        this.img = await downloadImage(this.props.imageSrc)
this.autoRefresh();
    }
    autoRefresh(){
        let ths = this;
        this.setState({test: 5})
        setTimeout(()=>{ths.autoRefresh()}, 1000/30);
    }
    get currentFrameRow() {
        return Math.ceil(this.props.currentFrame / this.props.columns)
    }
    get currentFrameColumn(){
        return this.props.currentFrame % this.props.columns
    }
    render() {



        let containerSize = (!this.containerReference.current) ? null : this.containerReference.current.getBoundingClientRect();
        let ths = this;
        return <FuncCanvas style={this.props.style} draw={function (ctx: CanvasRenderingContext2D, bounds: DOMRect, element: HTMLCanvasElement): void {
            // alert('Drawing!!!!')
            ctx.clearRect(0, 0, element.width, element.height);

            if (ths.img != null) {

                let cellOnImgWidth = ths.img?.width ?? 0 / ths.props.columns;
                let cellOnImgHeight = ths.img?.height ?? 0 / ths.props.rows;


                let cellOnScreenWidth = bounds.width / ths.props.columns;
                let cellOnScreenHeight = bounds.height / ths.props.rows;

                let xRatio = ths.img.width ?? 0 / element.width;
                let yRatio = ths.img.height ?? 0 / element.height
                ctx.drawImage(ths.img, -1 * bounds.width  * ths.currentFrameColumn, -1 * bounds.height * ths.currentFrameRow, bounds.width * ths.props.columns, bounds.height * ths.props.rows);
                ctx.font = '30px Arial'
                ctx.textBaseline = 'top'
                ctx.fillStyle = '#fff'
                ctx.fillText(`${ths.props.currentFrame}: ${ths.currentFrameColumn}, ${ths.currentFrameRow}`, 0, 0)
            } else {
                // console.log()
                ctx.strokeStyle = '#FF0000'
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(0, 0)
                ctx.lineTo(bounds.width, bounds.height)
                ctx.stroke();
            }
        }} />
    }
}