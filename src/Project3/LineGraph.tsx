import { BristolBoard, BristolCursor, BristolFont, BristolHAlign, BristolVAlign, lerp, MouseDragListener, MouseMovementListener, MouseWheelListener, RawPointerData, RawPointerMoveData, RawPointerScrollData, SpecialKey, UIElement, UIFrameResult, UIFrame_CornerWidthHeight } from "bristolboard";
import React from "react";
import { DataChannel, MonthNames } from "../../srcFunctions/common/WonderData";
import { EnglishNumbers, maxOfList, minOfList } from "../Helper";

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
            if (!window['LineGraphBrist']) {
                window['LineGraphBrist'] = this.bristol.current
            }
            this.bristol.current.rootElement?.setState(this.state)
            this.bristol.current.rootElement?.setProps(this.props)
        }
    }
    render(): React.ReactNode {
        let ths = this;
        return <div style={this.props.style}>
            <BristolBoard<UILineGraph> ref={this.bristol} style={{ background: 'transparent', height: '100%' }} buildRootElement={async (brist) => {
                return new UILineGraph('ROOT', new UIFrame_CornerWidthHeight({ x: () => this.props.padding, y: () => this.props.padding, width: () => brist.getWidth() - (ths.props.padding * 2), height: () => brist.getHeight() - (ths.props.padding * 2) }), brist, this.state, this.props);
            }} />
        </div>
        return
    }
}

