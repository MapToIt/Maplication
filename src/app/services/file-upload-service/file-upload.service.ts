import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage'
import { Observable } from 'rxjs/Observable';
@Injectable()
export class FileUploadService {

  constructor(private af: AngularFireStorage) { }
  

  //uploads file to storage and returns download url
  uploadFile(file) {
    const randomId = Math.random().toString(36).substring(2);
    var ref = this.af.ref(randomId);
    var task = ref.put(file)
    return task.downloadURL();
  }

}
