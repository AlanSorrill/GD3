import React from "react";
import { Device } from "../../Imports";


export interface RP_Timeline_Item_Props {
    isLast?: boolean
    date: string
    title: string
    source: string
}
export interface RP_Timeline_Item_State { }
export class RP_Timeline_Item extends React.Component<RP_Timeline_Item_Props, RP_Timeline_Item_State>{
    constructor(props: RP_Timeline_Item_Props) {
        super(props);
    }
    get barWidth(): number {
        return Device.switch({ desktopHorizontal: 32 })
    }
    lineThickness: number = 8
    padding: number = 16
    get isLast() {
        return (typeof this.props.isLast != 'undefined') ? this.props.isLast : false
    }
    render() {
        return <div style={{ color: 'white', paddingLeft: this.barWidth + this.padding, position: 'relative', paddingBottom: this.isLast ? 0 : this.barWidth * 2 }}>
            <div style={{ position: 'absolute', top: 0, left: 0, bottom: 0, width: this.barWidth }}>
                <div style={{ position: "absolute", top: 0, left: 0, bottom: this.isLast? undefined : 0, width: this.lineThickness, backgroundColor: '#F64336' }} />
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: this.lineThickness, backgroundColor: '#F64336' }} />
            </div>
            <div style={{ position: 'absolute', top: this.lineThickness * 2, height: 0, width: '100%' }}>
                <div style={{position: 'relative'}}>
                <div className="heading3" style={{ color: '#F64336', position: "absolute", bottom: 0 }}>{this.props.date}<span className="label" style={{ color: fColor.lightText[0].toHexStr(), paddingLeft: this.padding / 2 }}>{"["}{this.props.source}{"]"}</span></div>
            </div>
            </div>
            <div className="heading2" style={{paddingTop: this.lineThickness * 2}}>{this.props.title}</div>
            {this.props.children}
        </div>
    }
}