export class PathConfiguration {
  pathName: string;
  path: string;
  label: string;
  placeholder: string;

  constructor(object) {
    this.pathName = object.pathName;
    this.path = null;
    this.label = object.label;
    this.placeholder = object.placeholder;
  }
}
