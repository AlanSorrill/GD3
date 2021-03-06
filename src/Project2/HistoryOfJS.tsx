import React from "react";
import { Examples_Section } from "./Sections/Examples_Section";

import { CombineCopyObjects, Device, DeviceType, getCookie, ImportGoogleFont, lerp, lerpTuple, Orientation, setCookie } from "../Helper";
import { ReactCanvas } from "../ReactCanvas";

import "./HistoryOfJs.css"
import { Http_Section, Jit_Section, MakeEcmaGreatAgain_Section, Node_Section, Section, Section_Prehistoric, Standardization_Section } from "./Imports_Project2";
import { ensureFColor, FColor, fColor } from "bristolboard";
ensureFColor()




ImportGoogleFont('Prompt')
ImportGoogleFont('Roboto+Mono')

export interface Project2Root_Props { }

export interface Project2Root_State {
    scrollAmount: number
    navTransition: number

    dragLastX: number
    dragLastY: number
    isDragging: boolean

    orientation: Orientation,
    deviceType: DeviceType
}
export class Project2Root extends React.Component<Project2Root_Props, Project2Root_State> {
    navHeight: number = 50;
    bannerHeight: number = 200
    bannerRef: React.RefObject<HTMLDivElement>;

    contentContainerRef: React.RefObject<HTMLDivElement>;
    navContainerRef: React.RefObject<HTMLDivElement>;
    timelineContainerRef: React.RefObject<HTMLDivElement>;


    sections: [Section_Prehistoric, Http_Section, Examples_Section, Standardization_Section, Jit_Section, Node_Section, MakeEcmaGreatAgain_Section]

    constructor(props: Project2Root_Props) {
        super(props);
        this.sections = [
            new Section_Prehistoric(this),
            new Http_Section(this),
            new Examples_Section(this),
            new Standardization_Section(this),
            new Jit_Section(this),

            new Node_Section(this),
            new MakeEcmaGreatAgain_Section(this)
        ]
        this.sections.forEach(((section: Section, index: number) => { section.index = index }))
        this.state = { scrollAmount: 0, navTransition: 1, dragLastX: -1, dragLastY: -1, isDragging: false, orientation: Device.getOrientation(), deviceType: Device.getType() }
        this.bannerRef = React.createRef();
        this.contentContainerRef = React.createRef();
        this.navContainerRef = React.createRef();
        this.timelineContainerRef = React.createRef();
    }



    get currentSection() {
        if (!this.bannerRef.current) {
            return 0
        }
        let boundBox = this.bannerRef.current.getBoundingClientRect()
        if (boundBox.bottom > 0) {
            return 0 - ((boundBox.bottom / boundBox.height))
        }
        for (let i = 0; i < this.sections.length; i++) {
            if (!this.sections[i].containerElement.current) {
                return -1;//shouldn't happen
            }
            boundBox = this.sections[i].containerElement.current.getBoundingClientRect();
            if (boundBox.bottom > 0) {
                return (1 - boundBox.bottom / boundBox.height).clamp(0, 1) + i
            }
        }


    }

    get col12() {
        return window.innerWidth
    }
    get col11() {
        return this.col12 - this.col1
    }
    get col10() {
        return this.col12 - this.col2;
    }
    get col9() {
        return this.col6 + this.col3
    }
    get col8() {
        return this.col6 + this.col2;
    }
    get col7() {
        return this.col6 + this.col1;
    }
    get col6() {
        return window.innerWidth / 2
    }
    get col4() {
        return window.innerWidth / 3
    }
    get col3() {
        return window.innerWidth / 4
    }
    get col2() {
        return window.innerWidth / 6;
    }
    get col1() {
        return window.innerWidth / 12.0
    }

