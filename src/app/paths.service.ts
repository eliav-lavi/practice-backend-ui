import {Injectable, OnInit} from '@angular/core';

const localStorageKey = 'paths';

@Injectable({
  providedIn: 'root'
})

export class PathsService implements OnInit{
  constructor() { }

  ngOnInit() { }

  static setPath(pathName: string, path: string): void {
    let paths = PathsService.getPathsFromStorage();
    paths[pathName] = path;
    const updatedPaths = JSON.stringify(paths);
    localStorage.setItem(localStorageKey , updatedPaths);
    return;
  }

  static getPath(pathName: string): string {
    return PathsService.getPathsFromStorage()[pathName];
  }

  static isPathDefined(pathName: string): boolean {
    return PathsService.getPath(pathName) !== undefined;
  }

  private static getPathsFromStorage(): object {
    return JSON.parse(localStorage.getItem(localStorageKey)) || {};
  }
}
