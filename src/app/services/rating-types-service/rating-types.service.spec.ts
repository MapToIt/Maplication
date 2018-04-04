import { TestBed, inject } from '@angular/core/testing';

import { RatingTypesService } from './rating-types.service';

describe('RatingTypesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RatingTypesService]
    });
  });

  it('should be created', inject([RatingTypesService], (service: RatingTypesService) => {
    expect(service).toBeTruthy();
  }));
});
