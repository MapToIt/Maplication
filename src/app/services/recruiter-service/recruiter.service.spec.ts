import { TestBed, inject } from '@angular/core/testing';

import { RecruiterService } from './recruiter.service';

describe('RecruiterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RecruiterService]
    });
  });

  it('should be created', inject([RecruiterService], (service: RecruiterService) => {
    expect(service).toBeTruthy();
  }));
});
