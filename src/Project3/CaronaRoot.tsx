import React from "react";
import { CaronaCasesAndDeathsOverTimeRow, SodaDB, SodaDBDirectory } from "./SodaDB";
import "./RonaDB"
import { RedPillIndex } from "./RedPill/RedPillIndex";
import { BristolBoard, FColor, fColor, lerp, UIElement, UIFrameResult, UIFrame_CornerWidthHeight } from "bristolboard";
import { LineGraph } from "./LineGraph";
import { Database, DataChannel, Disease, DiseaseChannelId, DiseaseDescription, DiseaseDisplay } from "../../srcFunctions/common/WonderData/WonderDataImports";
import { Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartDataset } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export interface CaronaRoot_Props { }
export interface CaronaRoot_State {
    values: Array<CaronaCasesAndDeathsOverTimeRow>
    redPill: boolean
    diseaseDescriptions: Array<DiseaseDescription>
    // diseases: Array<[string, Disease]>
    displays: Array<[Disease, DiseaseDisplay]>
    showPopup: boolean
    agrigateData:  Array<[string, Array<[string, number, string]>]>
}

export class CaronaRoot extends React.Component<CaronaRoot_Props, CaronaRoot_State> {
    constructor(props: CaronaRoot_Props) {
        super(props);
        this.state = {agrigateData: [], values: [], redPill: false, diseaseDescriptions: [], displays: [], showPopup: false }
    }

