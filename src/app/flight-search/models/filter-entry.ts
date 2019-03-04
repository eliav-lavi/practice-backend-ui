export class FilterEntry<T> {
    enabled: boolean;
    filterName: string;
    value: T;

    constructor(filterName: string, enabled: boolean = false) {
        this.filterName = filterName;
        this.enabled = enabled;
    }
}