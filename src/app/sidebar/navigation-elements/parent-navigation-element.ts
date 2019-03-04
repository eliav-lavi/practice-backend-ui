import { NavigationElement } from './navigation-element'

export class ParentNavigationElement {
    title: string;
    children: NavigationElement[];

    public constructor(title: string, children: NavigationElement[]) {
        this.title = title;
        this.children = children;
    }
}