import React from 'react'

import { Device, ImportGoogleFont } from '../Helper'
interface Project1Root_State {
    width: number
    height: number
}
export class Project1Root extends React.Component<any, Project1Root_State> {
    constructor(props) {
        super(props)
        this.state = {
            width: window.innerWidth,
            height: window.innerHeight
        }
    }
    updateDimensions() {
        this.setState({
            width: window.innerWidth,
            height: window.innerHeight
        })
    }
    private updaterr: ()=>void = null;
    componentDidMount(): void {
        let ths = this;
        this.updaterr = ()=>{ths.updateDimensions()};
        window.addEventListener('resize', this.updaterr)
    }
    componentWillUnmount(): void {
        window.removeEventListener('resize', this.updaterr)
    }
    render() {
        switch (Device.getType()) {
            case 'phone':
                return <StudentTradingCard />
            case 'tablet':
            case 'desktop':
                return <div style={{ display: 'flex', height: '100%', backgroundColor: '#b71c1c' }}>
                    <div style={{ flexGrow: 1.5 }}></div>
                    <div style={{ flexGrow: 1 }}>
                        <StudentTradingCard />
                    </div>
                    <div style={{ flexGrow: 1.5 }}></div>
                </div>
        }
    }
}


ImportGoogleFont('Varela+Round')
export class StudentTradingCard extends React.Component {

    overHang: number = 24;
    fontSizes = {
        largeTitle: 36,
        smallTitle: 16,
        body: 16
    }
    colors = {
        lightText: [fColor.grey.lighten5.toHexString(), fColor.grey.lighten4.toHexString()]
    }
    sidePadding = 8
    interests: InterestCard_Props[] = [
        { title: 'Beverage', value: 'Coffee', image: '/project1/coffee.jpg' },
        { title: 'Cat', value: 'Cheeto', image: '/project1/cheeto.jpg' },
        { title: 'News Source', value: 'Breaking Points', image: '/project1/breakingPointsLogo.jpg' }
    ]
    render() {
        return <div style={{ backgroundColor: '#F05F5F', width: '100%', height: '100%', fontFamily: "'Varela Round', sans-serif", color: 'white', paddingBottom: `${this.sidePadding * 2}px` }}>
            <div style={{ height: 250, width: '100%', position: 'relative', backgroundSize: 'cover', backgroundImage: "url('project1/backgroundOpt.jpg')" }}>

                <div style={{ width: 256, height: 256, position: 'absolute', bottom: 0, left: '50%', transform: `translate(-50%, ${this.overHang}px)`, backgroundSize: '100%', backgroundImage: "url('project1/alanSquareOpt.jpg')", borderRadius: 24 }}>

                </div>
            </div>
            <div style={{ paddingLeft: this.sidePadding + 'px', paddingRight: this.sidePadding + 'px', marginTop: this.overHang + this.sidePadding }}>

                <div style={{ fontSize: this.fontSizes.largeTitle, textAlign: 'center', marginTop: 8, color: this.colors.lightText[0] }}>Alan Sorrill</div>
                <div style={{ fontSize: this.fontSizes.smallTitle, textAlign: 'right', color: this.colors.lightText[1] }}>About Me</div>
                <div style={{ fontSize: this.fontSizes.body, textAlign: 'left', color: this.colors.lightText[0], paddingBottom: this.sidePadding }}>
                    I'm a senior undergrad majoring in computer science.<br />
                    My hobbies include cooking and coding <a href='https://github.dev/AlanSorrill/GDSN3' className="material-icons noselect" style={{ cursor: 'pointer', color: this.colors.lightText[0], position: 'relative', top: 2, fontSize: this.fontSizes.body }}>
                        code
                    </a><br />
                    I play trumpet in the Hawkeye Marching Band.
                </div>
                <div style={{ fontSize: this.fontSizes.smallTitle, textAlign: 'right', color: this.colors.lightText[1] }}>Favorites</div>
                {this.interests.map((interest: InterestCard_Props) => (<InterestCard key={interest.title} title={interest.title} value={interest.value} image={interest.image} />))}
            </div>
        </div>
    }
}
export interface InterestCard_Props {
    image: string,
    title: string,
    value: string
}
export interface InterestCard_State { }
export class InterestCard extends React.Component<InterestCard_Props, InterestCard_State>{
    imageSize = 65
    padding = 5
    render() {
        return <div style={{ width: '100%', height: 75, backgroundColor: fColor.white.toHexString(), marginBottom: 8, borderRadius: 24, display: 'flex', boxShadow: '1px 1px 2px #111' }}>
            <div style={{ width: this.imageSize, height: this.imageSize, margin: this.padding, borderRadius: 21, backgroundPosition: '50%, 50%', backgroundSize: 'cover', backgroundImage: `url('${this.props.image }')`}} />
            <div style={{ flexGrow: 1, position: 'relative', padding: this.padding, paddingTop: this.padding * 2 }}>
                <div style={{ textAlign: 'right', position: 'absolute', top: this.padding, right: this.padding * 2, color: fColor.darkText[1].toHexString() }}>{this.props.title}</div>
                <div style={{ textAlign: 'left', position: 'absolute', left: 0, bottom: 0, color: fColor.darkText[0].toHexString(), fontSize: `${this.imageSize / 2}px` }}>{this.props.value}</div>
            </div>
        </div>
    }
}