import BTree from "sorted-btree"

export type Disease = 'COVID' | "FLU"
export enum AgeGroup {
    babies = '< 1',
    toddlers = '1-4',
    preTeens = '5-14',
    teens = '15-24',
    twenties = '25-34',
    thirties = '35-44',
    fourties = '45-54',
    fifties = '55-64',
    sixties = '65-74',
    seventies = '75-84',
    seniors = '85+'
}


export class RonaDB { 

    constructor() {
        this.getColumn('COVID_total_deaths')
    }
    getColumn<disease extends Disease>(column: DiseaseDataColumn<disease>) {

    }
}
export class TSColumn {
    tree: BTree<Date, MapAgeToNumber>
    constructor() {
        this.tree = new BTree<Date, MapAgeToNumber>();
        let test: MapAgeToNumber = { "1-4": 23, "15-24": 2, "25-34": 0, "35-44": 0, "45-54": 0, "5-14": 0, "55-64": 0, "65-74": 0, "75-84": 0, "85+": 0, "< 1": 0 };

    }

}
export type MapAgeToNumber = {
    [key in AgeGroup]: number;
};
export type DiseaseDataColumn<DiseaseName extends Disease> = `${DiseaseName}_${'total' | 'new'}_${'cases' | 'deaths'}`