    private get calcTop() {
        if (!this.contentContainerRef.current) {
            let ths = this;
            setTimeout(() => { ths.setState({ scrollAmount: 0 }) }, 1)
            return 0;
        }
        return Math.max(0, (this.contentContainerRef.current?.getBoundingClientRect().top))
    }
    private calcNavPositions(): [Array<[section: Section, pos: number, width: number]>, Array<[section: Section, pos: number, width: number]>] {
        if (!this.navContainerRef.current) {
            return [[], []]
        }
        let navBox = this.navContainerRef.current.getBoundingClientRect()
        let navWidth = navBox.width;
        let aWidth = (navWidth - this.navHeight) / this.sections.length

        let timelineBox = this.timelineContainerRef.current.getBoundingClientRect();
        let timelineWidth = timelineBox.height

        let bWidth = (timelineWidth) / this.sections.length

        let bannerOut: Array<[section: Section, pos: number, width: number]> = []
        let timelineOut: Array<[section: Section, pos: number, width: number]> = []
        for (let i = 0; i < this.sections.length; i++) {
            let startPos = i * aWidth;
            let endPos = navBox.width + i * bWidth
            let width = lerp(aWidth, bWidth, this.alpha);
            let p = lerp(startPos, endPos, this.alpha)
            if (p > navWidth) {
                //in timeline
                timelineOut.push([this.sections[i], p - navWidth + (this.navHeight * (1 - this.alpha)), width])
            } else if (p + width > navWidth) {
                //crossing
                timelineOut.push([this.sections[i], p - navWidth + (this.navHeight * (1 - this.alpha)), width])
                bannerOut.push([this.sections[i], p, width])
            } else {
                //in banner
                bannerOut.push([this.sections[i], p, width])
            }
        }
        return [bannerOut, timelineOut]
        // return 
    }


    private get alpha() {
        if (this.sections[0].containerElement.current) {
            // let rect = this.sections[0].containerElement.current.getBoundingClientRect()
            return this.sections[0].getNavToSideAlpha();
            let navAlpha = this.currentSection.alphaInRange(0.95, 1, true)
            // console.log(navAlpha);
            return navAlpha;
            // return 1 - (rect.bottom / window.innerHeight).clamp(0, 1)
        }
        return 0
    }
    getTextSize() {
        return this.navHeight / 3
    }

    banner() {
        return <div ref={this.bannerRef} style={{ height: this.bannerHeight, zIndex: 100, backgroundImage: 'url("project2/greenStripeBackground.png")', display: 'flex', position: 'relative' }}>
            {/* <ReactCanvas draw={function (ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement): void {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.fillStyle = '#ff0000'
                ctx.fillRect(0, 0, canvas.width / 2, canvas.height / 2)
            }} style={{position: 'absolute', width: '100%', height: '100%'}}/> */}
            <div style={{
                fontSize: this.bannerHeight * 0.3,
                lineHeight: `${this.bannerHeight * 0.3}px`,
                margin: this.bannerHeight * 0.2,
                color: fColor.green.darken4.toHexString(),
                WebkitTextStrokeColor: fColor.green.base.toHexString(),
                WebkitTextStrokeWidth: 2
            }}>History of<br />Javascript</div>
            <img src='project2\brendanEich02.png' style={{ position: 'absolute', right: 0, height: this.bannerHeight }}></img>
        </div>

    }


    onScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
        let clientRect = this.bannerRef.current.getBoundingClientRect();
        let navTransition = Math.max(0, clientRect.bottom / clientRect.height)
        this.setState({ scrollAmount: 0, navTransition: navTransition })
        if (this.mainContainerRef.current && this.autoScrolled) {
            // console.log(`Saving scroll as ${this.mainContainerRef.current.scrollTop}`)
            setCookie('scrollAmount', this.mainContainerRef.current.scrollTop)
        }
        // console.log('SCROLL')
        // console.log(navTransition)
        return true
    }

    getNavOffset() {
        if (!this.bannerRef.current) {
            return 0
        }
        let rect = this.bannerRef.current.getBoundingClientRect()
        if (rect.bottom < 0) {
            return 0;
        }
        return rect.top + rect.height;
    }

    mainContainerRef: React.RefObject<HTMLDivElement> = React.createRef();
    render(): React.ReactNode {
        let currentSectionAlpha = this.currentSection;
        if (typeof currentSectionAlpha != 'number') {
            currentSectionAlpha = 0;
        }
        return <div ref={this.mainContainerRef} style={{ overflowY: 'scroll', overflowX: 'hidden', height: '100vh', width: '100vw', fontFamily: 'Prompt', }} className='noBar' onScroll={this.onScroll.bind(this)}>



            {this.banner()}


            <div style={{ display: 'flex' }}>





                <div style={{ width: this.col12, position: 'relative', height: this.navHeight }} ref={this.contentContainerRef} onScroll={this.onScroll.bind(this)}>
                    <div style={{ height: this.navHeight, position: 'relative', width: this.col12 }} ref={this.navContainerRef}>

                        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: this.navHeight }}>
                            <div style={{ position: 'fixed', width: this.col12, height: this.navHeight, top: this.getNavOffset(), overflowX: 'hidden', zIndex: 2 }}>
                                {this.calcNavPositions()[0].map((value: [section: Section, pos: number, width: number]) => (

                                    <SectionDisplay key={`${value[0].name} `} currentSection={currentSectionAlpha} sectionData={value[0]} style={{
                                        position: 'absolute',
                                        lineHeight: `${this.getTextSize()}px`,
                                        fontSize: this.getTextSize(),
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

                    <div style={{ position: 'relative', top: 0 - this.navHeight, backgroundColor: fColor.black.toHexString() }}>

                        {this.sections.map((section: Section, index: number) => {
                            return <div key={index} ref={section.containerElement}  >
                                {/* <h1 style={{ color: fColor.green.lighten4.toHexString() }} ref={section.titleElement} >{section.name}</h1> */}
                                {section.render(currentSectionAlpha)}
                                {/* <div style={{ padding: 16, backgroundColor: fColor.green.lighten2.toHexString() }}>{this.bodyText(3)}</div> */}
                                {/* <br style={{ height: this.col1 }} /> */}
                            </div>
                        })}
                        <div style={{
                            display: 'flex'
                        }}>
                            <div style={{
                                width: '50%',
                                textAlign: "left",
                                padding: Device.switch({ desktopHorizontal: 64, phoneHorizontal: 8 }),
                                color: fColor.white.toHexString()
                            }}>
                                Sources:<br />
                                <a href="https://www.youtube.com/watch?v=krB0enBeSiE">Interview with Brendan Eich</a><br />
                                <a href="https://www.w3schools.com/js/js_history.asp">Timeline of Versions</a>
                            </div>
                            <div style={{ flexGrow: 1 }}></div>
                        </div>
                    </div>
                    <div style={{ position: 'fixed', top: this.calcTop, right: 0, bottom: 0, width: this.navHeight, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} >
                        {/* // backgroundImage: 'url("project2/test.png")' */}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <div style={{ position: 'relative', transform: 'rotate(90deg) translate(0px, -100%)', overflowX: 'hidden', transformOrigin: 'top left', height: this.navHeight, width: window.innerHeight - this.calcTop }} ref={this.timelineContainerRef}>

                                {this.calcNavPositions()[1].map((value: [section: Section, pos: number, width: number]) => (

                                    <SectionDisplay key={`${value[0].name}`} currentSection={currentSectionAlpha} sectionData={value[0]} style={{
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

                {/* {Device.isPhone ? null : <div style={{ width: this.col1 }}></div>} */}
            </div>

            {/* <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 1000, backgroundColor: fColor.darkMode[3].toHexString(), color: fColor.lightText[1].toHexString() }}>{currentSectionAlpha.toFixed(2)}</div> */}
        </div >
    }

    autoScrolled: boolean = false
    componentDidMount(): void {
        // this.mainContainerRef.current.addEventListener('scroll',(evt)=>{console.log(evt)})
        let scrollCookie = getCookie('scrollAmount');
        let scroll = Number(scrollCookie == null ? 0 : scrollCookie)
        console.log(`Auto Scrolling to ${scrollCookie}`)
        let ths = this;
        setTimeout(() => { ths.mainContainerRef.current.scrollTo(0, scroll); }, 500)
        this.autoScrolled = true;
        window.addEventListener('mousewheel', (evt: any) => {
            ths.addScroll(evt.deltaY)
        })
        window.addEventListener('touchstart', (evt) => {
            ths.onPanStart(evt);
        })
        window.addEventListener('dragstart', (evt) => {
            ths.onPanStart(evt);
        });
        window.addEventListener('touchend', (evt) => {
            ths.onPanEnd(evt);
        })
        window.addEventListener('dragend', (evt) => {
            ths.onPanEnd(evt);
        });
        window.addEventListener('drag', (evt) => {
            ths.onPan(evt);
        });
        window.addEventListener('touchmove', (evt) => {
            ths.onPan(evt);
        });

        window.addEventListener('resize', (evt) => {
            ths.onResize(evt)
        })
    }
    private onResize(evt: UIEvent) {

        console.log(Device.getTypeAndOrientation())
        this.setState({ orientation: Device.getOrientation(), deviceType: Device.getType() })
    }
    private onPanStart(evt: TouchEvent | DragEvent | Touch) {
        if (evt instanceof DragEvent || evt instanceof Touch) {
            this.setState({ dragLastX: evt.clientX, dragLastY: evt.clientY, isDragging: true })

        } else {
            this.onPanStart(evt.touches[0]);

        }
    }
    private onPan(evt: TouchEvent | DragEvent | Touch) {
        if (evt instanceof DragEvent || evt instanceof Touch) {
            let deltaX = evt.clientX - this.state.dragLastX
            let deltaY = (evt.clientY - this.state.dragLastY) * -1
            //  console.log(`Pan ${deltaX}, ${deltaY}`)
            this.setState({ dragLastX: evt.clientX, dragLastY: evt.clientY, isDragging: true })
            this.addScroll(deltaY);

        } else {
            this.onPan(evt.touches[0]);

        }
    }
    private onPanEnd(evt: TouchEvent | DragEvent) {
        if (evt instanceof DragEvent) {
            evt.clientX
        }
    }
    private addScroll(amount: number) {
        if (this.mainContainerRef.current) {
            // console.log(`Synthetic scrollby ${amount}`)
            this.mainContainerRef.current.scrollBy(0, amount)
        }
    }
    bodyText(count: number = 8) {
        let out = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
        while (count > 0) {
            out = `${out} ${out}`
            count--;
        }
        return out;
    }
}
export interface HistoryOfJSContent_State {
    scrollDistance: number
    scrollAlpha: number
}
export interface HistoryOfJSContent_Props {
    style: React.CSSProperties
    timelineThickness: number
    navTransition: number
}
export class HistoryOfJSContent extends React.Component<HistoryOfJSContent_Props, HistoryOfJSContent_State> {





    constructor(props: HistoryOfJSContent_Props) {
        super(props);
        this.state = {
            scrollAlpha: 0,
            scrollDistance: 0
        }

    }

    // onScroll(event: React.UIEvent<HTMLDivElement, UIEvent>) {
    //     let clientRect = this.contentContainerRef.current.getBoundingClientRect();
    //     let scrollDistance = clientRect.top
    //     //this.setState({ scrollDistance: 0, bannerTransition: bannerTransition })
    //     console.log('scrollDistance: ', scrollDistance)
    // }






}

export interface SectionDisplay_Props {
    sectionData: Section
    currentSection: number
    style: React.CSSProperties
}
export interface SectionDisplay_State { }
export class SectionDisplay extends React.Component<SectionDisplay_Props, SectionDisplay_State>{

    getBgColor() {
        let start = fColor.green.lighten1.toHsv()
        let end = fColor.lightText[0].toHsv();
        return FColor.hsvToRgbString(lerpTuple(start, end, this.props.currentSection.alphaInRange(-1, 0, true), ['start', 'startToEnd', 'start']))
    }
    getFgColor() {
        return fColor.lightText[1].toHexString()
    }

    render() {
        return <div onClick={() => { this.props.sectionData.scrollIntoView() }}
            style={CombineCopyObjects({
                flexGrow: 1,
                position: 'relative',
                width: '100%',
                height: '100%',
            }, this.props.style)}>

            <div style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                cursor: 'pointer',
                flexDirection: 'column',
                position: 'relative',


            }}>

                <div style={{
                    position: 'absolute',
                    left: this.props.sectionData.index == 0 ? 0 : 16,
                    right: 0, top: 0, bottom: 0,
                    backgroundColor: this.getBgColor(),
                }} className={fColor.amber.base.hoverCssClass}></div>

                <div style={{
                    position: 'absolute',
                    left: this.props.sectionData.index == 0 ? 0 : 16,
                    top: 0,
                    bottom: 0,
                    width: `${(this.props.currentSection - this.props.sectionData.index).clamp(0, 1) * 100}%`,
                    backgroundColor: this.getFgColor()
                }} className={fColor.amber.lighten2.hoverCssClass}></div>
                <div style={{ flexGrow: 1 }}></div>
                <div style={{ textAlign: 'center', verticalAlign: 'middle', zIndex: 3 }}>{this.props.sectionData?.name}</div>
                <div style={{ flexGrow: 1 }}></div>
            </div>
        </div>
    }
}