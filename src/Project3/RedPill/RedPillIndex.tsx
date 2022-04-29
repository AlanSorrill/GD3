import React from "react";
import { Device } from "../../Helper";
import { RP_Timeline_Item } from "./RP_Timeline";


export interface RedPillIndex_Props { }
export interface RedPillIndex_State { }
export class RedPillIndex extends React.Component<RedPillIndex_Props, RedPillIndex_State>{
    constructor(props: RedPillIndex_Props) {
        super(props);
    }

    render() {
        let sidePadding = Device.switch({ desktopHorizontal: '10vw', desktopVertical: '5vw', phoneHorizontal: '0vw' })
        return <div style={{ backgroundColor: fColor.darkMode[0].toHexStr(), height: '100vh', overflowY: 'scroll', paddingLeft: sidePadding, paddingRight: sidePadding }}>
            <div style={{ height: 200 }} />
            <RP_Timeline_Item title="Eco Health Aliance applies for DARPA grant concerning gain of function research" date="March 27, 2018" source="The Intercept">
                <img src="./project3/darpaProposal.png" style={{ width: '100%', height: 'auto' }}></img>
            </RP_Timeline_Item>
            <RP_Timeline_Item title="Wuhan Institute of Virology (WIV) replaces 61.5mb “Database of Pathogens of Bat and Mouse origin”" date="Sept 10, 2019" source="">

            </RP_Timeline_Item>
            <RP_Timeline_Item title={`WIV Researchers Hospitalized with "pneumonia-like" disease"`} date="Nov, 2019" source="">

            </RP_Timeline_Item>

            <RP_Timeline_Item title="WIV modifies db description. Dr. Shi Zhengli announces her lab has samples of the virus
on China StateTV" date="Dec 30, 2019" source="">
                <img src="./project3/drshi.png" style={{ width: '100%', height: 'auto' }}></img>

            </RP_Timeline_Item>
            <RP_Timeline_Item title={`Dr. Botao Xiao (South China University of Tech.) Publishes paper suggesting wuhan lab leak`} date="Feb 6, 2020" source="">


            </RP_Timeline_Item>
            <RP_Timeline_Item isLast={true} title={`Group of Scientists publish statement in “The Lancet”`} date="Feb 19, 2020" source="">
                Theories of non-natural origins = conspiracy theories
                “Transparent sharing of data is being threatedend’

                Claims scientists from multiple countries have analized genomes and concluded the virus was natural

                Dead link to genome page*
                Paper cites papers written by same author*
                Peter Daszac emails the group later to thank them*
                Peter Publishes similar content in the Guardian*
            </RP_Timeline_Item>

            <div style={{ height: 200 }} />

        </div>
    }
}