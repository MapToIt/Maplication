import { TestBed, inject } from '@angular/core/testing';

import { ChipService } from './chip.service';

describe('ChipService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ChipService]
    });
  });

  it('should be created', inject([ChipService], (service: ChipService) => {
    expect(service).toBeTruthy();
  }));
});
