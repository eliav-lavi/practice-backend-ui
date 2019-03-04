import { TestBed, inject } from '@angular/core/testing';

import { CollectionPaginatorService } from './collection-paginator.service';

describe('CollectionPaginatorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionPaginatorService]
    });
  });

  it('should be created', inject([CollectionPaginatorService], (service: CollectionPaginatorService) => {
    expect(service).toBeTruthy();
  }));
});