export class UILineGraph extends UIElement implements MouseDragListener, MouseWheelListener {
    props: LineGraph_Props
    state: LineGraph_State;
    onDrawBackground(frame: UIFrameResult, deltaTime: number): void {
        this.brist.fillColor(fColor.grey.lighten4)
        this.brist.strokeColor(fColor.black)
        this.brist.strokeWeight(4)
        this.brist.rectFrame(frame, true, true)
        this.drawXAxis(frame)

    }
    onDrawForeground(frame: UIFrameResult, deltaTime: number): void {


    }
    get footerHeight() {
        return this.getHeight() * 0.1
    }
    timeToX(time: number, frame: UIFrameResult = null) {
        if (frame == null) { frame = this.frame.result }
        if (frame == null) { return 0 }
        return frame.left + time.alphaInRange(this.startTime, this.endTime, false) * frame.width

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
    initialLoad: boolean = true
    setProps(props: LineGraph_Props) {
        console.log(`UIElement recieved props`, props)
        this.props = props
        if (this.sources?.length > 0 && this.initialLoad) {
            let maxCount = maxOfList(this.sources.map((s) => s.tree.size))

            this.startTime = minOfList(this.sources.map(s => s.tree.minKey()))
            this.endTime = Math.max(this.startTime + 1000, maxOfList(this.sources.map(s => s.tree.maxKey())))
            this.minValue = minOfList(this.sources.map(s => s.minValue))
            this.maxValue = Math.max(this.minValue + 10, maxOfList(this.sources.map(s => s.maxValue)))

            console.log(`Line graph initialized to ${this.startTime}-${this.endTime}`, maxCount)
            this.startHandle.currentTime = this.startTime;
            this.endHandle.currentTime = this.sources[0].tree.maxKey();

            if (maxCount < 2) {
                return;
            }
            this.initialLoad = false;
        }

    }
    maxValue: number = 10
    minValue: number = 0
    startTime: number = 0
    endTime: number = 10
    startHandle: UILineHandle
    endHandle: UILineHandle
    lineArea: UILineArea;
    get widthInTime() {
        return this.endTime - this.startTime
    }
    get heightInValue() {
        return this.maxValue - this.minValue
    }
    constructor(id: string, frame: UIFrame_CornerWidthHeight, brist: BristolBoard<UILineGraph>, state: LineGraph_State, props: LineGraph_Props) {
        super(id, frame, brist);
        console.log(`Line Graph Constructed`)
        this.startHandle = new UILineHandle({ initTime: 0 }, this)
        this.endHandle = new UILineHandle({ initTime: 0 }, this)
        this.lineArea = new UILineArea(this)
        this.addChild(this.lineArea)
        this.addChild(this.startHandle)
        this.addChild(this.endHandle)
    }
    mouseWheel(evt: RawPointerScrollData): boolean {
        let amount = (evt.amount > 0 ? 1 : -1) * 0.05
        if (this.brist.isKeyPressed(SpecialKey.Control)) {
            // amount = this.heightInValue * amount 
            console.log(this.lineArea.lineHeight(EnglishNumbers.Thousand), this.lineArea.lineHeight(EnglishNumbers.Million))
            let spot = evt.position[1].alphaInRange(this.frame.topY(), this.frame.bottomY())
            this.minValue -= amount / 2 * spot.oneMinus() * this.heightInValue
            this.maxValue += amount / 2 * spot * this.heightInValue
            this.minValue = Math.max(this.minValue, 0)
        } else {

            let spot = evt.position[0].alphaInRange(this.frame.leftX(), this.frame.rightX())
            this.startTime -= amount / 2 * spot * this.widthInTime
            this.endTime += amount / 2 * spot.oneMinus() * this.widthInTime
        }
        return true
    }
    shouldDragLock(event: RawPointerData | [start: RawPointerData, lastMove: RawPointerMoveData]): boolean {
        return true;
    }
    mouseDragged(evt: RawPointerMoveData): boolean {
        let dragInTime = (Math.abs(evt.delta[0]).alphaInRange(0, this.frame.measureWidth()) * (this.widthInTime)) * (evt.delta[0] < 0 ? -1 : 1)
        let dragInValue = (Math.abs(evt.delta[1]).alphaInRange(0, this.frame.measureHeight()) * (this.heightInValue)) * (evt.delta[1] < 0 ? -1 : 1)
        this.startTime = this.startTime + dragInTime
        this.endTime = this.endTime + dragInTime
        if (this.minValue - dragInValue < 0) {
            dragInValue = dragInValue - Math.abs(this.minValue - dragInValue)
        }
        this.minValue = this.minValue - dragInValue
        this.maxValue = this.maxValue - dragInValue
        return true;
    }
    onDragEnd(event: RawPointerData | RawPointerMoveData): boolean {
        return true;
    }

    getXUnits(): number {
        // let ths = this;
        // let lineHeight = (u: number) => {
        //     return (u / ths..heightInValue) * this.getHeight()
        // }
        // let checked = []
        // for (let i = 1; i <= EnglishNumbers.Trillion * 1000; i < EnglishNumbers.Million ? (i < EnglishNumbers.Thousand ? i += 11 : i += 10) : i *= 10) {
        //     if (lineHeight(i) > 64) {
        //         // console.log(i)
        // // console.log(checked)
        //         return i
        //     }
        //     checked.push(i)
        //     // console.log(`Checking ${i}`)
        //     // console.log(i)

        // }

        let a = new Date(this.startTime)
        a.setDate(1)
        let b = new Date(a.getTime())
        b.setMonth(a.getMonth() + 1)
        let textWidth = this.brist.ctx.measureText(this.dateToText(a)).width
        let ths = this;
        let unitWidth = () => (ths.timeToX(b.getTime()) - ths.timeToX(a.getTime()))
        while (unitWidth() < textWidth) {
            console.log(`xaxis`,[unitWidth(),textWidth])
            if (b.getMonth() < 12) {
                b.setMonth(b.getMonth() + 1)
            } else {
                b.setMonth(1)
                b.setFullYear(b.getFullYear() + 1)
            }
        }
        console.log(`xaxis`,[unitWidth(),textWidth])
        let deltaYears = b.getFullYear() - a.getFullYear()
        return b.getMonth() - (deltaYears > 0 ? 0 : a.getMonth()) + 12*deltaYears
    }
    private setupText() {
        this.brist.fontFamily('Ubuntu')
        this.brist.textSize(24)
        this.brist.textAlign(BristolHAlign.Center, BristolVAlign.Top)
    }
    private dateToText(d: Date) {
        return `${MonthNames[d.getMonth() + 1]}-${d.getFullYear()}`
    }
    drawXAxis(frame: UIFrameResult) {
        let d = new Date(this.startTime)
        d.setDate(1)
        d.setMonth(0)
        this.brist.strokeColor(fColor.grey.base)

        this.brist.fillColor(fColor.darkMode[5])
        this.setupText()
        let units = this.getXUnits()
        let textPadding = 16
        // let textWidth = this.brist.ctx.measureText(`${units}   `).width
             console.log('xaxis', units)
        // console.log('xaxis-----------------------------')
        while (d.getTime() <= this.endTime) {
            // console.log(`XAXIS`,d.getMonth())
            let x = this.timeToX(d.getTime())
            if (x > 0) {

                this.brist.ctx.fillText(this.dateToText(d), x, frame.bottom - this.footerHeight)
                this.brist.ctx.beginPath()
                this.brist.ctx.moveTo(x, frame.top)
                this.brist.ctx.lineTo(x, frame.bottom - this.footerHeight)
                this.brist.ctx.stroke()

            }
            let months = d.getMonth() + units;
            let years = d.getFullYear() + Math.floor(months / 12)
            months = ((months) % 12)
            d.setMonth(months)
            d.setFullYear(years)

        }
    }

}

export class UILineArea extends UIElement {
    graph: UILineGraph;
    constructor(parent: UILineGraph) {
        super(UIElement.createUID('LineArea'), new UIFrame_CornerWidthHeight({ x: 0, y: 0, width: () => parent.getWidth(), height: () => parent.getHeight() - parent.footerHeight }), parent.brist)
        this.graph = parent;
    }
    get sources() {
        return this.graph.sources
    }

