import React from "react";
import { FColorDirectory } from "../FColor";
import { CombineCopyObjects, ImportGoogleFont, lerp } from "../Helper";
import { ReactCanvas } from "../ReactCanvas";
import "./HistoryOfJs.css"
if (typeof fColor == 'undefined') {
    window.fColor = new FColorDirectory();
}
export interface Section {
    name: string

}
export interface Project2Root_Props { }

export interface Project2Root_State {
    scrollAmount: number
    bannerTransition: number
}
ImportGoogleFont('Prompt')
export class Project2Root extends React.Component<Project2Root_Props, Project2Root_State> {
    bannerHeight: number = 200;
    bannerRef: React.RefObject<HTMLDivElement>;


    constructor(props: Project2Root_Props) {
        super(props);
        this.state = { scrollAmount: 0, bannerTransition: 1 }
        this.bannerRef = React.createRef();
    }

    get columnWidth() {
        return document.body.clientWidth / 12
    }

    banner() {
        return <div ref={this.bannerRef} style={{ height: this.bannerHeight, backgroundImage: 'url("project2/greenStripeBackground.png")', display: 'flex', position: 'relative' }}>
            {/* <ReactCanvas draw={function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ff0000'
                ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2)
            }} style={{position: 'absolute', width: '100%', height: '100%'}}/> */}
            <div style={{
                fontSize: this.bannerHeight * 0.3,
                lineHeight: `${this.bannerHeight * 0.3}px`,
                margin: this.bannerHeight * 0.2,
                color: fColor.green.darken4.toHexString()
            }}>History of<br />Javascript</div>
            <img src='project2\brendanEich02.png' style={{ position: 'absolute', right: 0, height: this.bannerHeight }}></img>
        </div>

    }


    onScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
        let clientRect = this.bannerRef.current.getBoundingClientRect();
        let bannerTransition = Math.max(0, clientRect.bottom / clientRect.height)
        this.setState({ scrollAmount: 0, bannerTransition: bannerTransition })
        console.log(bannerTransition)
        return true
    }
    render(): React.ReactNode {
        return <div style={{ overflowY: 'scroll', height: '100vh', fontFamily: 'Prompt', backgroundColor: fColor.green.darken4.toHexString() }} className='noBar' onScroll={this.onScroll.bind(this)}>

            {this.banner()}


            <div style={{ display: 'flex' }}>

                <div style={{ flexGrow: 1 }}></div>

                <HistoryOfJSContent timelineThickness={this.columnWidth * 0.4} style={{ width: this.columnWidth * 8 }} bannerTransition={this.state.bannerTransition} />

                <div style={{ flexGrow: 1 }}></div>
            </div>

        </div >
    }
}
export interface HistoryOfJSContent_State {
    scrollDistance: number
    scrollAlpha: number
}
export interface HistoryOfJSContent_Props {
    style: React.CSSProperties
    timelineThickness: number
    bannerTransition: number
}
export class HistoryOfJSContent extends React.Component<HistoryOfJSContent_Props, HistoryOfJSContent_State> {
    sections: Section[] = [{ name: '1995' }, { name: 'Lost Decade' }, { name: '2008' }, { name: '2009' }, { name: '2013' }, { name: '2015' }, { name: '2020' }]
    contentContainerRef: React.RefObject<HTMLDivElement>;
    bannerContainerRef: React.RefObject<HTMLDivElement>;
    timelineContainerRef: React.RefObject<HTMLDivElement>;


    bodyText(count: number = 8) {
        let out = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        while (count > 0) {
            out = `${out} ${out}`
            count--;
        }
        return out;
    }

    constructor(props: HistoryOfJSContent_Props) {
        super(props);
        this.state = {
            scrollAlpha: 0,
            scrollDistance: 0
        }
        this.contentContainerRef = React.createRef();
        this.bannerContainerRef = React.createRef();
        this.timelineContainerRef = React.createRef();
    }

    onScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
        let clientRect = this.contentContainerRef.current.getBoundingClientRect();
        let scrollDistance = clientRect.top
        //this.setState({ scrollDistance: 0, bannerTransition: bannerTransition })
        console.log('scrollDistance: ', scrollDistance)
    }


    private get calcTop() {
        if (!this.contentContainerRef.current) {
            return 0;
        }
        return Math.max(0, (this.contentContainerRef.current?.getBoundingClientRect().top))
    }
    private get calcHeight() {

        if (!this.contentContainerRef.current) {
            return 0;
        }
        let rect = this.contentContainerRef.current?.getBoundingClientRect()
        if (rect.top > 0) {
            return window.innerHeight - rect.top
        }
        return window.innerHeight
    }
    private calcSectionPositions(): [Array<[section: Section, pos: number, width: number]>, Array<[section: Section, pos: number, width: number]>] {
        if (!this.bannerContainerRef.current) {
            return [[], []]
        }
        let bannerBox = this.bannerContainerRef.current.getBoundingClientRect()
        let bannerWidth = bannerBox.width;
        let aWidth = (bannerWidth - this.props.timelineThickness) / this.sections.length

        let timelineBox = this.timelineContainerRef.current.getBoundingClientRect();
        let timelineWidth = timelineBox.height

        let bWidth = (timelineWidth) / this.sections.length

        let bannerOut: Array<[section: Section, pos: number, width: number]> = []
        let timelineOut: Array<[section: Section, pos: number, width: number]> = []
        for (let i = 0; i < this.sections.length; i++) {
            let startPos = i * aWidth;
            let endPos = bannerBox.width + i * bWidth
            let width = lerp(aWidth, bWidth, this.alpha);
            let p = lerp(startPos, endPos, this.alpha)
             if (p > bannerWidth) {
                //in timeline
                timelineOut.push([this.sections[i], p - bannerWidth + (this.props.timelineThickness * (1-this.alpha)), width])
            } else if (p + width > bannerWidth) {
                //crossing
                timelineOut.push([this.sections[i], p - bannerWidth + (this.props.timelineThickness * (1-this.alpha)), width])
                bannerOut.push([this.sections[i], p, width])
            }  else {
                //in banner
                bannerOut.push([this.sections[i], p, width])
            }
        }
        return [bannerOut, timelineOut]
        // return 
    }
    // private buildBannerSections() {
    //     return <div style={{ position: 'relative', height: this.props.timelineThickness }}>{this.sections.forMap(
    //         (section: Section, index: number) => (),
    //         0, (index: number, arr: Section[]) => (index < arr.length), 1)}</div>
    // }
    private calcLeft() {
        if (!this.contentContainerRef.current) {
            let ths = this;
            setTimeout(() => { ths.setState({ scrollDistance: 0 }) }, 1)
            return 0;
        }
        let rect = this.contentContainerRef.current?.getBoundingClientRect();
        return rect.right - this.props.timelineThickness
    }

    private get alpha() {
        return 1 - this.props.bannerTransition
    }
    render() {

        return <div style={CombineCopyObjects(this.props.style, { position: 'relative', height: this.props.timelineThickness })} ref={this.contentContainerRef} onScroll={this.onScroll.bind(this)}>
            <div style={{ height: this.props.timelineThickness, position: 'relative' }} ref={this.bannerContainerRef}>
                <div style={{ width: `${(this.alpha) * 100}%`, height: this.props.timelineThickness }}></div>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: this.props.timelineThickness }}>
                    <div style={{ position: 'relative', width: '100%', height: '100%', overflowX: 'hidden', zIndex: 2 }}>
                        {this.calcSectionPositions()[0].map((value: [section: Section, pos: number, width: number]) => (

                            <SectionDisplay key={`${value[0].name} ${value[1]}`} sectionData={value[0]} style={{
                                position: 'absolute',
                                width: value[2],
                                left: value[1],
                                top: 0,
                                bottom: 0
                            }} />

                        ))
                        }
                    </div>
                </div>
            </div>
            <div style={{ marginRight: this.props.timelineThickness,  }}>

                {this.sections.map((section: Section, index: number) => {
                    return <div key={index} >
                        <h1 style={{color: fColor.green.lighten4.toHexString()}}>{section.name}</h1>
                        <div>{this.bodyText(3)}</div>
                    </div>
                })}
            </div>
            <div style={{ position: 'fixed', top: this.calcTop, left: this.calcLeft(), bottom: 0, width: this.props.timelineThickness, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} >
                {/* // backgroundImage: 'url("project2/test.png")' */}
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <div style={{ position: 'relative', transform: 'rotate(90deg) translate(0px, -100%)', overflowX: 'hidden', transformOrigin: 'top left', height: this.props.timelineThickness, width: window.innerHeight - this.calcTop }} ref={this.timelineContainerRef}>

                        {this.calcSectionPositions()[1].map((value: [section: Section, pos: number, width: number]) => (

                            <SectionDisplay key={`${value[0].name} ${value[1]}`} sectionData={value[0]} style={{
                                position: 'absolute',
                                width: value[2],
                                left: value[1],
                                top: 0,
                                bottom: 0
                            }} />

                        ))
                        }
                    </div>
                </div>
            </div>
        </div>
        {/* <div style={{display: 'flex'}}>{this.sections.map((section: Section) => (<div>
                {section.name}
            </div>))}</div> */}

    }
}

export interface SectionDisplay_Props {
    sectionData: Section
    style: React.CSSProperties
}
export interface SectionDisplay_State { }
export class SectionDisplay extends React.Component<SectionDisplay_Props, SectionDisplay_State>{

    ref: React.RefObject<HTMLDivElement> = React.createRef();
    getTextSize() {
        if (!this.ref.current) {
            return 24
        }
        return Math.min(this.ref.current.getBoundingClientRect().height,this.ref.current.getBoundingClientRect().width) / 3;
    }
    render() {
        return <div ref={this.ref} style={CombineCopyObjects({ display: 'flex', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%', backgroundColor: fColor.green.lighten1.toHexString() }, this.props.style)}>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ textAlign: 'center', verticalAlign: 'middle', lineHeight: `${this.getTextSize()}px`, fontSize: this.getTextSize() }}>{this.props.sectionData?.name}</div>
            <div style={{ flexGrow: 1 }}></div>
        </div>
    }
}