import React from "react";
export interface SideScroller_Props {
    style: React.CSSProperties
}
export class SideScroller extends React.Component<SideScroller_Props>{
    childContainerRef: React.RefObject<HTMLDivElement>
    calcHeight() {
        if (!this.childContainerRef.current) {
            return 0
        }
        return this.childContainerRef.current.getBoundingClientRect().width;
    }
    getAlpha(){

    }
    getChildPos(){
        return 'static'
    }
    render() {
        return <div style={{ height: this.calcHeight() }}>
            <div ref={this.childContainerRef}>
                {this.props.children}
            </div>
        </div>
    }
}