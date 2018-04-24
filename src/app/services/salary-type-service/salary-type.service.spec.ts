import { TestBed, inject } from '@angular/core/testing';

import { SalaryTypeService } from './salary-type.service';

describe('SalaryTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SalaryTypeService]
    });
  });

  it('should be created', inject([SalaryTypeService], (service: SalaryTypeService) => {
    expect(service).toBeTruthy();
  }));
});
