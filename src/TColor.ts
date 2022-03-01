import { HSV, RGB, RGBA } from "./Imports"

export type ColorDefs = {
    [key: string]: string | string[] | ColorDefs
}
export type TransformTupleType<Tuple, Output> = {
    [P in keyof Tuple]: Output
}
export type TColorDir<Defs extends ColorDefs> = {
    [Property in keyof Defs]: (Defs[Property] extends String ? TColor : (Defs[Property] extends TransformTupleType<Defs[Property], TColor> ? TColor[] : (Defs[Property] extends ColorDefs ? TColorDir<Defs[Property]> : never)))
}
export function CreateTColorDirectory<colorDefs extends ColorDefs>(defs: colorDefs): TColorDir<colorDefs> {
    let out = {}
    for(let key in defs){

    }
    return {} as any
}

// let tColor = CreateTColorDirectory()

export class TColor {
    value: RGB
    constructor(hexString: string) {
        this.value = TColor.hexStringToRgb(hexString);
    }

    static hexStringToRgb(hexStr: string): RGB {
        if (hexStr.startsWith('#')) {
            hexStr = hexStr.substring(1)
        }
        let chunkSize = hexStr.length / 3;
        let chunks: RGB = [0, 0, 0]
        for (let i = 0; i < chunks.length; i++) {
            chunks[i] = Number.parseInt(hexStr.substring(i * chunkSize, i * chunkSize + chunkSize), 16)
        }
        return chunks
    }
}


