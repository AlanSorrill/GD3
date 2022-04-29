import React from "react";
import { CaronaCasesAndDeathsOverTimeRow, SodaDB, SodaDBDirectory } from "./SodaDB";
import "./RonaDB"
import { RedPillIndex } from "./RedPill/RedPillIndex";
export interface CaronaRoot_Props { }
export interface CaronaRoot_State {
    values: Array<CaronaCasesAndDeathsOverTimeRow>
    redPill: boolean
}
export class CaronaRoot extends React.Component<CaronaRoot_Props, CaronaRoot_State> {
    constructor(props: CaronaRoot_Props) {
        super(props);
        this.state = { values: [], redPill: false }
    }

    componentDidMount(): void {
        if(searchParamObj['redpill'] == 'true'){
            this.setState({redPill: true})
        }
    }
    render() {
        let ths = this;
        if(this.state.redPill){
            return <RedPillIndex />
        }
        return <div style={{
            backgroundColor: fColor.white.toHexStr(),
            color: fColor.red.lighten1.toHexStr(),
            fontFamily: 'Ubuntu',
            width: '100vw', height: '100vh',
            position: 'fixed',
            top: 0, left: 0,
            display: 'flex', flexDirection: 'column'
        }}>
            <div style={{ fontWeight: 'bold', fontSize: 64, margin: 16 }}>SARS CoV-#
                <div style={{
                    cursor: 'pointer', borderRadius: 4, overflow: 'hidden', display: 'inline', padding: 8,
                    backgroundColor: fColor.red.base.toHexStr(), color: fColor.white.toHexStr(), fontSize: 32

                }} onClick={async () => {
                    //9hhd-mqs2 CDC Wonder
                    //9mfq-cb36 COVID
                    console.log
                    let ronaDb = SodaDBDirectory.caronaCasesAndDeathsOverTime
                    let results = await ronaDb.get()
                    console.log(results)
                    ths.setState({ values: results })
                    // let consumer = window["sodaConsumer"];
                    // let query = consumer.query().withDataset('9mfq-cb36').limit(10).getRows().on('success',
                    //     (rows) => console.log(rows)).on('error',
                    //         (err) => console.log(err))
                }}>Test</div>
                <div style={{
                    cursor: 'pointer', borderRadius: 4, overflow: 'hidden', display: 'inline', padding: 8,
                    backgroundColor: fColor.red.base.toHexStr(), color: fColor.white.toHexStr(), fontSize: 32

                }} onClick={async () => {
                    //9hhd-mqs2 CDC Wonder
                    //9mfq-cb36 COVID

                    ths.setState({ redPill: true })
                    // let consumer = window["sodaConsumer"]; 
                    // let query = consumer.query().withDataset('9mfq-cb36').limit(10).getRows().on('success',
                    //     (rows) => console.log(rows)).on('error',
                    //         (err) => console.log(err))
                }}>RedPill</div>
            </div>

            {/* <div style={{ flexGrow: 1, width: '100vw', backgroundColor: fColor.purple.base.toHexStr(), overflowY: 'scroll' }}>
                {<TempRowLabels row={this.state.values.length > 0 ? Object.keys(this.state.values[0]) : []} />}
                {this.state.values.map((value: CaronaCasesAndDeathsOverTimeRow, index: number) => (
                    <TempRow row={value} />))}
            </div> */}
        </div >
    }
}

// function TempRowLabels(props: { row: string[] }) {
//     return <div style={{}}>
//         {props.row.map((value: string, index: number) => <div style={{
//             width: `${1.0/props.row.length * 100}%`,
//             height: 16,
//             display: 'inline',float: 'left',
//             backgroundColor: index.isEven() ? fColor.red.base.toHexStr() : fColor.white.toHexStr(),
//             color: index.isEven() ? fColor.white.toHexStr() : fColor.lightText[0].toHexStr(),
//             overflowX: 'hidden', 
//             overflowY: 'hidden'
//         }}>{value}</div>)}
//     </div>
// }
// function TempRow(props: { row: CaronaCasesAndDeathsOverTimeRow}) {
//     return <div style={{}}>
//         {props.row.map((value: string, index: number) => <div style={{
//             width: `${1.0/props.row.length * 100}%`,
//             height: 16,
//             display: 'inline',float: 'left',
//             backgroundColor: index.isEven() ? fColor.red.base.toHexStr() : fColor.white.toHexStr(),
//             color: index.isEven() ? fColor.white.toHexStr() : fColor.lightText[0].toHexStr(),
//             overflowX: 'hidden', 
//             overflowY: 'hidden'
//         }}>{value}</div>)}
//     </div>
// }