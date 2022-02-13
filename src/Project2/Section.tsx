import React from "react";
import { Project2Root } from "../Imports";

export abstract class Section {
    name: string
    abstract render(alpha: number): React.ReactNode;
    root: Project2Root
    containerElement: React.RefObject<HTMLDivElement> = React.createRef()
    index: number = -1;
    constructor(name: string, root: Project2Root) {
        this.name = name;
        this.root = root;
    }
    scrollIntoView() {
        if (!this.containerElement.current) {
            return;
        }
        this.containerElement.current.scrollIntoView({
            behavior: 'smooth'
        })
    }
}