    valueToY(value: number, frame: UIFrameResult = null) {
        if (frame == null) { frame = this.frame.result }
        if (frame == null) { return 0 }
        return frame.top + (value.alphaInRange(this.graph.minValue, this.graph.maxValue, false).oneMinus()) * frame.height
    }
    onDrawBackground(frame: UIFrameResult, deltaTime: number): void {
        this.brist.ctx.save()
        this.brist.ctx.beginPath()
        this.brist.ctx.rect(frame.left, frame.top, frame.width, frame.height)
        this.brist.ctx.clip()
        // this.brist.fillColor(fColor.grey.lighten2)
        // this.brist.strokeColor(fColor.darkMode[5])
        // this.brist.strokeWeight(4)
        // this.brist.ctx.beginPath()
        // this.brist.rectFrame(frame, true, true)

    }
    lineHeight(u: number) {
        return (u / this.graph.heightInValue) * this.getHeight()
    }
    getYUnits() {
        let ths = this;
        let lineHeight = (u: number) => {
            return (u / ths.graph.heightInValue) * this.getHeight()
        }
        let checked = []
        for (let i = 1; i <= EnglishNumbers.Trillion * 1000; i < EnglishNumbers.Million ? (i < EnglishNumbers.Thousand ? i += 11 : i += 10) : i *= 10) {
            if (lineHeight(i) > 64) {
                // console.log(i)
                // console.log(checked)
                return i
            }
            checked.push(i)
            // console.log(`Checking ${i}`)
            // console.log(i)

        }
        return 1000000
    }
    drawYAxis(frame: UIFrameResult) {
        let units = this.getYUnits()
        let start = this.graph.minValue - this.graph.minValue % units
        this.brist.strokeColor(fColor.grey.base)
        this.brist.fontFamily('Ubuntu')
        this.brist.textSize(24)
        this.brist.fillColor(fColor.darkMode[5])
        this.brist.textAlign(BristolHAlign.Left, BristolVAlign.Bottom,)
        let textPadding = 16
        // let textWidth = this.brist.ctx.measureText(`${units}   `).width
        for (let i = Math.max(start - units, 0); i < this.graph.maxValue; i += units) {
            this.brist.ctx.fillText(i.toEnglish(), frame.left + textPadding, this.valueToY(i, frame))
            this.brist.ctx.beginPath()
            this.brist.ctx.moveTo(frame.left + textPadding, this.valueToY(i, frame))
            this.brist.ctx.lineTo(frame.right, this.valueToY(i, frame))
            this.brist.ctx.stroke()
        }
    }
    onDrawForeground(frame: UIFrameResult, deltaTime: number): void {
        this.drawYAxis(frame);

        if (this.sources) {
            this.brist.noFill()
            this.sources.forEach((data: DataChannel) => {
                this.brist.strokeColor(data.color)
                this.brist.strokeWeight(4)
                this.brist.ctx.beginPath();
                data.forRange(this.graph.startTime, this.graph.endTime, (time: number, value: number, count: number) => {
                    if (count == 0) {
                        this.brist.ctx.moveTo(this.graph.timeToX(time, frame), this.valueToY(value, frame))

                    } else {
                        this.brist.ctx.lineTo(this.graph.timeToX(time, frame), this.valueToY(value, frame))

                    }
                })
                this.brist.ctx.stroke()
            })
            this.brist.ctx.beginPath();

        } else {
            this.brist.ellipse(lerp(frame.left, frame.right, (Date.now() / 1000) % 1), frame.centerY, frame.width / 5, frame.width / 5, false, true)

        }

        this.brist.ctx.restore()
    }

}

export interface UILineHandle_Options {
    initTime: number
}
export class UILineHandle extends UIElement implements MouseDragListener, MouseMovementListener {
    frame: UIFrame_CornerWidthHeight
    graph: UILineGraph;
    constructor(options: UILineHandle_Options, graph: UILineGraph) {
        super(UIElement.createUID('LineHandle'), new UIFrame_CornerWidthHeight({ x: 0, y: 0, width: 32, height: () => graph.getHeight() }), graph.brist)
        this.graph = graph
        this.currentTime = options.initTime
        let ths = this;
        this.frame.description.x = () => {
            return graph.timeToX(ths.currentTime) - (ths.getWidth() / 2)
        }
        this.frame.containsPoint = (x: number, y: number) => {
            return (y >= ths.frame.topY() && y <= ths.frame.bottomY()) &&
                ((Math.abs(x - this.frame.centerX()) < this.lineWidth / 2) || (
                    ths.isOverTab(x, y)
                ))
        }

    }
    isOverTab(x: number, y: number) {
        return (y <= this.frame.bottomY()) && (y >= this.frame.bottomY() - this.tabHeight) && (x >= this.frame.leftX() && x <= this.frame.rightX())
    }
    mouseEnter(evt: RawPointerMoveData): boolean {
        this.brist.cursor(this.getCursor(evt.position[0], evt.position[1]))
        return true
    }


