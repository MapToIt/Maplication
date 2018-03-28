import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';

@Injectable()
export class FileUploadService {

  constructor(public af: AngularFireDatabase) { }

  //uploads file to storage and returns download url
  uploadFile(file: File){
    var url: string = "";
    var db = this.af.app.storage().ref();
    db.put(file).then(
      (data) => { url = data.downloadURL },
      (error) => { console.log(error) }
    )
    return url;
  }

}
