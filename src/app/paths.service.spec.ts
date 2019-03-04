import { TestBed, inject } from '@angular/core/testing';

import { PathsService } from './paths.service';

describe('PathsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PathsService]
    });
  });

  it('should be created', inject([PathsService], (service: PathsService) => {
    expect(service).toBeTruthy();
  }));
});
