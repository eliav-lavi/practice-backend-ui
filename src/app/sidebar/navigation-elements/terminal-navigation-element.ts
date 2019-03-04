import { NavigationElement } from "./navigation-element";

export class TerminalNavigationElement implements NavigationElement {
    title: string;
    link: string;

    public constructor(title: string, link: string) {
        this.title = title;
        this.link = link;
    }
}