let colorDefs = {
    "darkMode": [
        "#000",
        "#fff",
        "#141414",
        "#191919",
        "#1e1e1e",
        "#222222",
        "#262626",
        "#2a2a2a",
        "#2f2f2f",
        "#363636",
        "#3c3c3c",
        "#464646"
    ],
    "lightText": [
        "#a8a8a8",
        "#e0e0e0"
    ],
    "darkText": [
        "#373737",
        "#898989"
    ],
    "red": {
        "lighten4": "#ffcdd2",
        "lighten3": "#ef9a9a",
        "lighten2": "#e57373",
        "lighten1": "#ef5350",
        "base": "#f44336",
        "darken1": "#e53935",
        "darken2": "#d32f2f",
        "darken3": "#c62828",
        "darken4": "#b71c1c",
        "accent1": "#ff8a80",
        "accent2": "#ff5252",
        "accent3": "#ff1744",
        "accent4": "#d500",
        "lighten5": "#ffebee"
    },
    "pink": {
        "lighten4": "#f8bbd0",
        "lighten3": "#f48fb1",
        "lighten2": "#f06292",
        "lighten1": "#ec407a",
        "base": "#e91e63",
        "darken1": "#d81b60",
        "darken2": "#c2185b",
        "darken3": "#ad1457",
        "darken4": "#88e4f",
        "accent1": "#ff80ab",
        "accent2": "#ff4081",
        "accent3": "#f5057",
        "accent4": "#c51162",
        "lighten5": "#fce4ec"
    },
    "purple": {
        "lighten4": "#e1bee7",
        "lighten3": "#ce93d8",
        "lighten2": "#ba68c8",
        "lighten1": "#ab47bc",
        "base": "#9c27b0",
        "darken1": "#8e24aa",
        "darken2": "#7b1fa2",
        "darken3": "#6a1b9a",
        "darken4": "#4a148c",
        "accent1": "#ea80fc",
        "accent2": "#e040fb",
        "accent3": "#d50f9",
        "accent4": "#aa0ff",
        "lighten5": "#f3e5f5"
    },
    "deepPurple": {
        "lighten4": "#d1c4e9",
        "lighten3": "#b39ddb",
        "lighten2": "#9575cd",
        "lighten1": "#7e57c2",
        "base": "#673ab7",
        "darken1": "#5e35b1",
        "darken2": "#512da8",
        "darken3": "#4527a0",
        "darken4": "#311b92",
        "accent1": "#b388ff",
        "accent2": "#7c4dff",
        "accent3": "#651fff",
        "accent4": "#620ea",
        "lighten5": "#ede7f6"
    },
    "indigo": {
        "lighten4": "#c5cae9",
        "lighten3": "#9fa8da",
        "lighten2": "#7986cb",
        "lighten1": "#5c6bc0",
        "base": "#3f51b5",
        "darken1": "#3949ab",
        "darken2": "#303f9f",
        "darken3": "#283593",
        "darken4": "#1a237e",
        "accent1": "#8c9eff",
        "accent2": "#536dfe",
        "accent3": "#3d5afe",
        "accent4": "#304ffe",
        "lighten5": "#e8eaf6"
    },
    "blue": {
        "lighten4": "#bbdefb",
        "lighten3": "#90caf9",
        "lighten2": "#64b5f6",
        "lighten1": "#42a5f5",
        "base": "#2196f3",
        "darken1": "#1e88e5",
        "darken2": "#1976d2",
        "darken3": "#1565c0",
        "darken4": "#d47a1",
        "accent1": "#82b1ff",
        "accent2": "#448aff",
        "accent3": "#2979ff",
        "accent4": "#2962ff",
        "lighten5": "#e3f2fd"
    },
    "lightBlue": {
        "lighten4": "#b3e5fc",
        "lighten3": "#81d4fa",
        "lighten2": "#4fc3f7",
        "lighten1": "#29b6f6",
        "base": "#3a9f4",
        "darken1": "#39be5",
        "darken2": "#288d1",
        "darken3": "#277bd",
        "darken4": "#1579b",
        "accent1": "#80d8ff",
        "accent2": "#40c4ff",
        "accent3": "#0b0ff",
        "accent4": "#091ea",
        "lighten5": "#e1f5fe"
    },
    "cyan": {
        "lighten4": "#b2ebf2",
        "lighten3": "#80deea",
        "lighten2": "#4dd0e1",
        "lighten1": "#26c6da",
        "base": "#0bcd4",
        "darken1": "#0acc1",
        "darken2": "#097a7",
        "darken3": "#0838f",
        "darken4": "#06064",
        "accent1": "#84ffff",
        "accent2": "#18ffff",
        "accent3": "#0e5ff",
        "accent4": "#0b8d4",
        "lighten5": "#e0f7fa"
    },
    "teal": {
        "lighten4": "#b2dfdb",
        "lighten3": "#80cbc4",
        "lighten2": "#4db6ac",
        "lighten1": "#26a69a",
        "base": "#09688",
        "darken1": "#0897b",
        "darken2": "#0796b",
        "darken3": "#0695c",
        "darken4": "#04d40",
        "accent1": "#a7ffeb",
        "accent2": "#64ffda",
        "accent3": "#1de9b6",
        "accent4": "#0bfa5",
        "lighten5": "#e0f2f1"
    },
    "green": {
        "lighten4": "#c8e6c9",
        "lighten3": "#a5d6a7",
        "lighten2": "#81c784",
        "lighten1": "#66bb6a",
        "base": "#4caf50",
        "darken1": "#43a047",
        "darken2": "#388e3c",
        "darken3": "#2e7d32",
        "darken4": "#1b5e20",
        "accent1": "#b9f6ca",
        "accent2": "#69f0ae",
        "accent3": "#0e676",
        "accent4": "#0c853",
        "lighten5": "#e8f5e9"
    },
    "lightGreen": {
        "lighten4": "#dcedc8",
        "lighten3": "#c5e1a5",
        "lighten2": "#aed581",
        "lighten1": "#9ccc65",
        "base": "#8bc34a",
        "darken1": "#7cb342",
        "darken2": "#689f38",
        "darken3": "#558b2f",
        "darken4": "#33691e",
        "accent1": "#ccff90",
        "accent2": "#b2ff59",
        "accent3": "#76ff3",
        "accent4": "#64dd17",
        "lighten5": "#f1f8e9"
    },
    "lime": {
        "lighten4": "#f0f4c3",
        "lighten3": "#e6ee9c",
        "lighten2": "#dce775",
        "lighten1": "#d4e157",
        "base": "#cddc39",
        "darken1": "#c0ca33",
        "darken2": "#afb42b",
        "darken3": "#9e9d24",
        "darken4": "#827717",
        "accent1": "#f4ff81",
        "accent2": "#eeff41",
        "accent3": "#c6ff0",
        "accent4": "#aeea0",
        "lighten5": "#f9fbe7"
    },
    "yellow": {
        "lighten4": "#fff9c4",
        "lighten3": "#fff59d",
        "lighten2": "#fff176",
        "lighten1": "#ffee58",
        "base": "#ffeb3b",
        "darken1": "#fdd835",
        "darken2": "#fbc02d",
        "darken3": "#f9a825",
        "darken4": "#f57f17",
        "accent1": "#ffff8d",
        "accent2": "#ffff0",
        "accent3": "#ffea0",
        "accent4": "#ffd60",
        "lighten5": "#fffde7"
    },
    "amber": {
        "lighten4": "#ffecb3",
        "lighten3": "#ffe082",
        "lighten2": "#ffd54f",
        "lighten1": "#ffca28",
        "base": "#ffc17",
        "darken1": "#ffb30",
        "darken2": "#ffa00",
        "darken3": "#ff8f0",
        "darken4": "#ff6f0",
        "accent1": "#ffe57f",
        "accent2": "#ffd740",
        "accent3": "#ffc40",
        "accent4": "#ffab0",
        "lighten5": "#fff8e1"
    },
    "orange": {
        "lighten4": "#ffe0b2",
        "lighten3": "#ffcc80",
        "lighten2": "#ffb74d",
        "lighten1": "#ffa726",
        "base": "#ff980",
        "darken1": "#fb8c0",
        "darken2": "#f57c0",
        "darken3": "#ef6c0",
        "darken4": "#e6510",
        "accent1": "#ffd180",
        "accent2": "#ffab40",
        "accent3": "#ff910",
        "accent4": "#ff6d0",
        "lighten5": "#fff3e0"
    },
    "deepOrange": {
        "lighten4": "#ffccbc",
        "lighten3": "#ffab91",
        "lighten2": "#ff8a65",
        "lighten1": "#ff7043",
        "base": "#ff5722",
        "darken1": "#f4511e",
        "darken2": "#e64a19",
        "darken3": "#d84315",
        "darken4": "#bf36c",
        "accent1": "#ff9e80",
        "accent2": "#ff6e40",
        "accent3": "#ff3d0",
        "accent4": "#dd2c0",
        "lighten5": "#fbe9e7"
    },
    "brown": {
        "lighten4": "#d7ccc8",
        "lighten3": "#bcaaa4",
        "lighten2": "#a1887f",
        "lighten1": "#8d6e63",
        "base": "#795548",
        "darken1": "#6d4c41",
        "darken2": "#5d4037",
        "darken3": "#4e342e",
        "darken4": "#3e2723",
        "accent1": "#00NaN",
        "accent2": "#00NaN",
        "accent3": "#00NaN",
        "accent4": "#00NaN",
        "lighten5": "#efebe9"
    },
    "grey": {
        "lighten4": "#f5f5f5",
        "lighten3": "#eeeeee",
        "lighten2": "#e0e0e0",
        "lighten1": "#bdbdbd",
        "base": "#9e9e9e",
        "darken1": "#757575",
        "darken2": "#616161",
        "darken3": "#424242",
        "darken4": "#212121",
        "accent1": "#00NaN",
        "accent2": "#00NaN",
        "accent3": "#00NaN",
        "accent4": "#00NaN",
        "lighten5": "#fafafa"
    },
    "blueGrey": {
        "lighten4": "#cfd8dc",
        "lighten3": "#b0bec5",
        "lighten2": "#90a4ae",
        "lighten1": "#78909c",
        "base": "#607d8b",
        "darken1": "#546e7a",
        "darken2": "#455a64",
        "darken3": "#37474f",
        "darken4": "#263238",
        "accent1": "#00NaN",
        "accent2": "#00NaN",
        "accent3": "#00NaN",
        "accent4": "#00NaN",
        "lighten5": "#eceff1"
    },
    "black": "#000",
    "white": "#ffffff",
    "iowaGold": "#ffcd0"
}
let tColor = CreateTColorDirectory(colorDefs);
export {tColor}
