import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class FileUploadService {
  httpClient: HttpClient;

  constructor() { 
    
  }

//   postFile(fileToUpload: File): Observable<boolean> {
//     const endpoint = 'your-destination-url';
//     const formData: FormData = new FormData();
//     formData.append('fileKey', fileToUpload, fileToUpload.name);
//     return this.httpClient
//       .post(endpoint, formData, { headers: yourHeadersConfig })
//       .map(() => { return true; })
//       .catch((e) => this.handleError(e));
// }

}
