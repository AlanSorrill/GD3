import React from "react";
import { FColorDirectory } from "../FColor";
import { CombineCopyObjects, Device, ImportGoogleFont, lerp } from "../Helper";
import { ReactCanvas } from "../ReactCanvas";

import "./HistoryOfJs.css"
if (typeof fColor == 'undefined') {
    window.fColor = new FColorDirectory();
}

export type SectionType = 'JustParagraph'
export class Section {
    name: string
    render: (ths: Section) => React.ReactNode;
    titleElement: React.RefObject<HTMLHeadingElement> = React.createRef()
    constructor(name: string, render: (ths: Section) => React.ReactNode) {
        this.name = name,
            this.render = render;
    }
    scrollIntoView(){
        if(!this.titleElement.current){
            return;
        }
        this.titleElement.current.scrollIntoView({
            behavior: 'smooth'
        })
    }
}



export interface Project2Root_Props { }

export interface Project2Root_State {
    scrollAmount: number
    navTransition: number
}
ImportGoogleFont('Prompt')
export class Project2Root extends React.Component<Project2Root_Props, Project2Root_State> {
    navHeight: number = 50;
    bannerHeight: number = 200
    bannerRef: React.RefObject<HTMLDivElement>;

    contentContainerRef: React.RefObject<HTMLDivElement>;
    navContainerRef: React.RefObject<HTMLDivElement>;
    timelineContainerRef: React.RefObject<HTMLDivElement>;

    sections: Section[] = [
        new Section('1995', () => (<div>
            <div>
                The year was 1995, the web browser had only existed for 4 years. Image support was only 2 years old. A new browser, Netscape2, was in development. The goal of this new browser: an interactive web. Netscape had partnered with Sun Microsystems to embed the Java programming language in their new browser.
            </div>
            <br />
            <div>
                Java is an Object Oriented, strict typed, partially compiled language. It was selected because unlike other compiled languages, it compiles into a cross platform binary format. Unfortunately, Java would not have access to the HTML elements on the page, and would be “stuck in a box”, only able to draw in one rectangle. It’s versions were also very strict, requiring users to constantly update their Java VM. Netscape wanted a “companion” language which would glue the Java applets to the webpage. This language would be written in the same files as the HTML and CSS. They also wanted this language to have an easier learning curve than Java.
            </div>
            <br />
            <div>
                Brendan Eich was hired to implement such a language. His bosses wanted it to look like Java and be easy to learn, while Brendan was interested in functional research languages. The result was a single threaded, dynamically typed, C based, interpreted programming language. It’s operators and variable declaration looked a lot like Java, but it had support for first class functions. Its dynamic typing system had very few types: number, string, object, and function. It’s objects were essentially key-value maps with prototypical inheritance. It’s single thread operated on an asynchronous event loop. Brendan was tasked with creating this language in 10 days as Netscape was aware that Microsoft was building a browser, and they valued their first mover advantage.
            </div>
        </div>)),
        new Section('Lost Decade', () => (<div></div>)),
        new Section('2008', () => (<div></div>)),
        new Section('2009', () => (<div></div>)),
        new Section('2013', () => (<div></div>)),
        new Section('2015', () => (<div></div>)),
        new Section('2020', () => (<div></div>)),
    ]

    constructor(props: Project2Root_Props) {
        super(props);
        this.state = { scrollAmount: 0, navTransition: 1 }
        this.bannerRef = React.createRef();
        this.contentContainerRef = React.createRef();
        this.navContainerRef = React.createRef();
        this.timelineContainerRef = React.createRef();
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
        return 1 - this.state.navTransition
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
        console.log(navTransition)
        return true
    }
    private getContentWidth() {
        return Device.switch(this.col10, this.col12, this.col12);
    }
    render(): React.ReactNode {
        return <div style={{ overflowY: 'scroll', height: '100vh', fontFamily: 'Prompt', backgroundColor: fColor.green.darken4.toHexString() }} className='noBar' onScroll={this.onScroll.bind(this)}>

            {this.banner()}


            <div style={{ display: 'flex' }}>





                <div style={{ width: this.getContentWidth(), position: 'relative', height: this.navHeight }} ref={this.contentContainerRef} onScroll={this.onScroll.bind(this)}>
                    <div style={{ height: this.navHeight, position: 'relative', width: this.getContentWidth() }} ref={this.navContainerRef}>

                        <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: this.navHeight }}>
                            <div style={{ position: 'relative', width: this.getContentWidth(), height: '100%', overflowX: 'hidden', zIndex: 2 }}>
                                {this.calcNavPositions()[0].map((value: [section: Section, pos: number, width: number]) => (

                                    <SectionDisplay key={`${value[0].name} `} sectionData={value[0]} style={{
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

                    <div style={{ marginLeft: (Device.isTabletOrPhone() ? 0 : this.col1), marginRight: (Device.isTabletOrPhone() ? this.navHeight : 0) }}>

                        {this.sections.map((section: Section, index: number) => {
                            return <div key={index} >
                                <h1 style={{ color: fColor.green.lighten4.toHexString() }} ref={section.titleElement} >{section.name}</h1>
                                {section.render(section)}
                                {/* <div style={{ padding: 16, backgroundColor: fColor.green.lighten2.toHexString() }}>{this.bodyText(3)}</div> */}
                                <br style={{ height: this.col1 }} />
                            </div>
                        })}
                    </div>
                    <div style={{ position: 'fixed', top: this.calcTop, right: 0, bottom: 0, width: this.navHeight, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat' }} >
                        {/* // backgroundImage: 'url("project2/test.png")' */}
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <div style={{ position: 'relative', transform: 'rotate(90deg) translate(0px, -100%)', overflowX: 'hidden', transformOrigin: 'top left', height: this.navHeight, width: window.innerHeight - this.calcTop }} ref={this.timelineContainerRef}>

                                {this.calcNavPositions()[1].map((value: [section: Section, pos: number, width: number]) => (

                                    <SectionDisplay  key={`${value[0].name}`} sectionData={value[0]} style={{
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

        </div >
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
    style: React.CSSProperties
}
export interface SectionDisplay_State { }
export class SectionDisplay extends React.Component<SectionDisplay_Props, SectionDisplay_State>{


    render() {
        return <div onClick={()=>{this.props.sectionData.scrollIntoView()}} className={fColor.amber.base.hoverCssClass} style={CombineCopyObjects({ display: 'flex', cursor: 'pointer', flexDirection: 'column', flexGrow: 1, width: '100%', height: '100%', backgroundColor: fColor.green.lighten1.toHexString() }, this.props.style)}>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ textAlign: 'center', verticalAlign: 'middle' }}>{this.props.sectionData?.name}</div>
            <div style={{ flexGrow: 1 }}></div>
        </div>
    }
}