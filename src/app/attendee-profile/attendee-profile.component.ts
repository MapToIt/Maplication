import { Component, OnInit } from '@angular/core';
import { Attendee } from './attendee';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';

@Component({
  selector: 'app-attendee-profile',
  templateUrl: './attendee-profile.component.html',
  styleUrls: ['./attendee-profile.component.css']
})
export class AttendeeProfileComponent implements OnInit { 

  bioPlaceholder: string = "Tell us a bit about your background, your experience, and your goals.";
  mottoPlaceholder: string = "Sum yourself up in one sentence.";

  isLoggedIn: boolean = false;
  
  profileImg: string = "/assets/placeholder.png";
  profileImgFile: File;

  //career field tags
  fieldTags = ["Business", "Art", "Science", "Technology", "Software", "Architecture", "Design", "Management", "Marketing", "Accounting"]

  user: Attendee = new Attendee("testID");

  

  constructor() {
  }

  ngOnInit() {
    if(this.user.id == ""){
      this.isLoggedIn = true;
    }
  }

  handleFileInput(files: FileList) {
    this.profileImgFile = files.item(0);
    
  }

  uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.profileImgFile).subscribe(data => {
  //     // do something, if upload success
  //     }, error => {
  //       console.log(error);
  //     });
    console.log("upload file");
  }

  addTag(tag){
    if(!this.user.tags.includes(tag)){
      this.user.tags.push(tag);
      document.getElementById(tag).style.backgroundColor = "rgba(3, 61, 250, 0.7)";
    }else{
      var index = this.user.tags.indexOf(tag);
      this.user.tags.splice(index, 1);
      document.getElementById(tag).style.backgroundColor = "rgba(76,77,142,0.7)";
    }
    
  }

  debug(){
    console.log(this.user);
  }

}