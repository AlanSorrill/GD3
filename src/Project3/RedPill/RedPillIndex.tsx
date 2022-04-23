import React from "react";

export interface RedPillIndex_Props { }
export interface RedPillIndex_State { }
export class RedPillIndex extends React.Component<RedPillIndex_Props, RedPillIndex_State>{
    constructor(props: RedPillIndex_Props) {
        super(props);
    }
    render() {
        return <div style={{backgroundColor: fColor.darkMode[0].toHexStr(), width: '100vw', height: '100vh'}}></div>
    } 
}