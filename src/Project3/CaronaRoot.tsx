import React from "react";
import { CaronaCasesAndDeathsOverTimeRow, SodaDB, SodaDBDirectory } from "./SodaDB";
import "./RonaDB"
import { RedPillIndex } from "./RedPill/RedPillIndex";
import { BristolBoard, FColor, fColor, lerp, UIElement, UIFrameResult, UIFrame_CornerWidthHeight } from "bristolboard";
import { LineGraph } from "./LineGraph";
import { DataChannel } from "../../srcFunctions/common/WonderData";
export interface CaronaRoot_Props { }
export interface CaronaRoot_State {
    values: Array<CaronaCasesAndDeathsOverTimeRow>
    redPill: boolean
    diseases: Array<[string, DataChannel]>
}
export class CaronaRoot extends React.Component<CaronaRoot_Props, CaronaRoot_State> {
    constructor(props: CaronaRoot_Props) {
        super(props);
        this.state = { values: [], redPill: false, diseases: [] }
    }

    listenerIndex: number
    componentDidMount(): void {
        if (searchParamObj['redpill'] == 'true') {
            this.setState({ redPill: true })
        }
        this.listenerIndex = database.addListener(() => {
            ths.setState({})
        })
        let ths = this;
        //Promise.all([
        database.pullPopulation(),
            database.pullDeathsByCause()



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
                    <DiseaseList defaultSelected={['Influenza with pneumonia, influenza virus identified']} onChange={function (selected: [string, DataChannel][]) {
                        ths.setState({ diseases: selected })
                    }} />
                    <div style={{ flexGrow: 1 }} />
                </div>
                <div style={{ flexGrow: 2, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundImage: `url("./project3/tempChart.PNG")` }} />
            </div>
            {/* <div style={{backgroundColor: 'purple', width: 500, height: 500}}></div> */}

            <LineGraph style={{ background: 'transparent', flexGrow: 3 }} sources={this.state.diseases.mapOrDrop(d => d[1]?.tree ? d[1] : 'DROP')} padding={0} />


        </div >
    }

}
export interface DiseaseList_Props {
    defaultSelected: Array<string>
    onChange: (selected: Array<[string, DataChannel]>) => void
}
export interface DiseaseList_State {
    diseases: Array<[string, DataChannel]>
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
                    return <div style={{ padding: 16, display: 'flex' }}>
                        <div style={{
                            width: 16, height: 16, marginRight: 16,
                            borderStyle: 'solid', borderWidth: 1, borderColor: fColor.grey.darken2.toHexString(), borderRadius: 4,
                            display: 'inline-block', backgroundColor: disease[1].color.toHexString()
                        }} />
                        <div style={{ lineHeight: '16px', fontSize: 18, color: fColor.darkText[0].toHexString(), maxWidth: '15vw' }}>{disease[0]}</div>
                    </div>
                })}
            </div>

            <DiseaseSearch ref={ths.diseaseSearch} defaultSelected={this.props.defaultSelected} allDiseases={database.deathsByCause.pairs()} onChange={function (selected: [string, DataChannel][]) {
                ths.setState({ diseases: selected })
                ths.props.onChange(selected)
                console.log(`Selected`, selected)
            }} />
        </div>
    }
    
}
export interface DiseaseSearch_Props {
    allDiseases: Array<[string, DataChannel]>,
    defaultSelected: Array<string>
    onChange: (selected: Array<[string, DataChannel]>) => void
}
export interface DiseaseSearch_State {
    nameSearch: string
    showList: boolean
    selectedDiseases: Array<[string, DataChannel]>
    defaultsLoaded: boolean
}
export class DiseaseSearch extends React.Component<DiseaseSearch_Props, DiseaseSearch_State>{
    getHeight() {
        return this.containerRef.current ? this.containerRef.current.clientHeight : 0
    }
    constructor(props: DiseaseSearch_Props) {
        super(props);

        this.state = { selectedDiseases: [], showList: false, nameSearch: '', defaultsLoaded: false }

    }
    componentDidUpdate(prevProps: Readonly<DiseaseSearch_Props>, prevState: Readonly<DiseaseSearch_State>, snapshot?: any): void {
        if (!this.state.defaultsLoaded && this.props.allDiseases.length > 0) {
            let m = new Map(this.props.allDiseases)
            let ths = this;
            let selected: Array<[string, DataChannel]> = this.props.defaultSelected.map((name, index) => {
                let d = m.get(name)
                d.color = ths.generateGraphColor(index)
                return [name, m.get(name)]
            })
            this.setState({ selectedDiseases: selected, defaultsLoaded: true })
            this.props.onChange(selected)
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
                    {this.props.allDiseases.filter((disease: [name: string, data: DataChannel]) => (disease[0].toLowerCase().includes(this.state.nameSearch.toLowerCase()))).limit(50).sort((a, b) => (b[1].maxValue - a[1].maxValue)).map((disease) => {
                        return <div className={fColor.grey.lighten3.hoverCssClass}
                            style={{ marginBottom: 2, maxWidth: 500, color: fColor.darkText[0].toHexString(), cursor: 'pointer' }} onClick={() => {
                                let list = ths.state.selectedDiseases
                                disease[1].color = ths.generateGraphColor(list.length)
                                list.push(disease)
                                ths.props.onChange(list)
                                ths.setState({ selectedDiseases: list, showList: false })
                            }}>
                            <div style={{ display: 'flex' }}>
                                <div>{disease[0]}</div>
                                <div style={{ flexGrow: 1 }} />
                                <div>{disease[1].minValue.toEnglish()}-{disease[1].maxValue.toEnglish()}</div>
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