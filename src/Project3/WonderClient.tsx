import { XmlToJson } from "../../srcFunctions/common/FBF_Helpers";
import { RawWonder_Page, RawWonder_TableColumn, RawWonder_TableRow, WonderRequest } from "../../srcFunctions/common/WonderData";

export class WonderClient {
    static async testRequest() {
        let resp = await fetch(`http://${window.location.hostname}:5001/gdsn3-22/us-central1/RonaTest`)
        let data: RawWonder_Page = await resp.json()
        WonderClient.lastResponse = data;
        console.log(data)
        return data;
    }
    static lastResponse: RawWonder_Page = null;
    static async testProcess() {
        let data = await this.testRequest()
       return WonderRequest.toTable(data)
    }
}