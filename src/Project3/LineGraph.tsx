import { BristolBoard, BristolFont, lerp, MouseDragListener, MouseMovementListener, RawPointerData, RawPointerMoveData, UIElement, UIFrameResult, UIFrame_CornerWidthHeight } from "bristolboard";
import React from "react";
import { DataChannel } from "../../srcFunctions/common/WonderData";

export interface LineGraph_Props {
    style: React.CSSProperties & {
        background: "transparent";
    }
    sources: DataChannel[]
    padding: number
}
export interface LineGraph_State {
}
export class LineGraph extends React.Component<LineGraph_Props, LineGraph_State>{
    constructor(props: LineGraph_Props) {
        super(props);
        this.state = { source: null }
    }
    bristol: React.RefObject<BristolBoard<UILineGraph>> = React.createRef()
    componentDidUpdate(prevProps: Readonly<LineGraph_Props>, prevState: Readonly<LineGraph_State>, snapshot?: any): void {
        if (this.bristol.current) {
            this.bristol.current.rootElement.setState(this.state)
            this.bristol.current.rootElement.setProps(this.props)
        }
    }
    render(): React.ReactNode {
        let ths = this;
        return <div style={{ display: 'flex' }}>
            <div style={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1 }} />
                {this.props.sources?.map((data: DataChannel) => <div>
                    {data.title}
                </div>)}
            </div>
            <div style={{ flexGrow: 4 }}>
                <BristolBoard<UILineGraph> ref={this.bristol} style={{ background: 'transparent', width: '100%', height: '100%' }} buildRootElement={async (brist) => {
                    return new UILineGraph('ROOT', new UIFrame_CornerWidthHeight({ x: () => this.props.padding, y: () => this.props.padding, width: () => brist.getWidth() - (ths.props.padding * 2), height: () => brist.getHeight() - (ths.props.padding * 2) }), brist, this.state, this.props);
                }} />
            </div>
        </div>
        return
    }
}

export class UILineGraph extends UIElement implements MouseDragListener {
    props: LineGraph_Props
    state: LineGraph_State;
    onDrawBackground(frame: UIFrameResult, deltaTime: number): void {

        this.brist.ctx.clearRect(frame.left, frame.top, frame.width, frame.height)
    }
    onDrawForeground(frame: UIFrameResult, deltaTime: number): void {

        if (this.sources) {
            this.brist.noFill()
            this.sources.forEach((data: DataChannel) => {
                this.brist.strokeColor(data.color)
                this.brist.strokeWeight(4)
                this.brist.ctx.beginPath();
                data.tree.forRange(this.startTime, this.endTime, true, (time: number, value: number, count: number) => {
                    if (count == 0) {
                        this.brist.ctx.moveTo(this.timeToX(time, frame), this.valueToY(value, frame))

                    } else {
                        this.brist.ctx.lineTo(this.timeToX(time, frame), this.valueToY(value, frame))

                    }
                })
                this.brist.ctx.stroke()
            })
            this.brist.ctx.beginPath();

        } else {
            this.brist.ellipse(lerp(frame.left, frame.right, (Date.now() / 1000) % 1), frame.centerY, frame.width / 5, frame.width / 5, false, true)

        }

    }
    timeToX(time: number, frame: UIFrameResult) {
        return frame.left + time.alphaInRange(this.startTime, this.endTime, false) * frame.width

    }
    valueToY(value: number, frame: UIFrameResult) {
        return frame.left + value.alphaInRange(this.minValue, this.maxValue, false) * frame.width
    }


    setState(state: LineGraph_State) {
        console.log(`UIElement recieved state`, state)
        this.state = state;
    }
    get sources() {
        return this.props?.sources;
    }
    get padding() {
        return this.props?.padding
    }
    setProps(props: LineGraph_Props) {
        console.log(`UIElement recieved props`, props)
        this.props = props
        if (this.sources?.length > 0) {
            this.startTime = this.sources[0].tree.minKey()
            this.endTime = this.sources[0].tree.maxKey()
            this.minValue = this.sources[0].minValue
            this.maxValue = this.sources[0].maxValue
        }

    }
    maxValue: number
    minValue: number
    startTime: number
    endTime: number
    constructor(id: string, frame: UIFrame_CornerWidthHeight, brist: BristolBoard<UILineGraph>, state: LineGraph_State, props: LineGraph_Props) {
        super(id, frame, brist);

    }
    shouldDragLock(event: RawPointerData | [start: RawPointerData, lastMove: RawPointerMoveData]): boolean {
        return true;
    }
    mouseDragged(evt: RawPointerMoveData): boolean {
        let dragInTime = (Math.abs(evt.delta[0]).alphaInRange(0, this.frame.measureWidth()) * (this.endTime - this.startTime)) * (evt.delta[0] < 0 ? -1 : 1)
        this.startTime = this.startTime + dragInTime
        this.endTime = this.endTime + dragInTime
        return true;
    }
    onDragEnd(event: RawPointerData | RawPointerMoveData): boolean {
        return true;
    }

}