    listenerIndex: number
    async componentDidMount() {
        if (searchParamObj['redpill'] == 'true') {
            this.setState({ redPill: true })
        }
        this.listenerIndex = database.addListener(() => {
            ths.setState({})
        })
        database.pullCdcData()

        let ths = this;
        //Promise.all([
        // database.pullPopulation(),
        // database.pullDeathsByCause()

        this.setState({ diseaseDescriptions: database.diseaseDirectory.toArrayWithKeys().sort((a, b) => (b[1].maxPerMonth - a[1].maxPerMonth)).map(i => i[1]) })
        setTimeout(() => { ths.setState({ showPopup: true }) }, 1000 + Math.random() * 1000 * 10)

    }
    componentDidUpdate(prevProps: Readonly<CaronaRoot_Props>, prevState: Readonly<CaronaRoot_State>, snapshot?: any): void {
        if (this.state.diseaseDescriptions.length != database.diseaseDirectory.size) {
            console.log(`Updating description list`)
            this.setState({ diseaseDescriptions: database.diseaseDirectory.toArrayWithKeys().sort((a, b) => (b[1].maxPerMonth - a[1].maxPerMonth)).map(i => i[1]) })
        }
    }
    componentWillUnmount(): void {
        database.removeListener(this.listenerIndex)
    }
    getDoughnutData(): ChartData<"doughnut", number[], string> {
        if (!this.state.agrigateData) {
            return {
                labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: "Stuff",
                    data: [12, 19, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)',
                    ],
                    borderWidth: 1,
                }],
            }
        }

        let labels = this.state.agrigateData.map((value: [string, [string, number, string][]]) => (value[1].map(v => (v[0])))).flat()
        return {
            labels: labels, datasets: this.state.agrigateData.map(value => ({
                label: value[0],
                data: value[1].map(v => v[1]),
                backgroundColor: value[1].map(v => v[2])
            } as ChartDataset<"doughnut", number[]>))
        } as ChartData<"doughnut", number[], string>
    }
    squareDiv: React.RefObject<HTMLDivElement> = React.createRef()
    lineGraph: React.RefObject<LineGraph> = React.createRef()
    render() {
        let ths = this;
        if (this.state.redPill) {
            return <RedPillIndex />
        }

        return <div style={{
            backgroundColor: fColor.white.toHexString(),
            color: fColor.red.lighten1.toHexString(),
            fontFamily: 'Ubuntu',
            width: '100vw', height: '100vh',
            position: 'absolute',
            top: 0, left: 0,
            display: 'flex', flexDirection: 'column',
        }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, display: this.state.showPopup ? 'flex' : 'none', flexDirection: 'column' }}>
                <div style={{ flexGrow: 1 }} />
                <div style={{ display: 'flex' }}>
                    <div style={{ flexGrow: 1 }} />
                    <div style={{ position: 'relative', zIndex: 4 }}>
                        <img style={{ width: '30vw', display: 'relative' }} src="./project3/Popup.png">

                        </img>
                        <div style={{ cursor: 'pointer', position: 'absolute', bottom: 0, left: 0, width: '50%', height: '50%' }} onClick={() => {
                            this.setState({ showPopup: false, redPill: true });
                        }}></div>
                        <div style={{ cursor: 'pointer', position: 'absolute', bottom: 0, right: 0, width: '50%', height: '50%' }} onClick={() => {
                            this.setState({ showPopup: false });
                        }}></div>
                    </div>
                    <div style={{ flexGrow: 1 }} />
                </div>
                <div style={{ flexGrow: 1 }} />
            </div>
            <div style={{ flexGrow: 2, display: 'flex', padding: 64, paddingBottom: 0, maxHeight: '40vh' }}>
                <div style={{ flexGrow: 3, display: 'flex' }}>
                    {/* <img src="./project3/NavSpinny.png" style={{height: '100%'}}/> */}
                    <div ref={ths.squareDiv} style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url("./project3/NavSpinny.png")`, height: '100%', width: ths.squareDiv.current?.clientHeight || 0 }} />
                    <DiseaseList defaultSelected={[{ icdCode: 'covid', channels: [['DeathsByAge~75-84 years', null]] }]} onChange={function (selected) {
                        ths.setState({ displays: selected })

                    }} />
                    <div style={{ flexGrow: 1 }} />
                </div>
                <div style={{ flexGrow: 2, position: 'relative' }}>

                    <div style={{ position: "absolute", right: 0, left: 0, top: 0, bottom: 0, transform: "translate(0px, -64px)" }}>
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Doughnut data={this.getDoughnutData()} style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0 }} />
                        </div>

                    </div>
                </div>
            </div>
            {/* <div style={{backgroundColor: 'purple', width: 500, height: 500}}></div> */}

            <LineGraph ref={this.lineGraph} style={{ background: 'transparent', flexGrow: 3 }} sources={this.state.displays} padding={0} onFreshAgrigate={function (agrigateData: [string, [string, number, string][]][]): void {
               ths.setState({agrigateData: agrigateData})
            } } />


        </div >
    }

}
export interface DiseaseList_Props {
    defaultSelected: Array<DiseaseDisplay>
    onChange: (selected: Array<[Disease, DiseaseDisplay]>) => void
}
export interface DiseaseList_State {
    diseases: Array<[Disease, DiseaseDisplay]>
}
export class DiseaseList extends React.Component<DiseaseList_Props, DiseaseList_State>{
    constructor(props: DiseaseList_Props) {
        super(props);
        this.state = { diseases: [] }
    }
    diseaseSearch: React.RefObject<DiseaseSearch> = React.createRef()
    diseaseSearchContainer: React.RefObject<HTMLDivElement> = React.createRef()
    scrollDiv: React.RefObject<HTMLDivElement> = React.createRef()
    get scrollerMaxHeight() {
        return (this.diseaseSearch.current ? this.diseaseSearchContainer.current.getBoundingClientRect().height - this.diseaseSearch.current.getHeight() - 64 : undefined)
    }
    componentDidUpdate(prevProps: Readonly<DiseaseList_Props>, prevState: Readonly<DiseaseList_State>, snapshot?: any): void {

    }
    removeChannel(icdCode: string, channelIndex: number) {
        let ind = this.state.diseases.findIndex((value) => (value[0].description.icdCode == icdCode))
        let dis = this.state.diseases;
        dis[ind][1].channels.splice(channelIndex)
        this.diseaseSearch?.current?.setDiseases(dis)
    }
    addChannel(icdCode: string, channelId: DiseaseChannelId) {
        let ind = this.state.diseases.findIndex((value) => (value[0].description.icdCode == icdCode))
        let dis = this.state.diseases;
        console.log(`Adding ${channelId} to `, dis[ind])
        dis[ind][1].channels.push([channelId, generateGraphColor(dis[ind][1].channels.length).toHexString()])
        this.diseaseSearch?.current?.setDiseases(dis)
    }
    render() {
        let ths = this
        return <div ref={this.diseaseSearchContainer} style={{
            padding: 32,
            // backgroundColor: fColor.grey.lighten1.toHexString(),
            border: 'solid 2px #cccccc',
            borderRadius: 4,
            minWidth: '15vw'
        }}>

            <div ref={this.scrollDiv} style={{
                overflowY: (ths.scrollDiv.current ? (ths.scrollDiv.current.clientHeight >= ths.scrollerMaxHeight ? 'scroll' : 'unset') : 'unset'),
                maxHeight: ths.scrollerMaxHeight
            }}>
                {this.state.diseases.map((disease, index) => (<DiseaseDisplayComponent key={index} forceUpdate={() => { this.props.onChange(this.state.diseases) }} disease={disease[0]} display={disease[1]} addChannel={(code, id) => { ths.addChannel(code, id) }} removeChannel={function (icdCode: string, channelIndex: number): void {
                    ths.removeChannel(icdCode, channelIndex)
                }} />))}

            </div>

            <DiseaseSearch ref={ths.diseaseSearch} defaultSelected={this.props.defaultSelected} onChange={function (selected) {
                ths.setState({ diseases: selected })
                ths.props.onChange(selected)
                console.log(`Selected`, selected)
            }} />
        </div>
    }

}
export interface DiseaseDisplayComponent_Props {
    disease: Disease
    display: DiseaseDisplay
    removeChannel(icdCode: string, channelIndex: number): void
    addChannel(icdCode: string, channelId: DiseaseChannelId): void
    forceUpdate(): void
}
export interface DiseaseDisplayComponent_State {
    showAvailable: boolean
}
export class DiseaseDisplayComponent extends React.Component<DiseaseDisplayComponent_Props, DiseaseDisplayComponent_State>{
    constructor(props: DiseaseDisplayComponent_Props) {
        super(props);
        this.state = { showAvailable: false }
    }

    render() {
        return <div>
            <div key={this.props.disease.description.icdCode} style={{ padding: 16, paddingBottom: 0, display: 'flex' }}>
                <div className="material-icons shadowOnHover noShadowOnPress" style={{
                    color: 'black', fontSize: 16, lineHeight: '16px', cursor: 'pointer',
                    width: 16, height: 16, marginRight: 16,
                    border: `solid 1px ${fColor.grey.darken2.toHexString()}`,
                    borderBottom: this.state.showAvailable ? 'none' : `solid 1px ${fColor.grey.darken2.toHexString()}`,
                    borderRadius: this.state.showAvailable ? '4px 4px 0px 0px' : 4,
                    display: 'inline-block', backgroundColor: 'white', position: 'relative'
                }} onClick={() => {

                    this.setState({ showAvailable: (!this.state.showAvailable) }, () => {
                        this.props.forceUpdate();
                    })
                }} >{this.state.showAvailable ? "close" : "add"}<div style={{
                    display: this.state.showAvailable ? 'inherit' : 'none',
                    backgroundColor: 'white',
                    position: 'absolute',
                    left: 0, right: 0, boxShadow: 'none',
                    bottom: -2, height: 4
                }} /></div>
                <div style={{ lineHeight: '16px', fontSize: 18, color: fColor.darkText[0].toHexString(), maxWidth: '15vw' }}>
                    {this.props.disease.description.technicalName}
                </div>
            </div>
            <div style={{ display: this.state.showAvailable ? 'inherit' : 'none', backgroundColor: "white", padding: 4, border: `solid 1px ${fColor.grey.darken2.toHexString()}` }}>
                {this.props.disease.getAvailableChannels().map((item) => {
                    return <div onClick={() => {
                        this.props.addChannel(this.props.disease.description.icdCode, item[0])
                        this.setState({ showAvailable: false })
                    }}>{item[0]}</div>
                })}</div>
            <div style={{ paddingTop: 16 }}>

                {this.props.display.channels.map((a, channelIndex) => (<div key={channelIndex} style={{
                    display: 'flex'
                }}><div style={{ flexGrow: 1 }} />
                    <div className="noShadowOnPress shadowOnHover noselect" style={{
                        color: fColor.white.toHexString(),
                        backgroundColor: a[1],
                        padding: 4, borderRadius: 4,
                        position: 'relative'
                    }}>
                        {a[0].replace("~", " ")}
                        <div style={{ position: 'absolute', top: 2, right: 0, bottom: 0 }}>
                            <div className="noselect material-icons textShadowOnHover noTextShadowOnPress" style={{ color: 'black', position: 'absolute', cursor: 'pointer' }} onClick={() => {
                                this.props.removeChannel(this.props.disease.description.icdCode, channelIndex)
                            }}>close</div>
                        </div>
                    </div>
                </div>))}
            </div>
        </div>
    }
}
export interface DiseaseSearch_Props {
    defaultSelected: Array<DiseaseDisplay>
    onChange: (selected: Array<[Disease, DiseaseDisplay]>) => void
}
export interface DiseaseSearch_State {
    allDiseases: Array<DiseaseDescription>,
    nameSearch: string
    showList: boolean
    selectedDiseases: Array<[Disease, DiseaseDisplay]>

    allDiseasesCount: number
    defaultCount: number
    isPullingMore: boolean
    pullProgress: number
}
export class DiseaseSearch extends React.Component<DiseaseSearch_Props, DiseaseSearch_State>{
    setDiseases(dis: [Disease, DiseaseDisplay][]) {
        this.setState({ selectedDiseases: dis })
        this.props.onChange(dis);
    }
    getHeight() {
        return this.containerRef.current ? this.containerRef.current.clientHeight : 0
    }
    constructor(props: DiseaseSearch_Props) {
        super(props);

        this.state = { pullProgress: 0, isPullingMore: false, defaultCount: 0, selectedDiseases: [], showList: false, allDiseases: [], nameSearch: '', allDiseasesCount: 0 }

    }
    resultsToJson() {
        let out = this.state.selectedDiseases.map((item: [Disease, DiseaseDisplay]) => (item[1]))
        return out;
    }
    async componentDidUpdate(prevProps: Readonly<DiseaseSearch_Props>, prevState: Readonly<DiseaseSearch_State>, snapshot?: any) {
        let allDiseases = database.diseaseDirectory.toArray()
        if (this.state.allDiseasesCount != allDiseases.length) {

            // let m = new Map(allDiseases)
            // let ths = this;
            // let selected: Array<[string, DiseaseDescription]> = this.props.defaultSelected.map((name, index) => {
            //     let d = m.get(name)
            //     d.color = ths.generateGraphColor(index)
            //     return [name, m.get(name)]
            // })
            // this.setState({ selectedDiseases: selected, defaultsLoaded: true })
            // this.props.onChange(selected)
            this.setState({ allDiseasesCount: allDiseases.length })
            if (this.state.defaultCount < this.props.defaultSelected.length) {
                console.log(`Only has ${this.state.defaultCount} of ${this.props.defaultSelected.length}`)
                let selected: Array<[Disease, DiseaseDisplay]> = []
                for (let display of this.props.defaultSelected) {
                    // let parts = codePlusChannel.split("~")
                    // let icdCode = parts[0]; 
                    // let channelId = [parts[1],parts[2]].join("~")

                    console.log(`Getting disease for ${display.icdCode}`)
                    let disease = await (database as Database).getDeathsForICD(display.icdCode)
                    if (disease == null) {
                        console.log(`Failed to get disease for ${display.icdCode}`)
                    } else {
                        console.log(`Got disease for ${display.icdCode}`)
                        for (let i = 0; i < display.channels.length; i++) {
                            if (display.channels[i][1] == null) {
                                display.channels[i][1] = generateGraphColor(i).toHexString();
                            }
                        }
                        selected.push([disease, display])
                    }
                }
                this.props.onChange(selected)
                this.setState({ defaultCount: selected.length, selectedDiseases: selected })

            }
            this.setState({ allDiseases: allDiseases, })
        }

    }
    containerRef: React.RefObject<HTMLDivElement> = React.createRef()
    render() {
        let ths = this;

        if (!this.state.showList) {
            return <div className="noselect underlineHover" style={{ textAlign: "center", cursor: 'pointer', color: fColor.darkText[1].toHexString() }} onClick={() => {
                ths.setState({ showList: true })
            }}>Add Disease</div>
        }
        return <div style={{ maxHeight: '25vh' }} ref={this.containerRef}>
            <div style={{ display: 'flex' }}>
                <input onClick={() => {
                    this.setState({ showList: true })
                }} style={{ flexGrow: 1 }} value={this.state.nameSearch} onChange={(evt) => {
                    ths.setState({ nameSearch: evt.target.value as string })
                }} />
                <span style={{ display: this.state.showList ? 'inherit' : 'none', cursor: 'pointer' }} className="material-icons noselect"
                    onClick={() => {
                        this.setState({ showList: false })
                    }}>close</span>
            </div>
            <div style={{ position: 'relative' }}>
                <div style={{
                    display: this.state.showList ? 'inherit' : 'none',
                    position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1,

                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: 8, boxShadow: "2px 2px 3px #cccccccc",//borderStyle: 'solid', borderWidth: 2,
                        maxHeight: '50vh', overflowY: 'scroll'
                    }}>
                        {this.state.allDiseases.sort((a, b) => (b.maxPerMonth - a.maxPerMonth)).limit(50).filter((disease: DiseaseDescription) => (
                            disease.technicalName.toLowerCase().includes(this.state.nameSearch.toLowerCase()) ||
                            disease.laymanName.toLowerCase().includes(this.state.nameSearch.toLowerCase())
                        )).map((description) => {
                            return <div className={fColor.grey.lighten3.hoverCssClass}
                                style={{ marginBottom: 2, maxWidth: 500, color: fColor.darkText[0].toHexString(), cursor: 'pointer' }} onClick={async () => {
                                    let list = ths.state.selectedDiseases
                                    let disease = await (database as Database).getDeathsForICD(description.icdCode)
                                    if (disease == null) {
                                        console.log(`Failed to get disease for ${description?.icdCode || JSON.stringify(description)}`)
                                    }
                                    let display: DiseaseDisplay = { channels: [], icdCode: description.icdCode }
                                    // description.color = ths.generateGraphColor(list.length)
                                    list.push([disease, display])
                                    ths.props.onChange(list)
                                    ths.setState({ selectedDiseases: list, showList: false })
                                }}>
                                <div style={{ display: 'flex' }}>
                                    <div>{description.laymanName}</div>
                                    <div style={{ flexGrow: 1 }} />
                                    {/* <div>{JSON.stringify(description)}</div> */}
                                    <div>Max per month: {description.maxPerMonth.toEnglish()}</div>
                                </div>
                                <div style={{ height: 1, backgroundColor: fColor.grey.darken2.toHexString() }} />
                            </div>
                        })}
                    </div>
                    <div style={{ display: this.state.isPullingMore ? 'inherit' : 'none', height: 16, marginLeft: 8, marginRight: 8, position: 'relative' }}>
                        <div style={{ position: 'absolute', backgroundColor: fColor.amber.base.toHexString(), top: 0, left: 0, bottom: 0, width: `${this.state.pullProgress * 100}%` }} />
                    </div>
                    <div style={{ display: 'flex', paddingTop: 16 }}>
                        <div style={{ flexGrow: 1 }} />
                        <div>{this.state.allDiseases.length}</div>
                        <div className="noselect noShadowOnPress shadowOnHover" style={{
                            padding: 8,
                            backgroundColor: fColor.red.base.toHexString(),
                            color: fColor.white.toHexString(),
                            borderRadius: 4,
                            cursor: "pointer", display: this.state.isPullingMore ? 'none' : 'inherit'
                            // boxShadow: '2px 2px 3px #333333aa'
                        }} onClick={() => {
                            this.setState({ isPullingMore: true }, () => {
                                database.pullIcdCodes(10, (completed, total) => {
                                    ths.setState({ pullProgress: (completed / total) })
                                }).then(() => {
                                    ths.setState({ isPullingMore: false })
                                })
                            })
                        }}>Pull More</div>
                    </div>
                </div>
            </div>
        </div>
    }

}
const defaultGraphColors: FColor[] = [fColor.red.lighten2, fColor.red.base, fColor.red.darken2, fColor.amber.darken2, fColor.amber.base]
function generateGraphColor(index: number) {
    if (index >= 0 && index < defaultGraphColors.length) {
        return defaultGraphColors[index]
    }
    return fColor.randomColor()
}
{/* <div style={{
    cursor: 'pointer', borderRadius: 4, overflow: 'hidden', display: 'inline', padding: 8,
    backgroundColor: fColor.red.base.toHexString(), color: fColor.white.toHexString(), fontSize: 32

}} onClick={async () => {
    //9hhd-mqs2 CDC Wonder
    //9mfq-cb36 COVID

    ths.setState({ redPill: true })
    // let consumer = window["sodaConsumer"]; 
    // let query = consumer.query().withDataset('9mfq-cb36').limit(10).getRows().on('success',
    //     (rows) => console.log(rows)).on('error',
    //         (err) => console.log(err))
}}>RedPill</div> */}