    getCursor(x: number, y: number) {
        return this.isOverTab(x, y) ? (this.isMouseTarget ? BristolCursor.grabbing : BristolCursor.grab) : BristolCursor.ewResize
    }
    get lineWidth() {
        return this.isMouseOver ? 10 : 4
    }
    mouseExit(evt: RawPointerMoveData): void {
        this.brist.cursor(BristolCursor.default)
    }
    mouseMoved(evt: RawPointerMoveData): boolean {
        this.brist.cursor(this.getCursor(evt.position[0], evt.position[1]))
        return true
    }
    isMouseOver: boolean;
    currentTime: number


    get tabHeight() {
        return this.graph.footerHeight
    }

    static buildFrameForHandle(handle: UILineHandle): UIFrame_CornerWidthHeight { return null; }
    shouldDragLock(event: RawPointerData | [start: RawPointerData, lastMove: RawPointerMoveData]): boolean {
        return true
    }

    mouseDragged(evt: RawPointerMoveData): boolean {
        this.isMouseTarget = true
        this.currentTime -= this.graph.widthInTime * (evt.delta[0] / this.graph.getWidth())
        return true;
    }
    onDragEnd(event: RawPointerData | RawPointerMoveData): boolean {
        this.isMouseTarget = false
        return true;
    }
    onDrawBackground(frame: UIFrameResult, deltaTime: number): void {
        this.brist.strokeColor(fColor.amber.darken2)
        this.brist.ctx.beginPath()
        this.brist.line(frame.centerX, frame.top, frame.centerX, frame.bottom)
        this.brist.strokeWeight(this.lineWidth)
        this.brist.ctx.stroke()

    }
    onDrawForeground(frame: UIFrameResult, deltaTime: number): void {
        this.brist.fillColor(fColor.amber.darken1)
        this.brist.ctx.beginPath()
        this.brist.roundedRect(frame.left, frame.bottom - this.tabHeight, frame.width, this.tabHeight, 8)
        this.brist.ctx.fill()
    }

}
