import { Component, OnInit } from '@angular/core';
import { Attendee } from './attendee';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';

@Component({
  selector: 'app-attendee-profile',
  templateUrl: './attendee-profile.component.html',
  styleUrls: ['./attendee-profile.component.css']
})
export class AttendeeProfileComponent implements OnInit { 
  greeting: string = "Let's Get Started With Your Profile!";
  bioPlaceholder: string = "Tell us a bit about your background, your experience, and your goals.";
  mottoPlaceholder: string = "Sum yourself up in one sentence.";

  viewMode: boolean = false;
  
  profileImg: string = "/assets/placeholder.png";
  profileImgFile: File;

  //career field tags
  fieldTags = ["Business", "Art", "Science", "Technology", "Software", "Architecture", "Design", "Management", "Marketing", "Accounting"]

  user: Attendee = new Attendee("testID");    //change to testID to view logged-in

  

  constructor() {
  }

  ngOnInit() {
    if(this.viewMode){
      this.getProfile(this.getCurrentID());
      this.user.name = "Chris";   //for debugging
      this.greeting = "Welcome Back, ".concat(this.user.name);
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
    if(this.viewMode){
      if(!this.user.tags.includes(tag)){
        this.user.tags.push(tag);
        document.getElementById(tag).style.backgroundColor = "rgba(3, 61, 250, 0.7)";
      }else{
        var index = this.user.tags.indexOf(tag);
        this.user.tags.splice(index, 1);
        document.getElementById(tag).style.backgroundColor = "rgba(76,77,142,0.7)";
      }
    }
  }
  //get database info
  getProfile(id){

    //assign to new attendee
    var user = new Attendee(id);
    return user;
  }

  //get id from OAuth
  getCurrentID(){
    var id = "testID";
    return id;
  }

  submit(){
    //submit to database
    //submit images
  }

  switchMode(){
    if(this.viewMode){
      this.getProfile(this.getCurrentID());
      this.greeting = "Welcome Back, ".concat(this.user.name);
      this.viewMode = false;
    }else{
      this.viewMode = true;
    }
    
  }

  debug(){
    console.log(this.user);
  }

}