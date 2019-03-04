import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CollectionPaginatorService {

  constructor() { }

  getPageItems(collection: Array<any>, page: number, pageSize: number): Array<any> {
    const end = page * pageSize;
    const start = end - pageSize;
    return collection.slice(start, end);
  }
}
