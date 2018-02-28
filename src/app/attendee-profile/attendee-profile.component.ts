import { Component, OnInit } from '@angular/core';
import { User } from './user';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';

@Component({
  selector: 'app-attendee-profile',
  templateUrl: './attendee-profile.component.html',
  styleUrls: ['./attendee-profile.component.css']
})
export class AttendeeProfileComponent implements OnInit { 


  //string for ui
  greeting: string = "Let's Get Started With Your Profile!";
  bioPlaceholder: string = "Tell us a bit about your background, your experience, and your goals.";
  mottoPlaceholder: string = "Sum yourself up in one sentence.";
  namePlaceholder: string = "Name";
  emailPlaceholder: string = "Email";
  phonePlaceholder: string = "Phone Number";
  tagText: string = "Click tags to add them to your profile";
  uploadImgText: string = "Upload Your Picture";
  tagDescription: string = "I am interested in: ";
  descriptionText: string = "Here's a look at your profile. Press the edit button to switch to edit mode.";

  //page controls
  viewMode: boolean = false;
  isAttendee: boolean = true;
  isValid: boolean = true;
  
  //profile image setup
  profileImg: string = "/assets/placeholder.png";
  profileImgFile: File;

  //career field tags
  fieldTags = ["Business", "Art", "Science", "Technology", "Software", "Architecture", "Design", "Management", "Marketing", "Accounting"]
  //debug object
  user: User = new User("testID");    //change to testID to view logged-in
  
  

  constructor() {
  }

  ngOnInit() {
    //Load in user
    this.user.type = "company";   //debug!!!
    this.user = this.getProfile(this.getCurrentID());
    //set greeting
    if(this.viewMode){
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

  //add career tag to user
  addTag(tag){
    if(this.viewMode){
      if(!this.user.tags.includes(tag)){
        this.user.tags.push(tag);
        document.getElementById(tag).className = "tagAdded";
      }else{
        var index = this.user.tags.indexOf(tag);
        this.user.tags.splice(index, 1);
        document.getElementById(tag).className = "tag";
      }
    }
  }

  //get database info
  getProfile(id){

    //assign to new attendee
    var user = new User(id);
    //setup user for view
    //check user type
    if(user.type == "attendee"){
      this.isAttendee = true;
      //set UI to reflect attendee
      this.namePlaceholder = "Name";
      this.emailPlaceholder = "Email";
      this.phonePlaceholder = "Phone Number";
      this.tagText = "Click tags to add them to your profile";
      this.uploadImgText = "Upload Your Picture";
      this.tagDescription = "I am interested in: ";
      if(this.isValid){
        this.descriptionText = "Here's a look at your profile. Press the edit button to switch to edit mode.";
      }else{
        this.descriptionText = "Here's a look at " + this.user.name + "'s profile.";
      }
    }else{
      //set UI to reflect company
      this.isAttendee = false;
      this.namePlaceholder = "Company Name";
      this.emailPlaceholder = "Contact Email";
      this.phonePlaceholder = "Contact Phone Number"
      this.tagText = "Click tags which your company is interested in";
      this.uploadImgText = "Upload Company Picture";
      this.tagDescription = this.user.name + " is interested in: ";
      if(this.isValid){
        this.descriptionText = "Here's a look at your company profile. Press the edit button to switch to edit mode.";
      }else{
        this.descriptionText = "Here's a look at " + this.user.name + "'s profile.";
      }
    }
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
    //switch to view mode
    this.switchMode();
    this.debug();
  }

  //switch views based on controls
  switchMode(){
    //check validation
    
    if(this.isValid){
      if(this.viewMode){
        this.getProfile(this.getCurrentID());
        this.greeting = "Welcome Back, ".concat(this.user.name);
        this.viewMode = false;
      }else{
        this.viewMode = true;
        //show which tags have already been selected
        this.fieldTags.forEach(tag => {
          if(this.user.tags.includes(tag)){
            console.log(tag);

            document.getElementById(tag).className = "tagAdded";
          }
        })
      }
    }
  }

  debug(){
    console.log(this.user);
  }
  
  //helper function to change style of selected vs unselected tags
  checkTag(tag){
    if(!this.user.tags.includes(tag)){
      return "tagAdded";
    }else{
      return "tag";
    }
  }

  hasTags(){
    return (this.user.tags.length != 0)
  }

}