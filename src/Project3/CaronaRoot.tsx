import React from "react";
import { CaronaCasesAndDeathsOverTimeRow, SodaDB, SodaDBDirectory } from "./SodaDB";
import "./RonaDB"
import { RedPillIndex } from "./RedPill/RedPillIndex";
import { BristolBoard, FColor, fColor, lerp, UIElement, UIFrameResult, UIFrame_CornerWidthHeight } from "bristolboard";
import { LineGraph } from "./LineGraph";
import { Database, DataChannel, Disease, DiseaseDescription, DiseaseDisplay } from "../../srcFunctions/common/WonderData/WonderDataImports";


export interface CaronaRoot_Props { }
export interface CaronaRoot_State {
    values: Array<CaronaCasesAndDeathsOverTimeRow>
    redPill: boolean
    diseaseDescriptions: Array<DiseaseDescription>
    // diseases: Array<[string, Disease]>
    displays: Array<[Disease, DiseaseDisplay]>
}
export class CaronaRoot extends React.Component<CaronaRoot_Props, CaronaRoot_State> {
    constructor(props: CaronaRoot_Props) {
        super(props);
        this.state = { values: [], redPill: false, diseaseDescriptions: [], displays: [] }
    }

    listenerIndex: number
    async componentDidMount() {
        if (searchParamObj['redpill'] == 'true') {
            this.setState({ redPill: true })
        }
        this.listenerIndex = database.addListener(() => {
            ths.setState({})
        })

        let ths = this;
        //Promise.all([
        // database.pullPopulation(),
        // database.pullDeathsByCause()

        this.setState({ diseaseDescriptions: database.diseaseDirectory.toArrayWithKeys().sort((a, b) => (b[1].maxPerMonth - a[1].maxPerMonth)).map(i => i[1]) })


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

    squareDiv: React.RefObject<HTMLDivElement> = React.createRef()
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
            <div style={{ flexGrow: 2, display: 'flex', padding: 64, paddingBottom: 0, maxHeight: '40vh' }}>
                <div style={{ flexGrow: 3, display: 'flex' }}>
                    {/* <img src="./project3/NavSpinny.png" style={{height: '100%'}}/> */}
                    <div ref={ths.squareDiv} style={{ backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url("./project3/NavSpinny.png")`, height: '100%', width: ths.squareDiv.current?.clientHeight || 0 }} />
                    <DiseaseList defaultSelected={['A02.1']} onChange={function (selected) {
                        ths.setState({ displays: selected })
                    }} />
                    <div style={{ flexGrow: 1 }} />
                </div>
                <div style={{ flexGrow: 2, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url("./project3/tempChart.PNG")` }} />
            </div>
            {/* <div style={{backgroundColor: 'purple', width: 500, height: 500}}></div> */}

            <LineGraph style={{ background: 'transparent', flexGrow: 3 }} sources={this.state.displays} padding={0} />


        </div >
    }

}
export interface DiseaseList_Props {
    defaultSelected: Array<string>
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
    render() {
        let ths = this
        return <div ref={this.diseaseSearchContainer} style={{
            padding: 32,
            backgroundColor: fColor.grey.lighten2.toHexString(),
            minWidth: '15vw'
        }}>

            <div ref={this.scrollDiv} style={{
                overflowY: (ths.scrollDiv.current ? (ths.scrollDiv.current.clientHeight >= ths.scrollerMaxHeight ? 'scroll' : 'unset') : 'unset'),
                maxHeight: ths.scrollerMaxHeight
            }}>
                {this.state.diseases.map((disease, index) => {
                    return <div>
                        <div key={disease[0].description.icdCode} style={{ padding: 16, display: 'flex' }}>
                            <div style={{
                                width: 16, height: 16, marginRight: 16,
                                borderStyle: 'solid', borderWidth: 1, borderColor: fColor.grey.darken2.toHexString(), borderRadius: 4,
                                display: 'inline-block', backgroundColor: disease[1].channels[0]?.[1]
                            }} />
                            <div style={{ lineHeight: '16px', fontSize: 18, color: fColor.darkText[0].toHexString(), maxWidth: '15vw' }}>{disease[0].description.technicalName}</div>
                        </div>
                        <div>
                            {disease[0].getAvailableChannels().map(a => (<div>{a[0]}</div>))}
                        </div>
                    </div>
                })}

            </div>

            <DiseaseSearch ref={ths.diseaseSearch} defaultSelectedICD={this.props.defaultSelected} onChange={function (selected) {
                ths.setState({ diseases: selected })
                ths.props.onChange(selected)
                console.log(`Selected`, selected)
            }} />
        </div>
    }

}
export interface DiseaseSearch_Props {
    defaultSelectedICD: Array<string>
    onChange: (selected: Array<[Disease, DiseaseDisplay]>) => void
}
export interface DiseaseSearch_State {
    allDiseases: Array<DiseaseDescription>,
    nameSearch: string
    showList: boolean
    selectedDiseases: Array<[Disease, DiseaseDisplay]>

