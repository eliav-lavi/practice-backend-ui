import { TestBed, inject } from '@angular/core/testing';

import { CollectionBrowserService } from './collection-browser.service';

describe('CollectionBrowserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionBrowserService]
    });
  });

  it('should be created', inject([CollectionBrowserService], (service: CollectionBrowserService) => {
    expect(service).toBeTruthy();
  }));
});
