import React from "react";
import { FColorDirectory } from "../FColor";
import { CombineCopyObjects } from "../Helper";
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
            <div style={{
                fontSize: this.bannerHeight * 0.3,
                lineHeight: `${this.bannerHeight * 0.3}px`,
                margin: this.bannerHeight * 0.2
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
        return <div style={{ overflowY: 'scroll', height: '100vh' }} className='noBar' onScroll={this.onScroll.bind(this)}>

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
    sections: Section[] = [{ name: '1995' }, { name: 'Lost' }, , { name: '2008' }, { name: '2009' }, { name: '2013' }, { name: '2015' }, { name: '2020' }]
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

    private get calcBottom() {
        if (!this.contentContainerRef.current) {
            let ths = this;
            setTimeout(() => { ths.setState({ scrollDistance: 0 }) }, 1)
            return 0;
        }
        let rect = this.contentContainerRef.current?.getBoundingClientRect()
        return (rect.bottom - window.innerHeight)
    }
    private get calcTop() {
        if (!this.contentContainerRef.current) {
            return 0;
        }
        return this.props.bannerTransition > 0 ? 0 : (this.contentContainerRef.current?.getBoundingClientRect().top) * -1 ?? 0
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
    private bannerSectionElements() {
        if(!this.bannerContainerRef.current){
            return <div>No Banner</div>
        }
        let bannerBox = this.bannerContainerRef.current.getBoundingClientRect()
        return <div>{this.sections.forMap(
            (section: Section) => (<SectionDisplay key={section?.name} sectionData={section} />), 
            0, (index: number, arr: Section[]) => (index < arr.length), 1)}</div>
    }
    render() {

        return <div style={CombineCopyObjects(this.props.style, { backgroundColor: 'purple', position: 'relative' })} ref={this.contentContainerRef} onScroll={this.onScroll.bind(this)}>
            <div style={{ width: `${(1 - this.props.bannerTransition) * 100}%`, height: this.props.timelineThickness, backgroundColor: 'red' }} ref={this.bannerContainerRef}>
                {this.bannerSectionElements()}
            </div>
            <div style={{ marginRight: this.props.timelineThickness, backgroundColor: 'green' }}>

                {this.sections.map((section: Section, index: number) => {
                    return <div key={index} >
                        <h1>{section.name}</h1>
                        <div>{this.bodyText(3)}</div>
                    </div>
                })}
            </div>
            <div style={{ position: 'absolute', top: this.calcTop, right: 0, bottom: this.calcBottom, width: this.props.timelineThickness, backgroundSize: '100% 100%', backgroundRepeat: 'no-repeat', backgroundImage: 'url("project2/test.png")' }} ref={this.timelineContainerRef}>

            </div>
            {/* <div style={{display: 'flex'}}>{this.sections.map((section: Section) => (<div>
                {section.name}
            </div>))}</div> */}
        </div>
    }
}

export interface SectionDisplay_Props {
    sectionData: Section
}
export interface SectionDisplay_State { }
export class SectionDisplay extends React.Component<SectionDisplay_Props, SectionDisplay_State>{
    render() {
        return <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ flexGrow: 1 }}></div>
            <div style={{ flexGrow: 2 }}>{this.props.sectionData?.name}</div>
            <div style={{ flexGrow: 1 }}></div>
        </div>
    }
}