    defaultsLoaded: boolean
}
export class DiseaseSearch extends React.Component<DiseaseSearch_Props, DiseaseSearch_State>{
    getHeight() {
        return this.containerRef.current ? this.containerRef.current.clientHeight : 0
    }
    constructor(props: DiseaseSearch_Props) {
        super(props);

        this.state = { selectedDiseases: [], showList: false, allDiseases: [], nameSearch: '', defaultsLoaded: false }

    }
    async componentDidUpdate(prevProps: Readonly<DiseaseSearch_Props>, prevState: Readonly<DiseaseSearch_State>, snapshot?: any) {
        let allDiseases = database.diseaseDirectory.toArray()
        if (!this.state.defaultsLoaded && allDiseases.length > 0) {

            // let m = new Map(allDiseases)
            // let ths = this;
            // let selected: Array<[string, DiseaseDescription]> = this.props.defaultSelected.map((name, index) => {
            //     let d = m.get(name)
            //     d.color = ths.generateGraphColor(index)
            //     return [name, m.get(name)]
            // })
            // this.setState({ selectedDiseases: selected, defaultsLoaded: true })
            // this.props.onChange(selected)
            this.setState({ defaultsLoaded: true })
            let selected: Array<[Disease, DiseaseDisplay]> = []
            for (let icdCode of this.props.defaultSelectedICD) {
                console.log(`Getting disease for ${icdCode}`)
                let disease = await (database as Database).getDeathsForICD(icdCode)
                if (disease == null) {
                    console.log(`Failed to get disease for ${icdCode}`)
                } else {
                    selected.push([disease, { channels: [], icdCode: disease.description.icdCode }])
                }
            }
            this.props.onChange(selected)
            this.setState({ selectedDiseases: selected })
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
        return <div style={{ maxHeight: '50vh' }} ref={this.containerRef}>
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
                    backgroundColor: 'white',
                    borderStyle: 'solid', borderWidth: 2, borderRadius: 8,
                    maxHeight: '50vh', overflowY: 'scroll'
                }}>
                    {this.state.allDiseases.filter((disease: DiseaseDescription) => (
                        disease.technicalName.toLowerCase().includes(this.state.nameSearch.toLowerCase()) ||
                        disease.laymanName.toLowerCase().includes(this.state.nameSearch.toLowerCase())
                    )).limit(50).sort((a, b) => (b[1].maxValue - a[1].maxValue)).map((description) => {
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
                                <div>{description[0]}</div>
                                <div style={{ flexGrow: 1 }} />
                                <div>{description[1].minValue.toEnglish()}-{description[1].maxValue.toEnglish()}</div>
                            </div>
                            <div style={{ height: 1, backgroundColor: fColor.grey.darken2.toHexString() }} />
                        </div>
                    })}
                </div>
            </div>
        </div>
    }
    defaultGraphColors: FColor[] = [fColor.red.lighten2, fColor.red.base, fColor.red.darken2, fColor.amber.darken2, fColor.amber.base]
    generateGraphColor(index: number) {

        if (index >= 0 && index < this.defaultGraphColors.length) {
            return this.defaultGraphColors[index]
        }
        return fColor.randomColor()
    }
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