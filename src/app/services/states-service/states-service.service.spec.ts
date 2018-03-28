import { TestBed, inject } from '@angular/core/testing';

import { StatesService } from './states-service.service';

describe('StatesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StatesService]
    });
  });

  it('should be created', inject([StatesService], (service: StatesService) => {
    expect(service).toBeTruthy();
  }));
});
