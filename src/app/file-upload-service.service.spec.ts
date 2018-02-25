import { TestBed, inject } from '@angular/core/testing';

import { FileUploadServiceService } from './file-upload-service.service';

describe('FileUploadServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileUploadServiceService]
    });
  });

  it('should be created', inject([FileUploadServiceService], (service: FileUploadServiceService) => {
    expect(service).toBeTruthy();
  }));
});
