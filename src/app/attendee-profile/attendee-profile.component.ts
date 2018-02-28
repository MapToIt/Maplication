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
  user: User = new User("");    //change to testID to view logged-in
  profile: User = new User("");
  

  constructor() {
  }

  ngOnInit() {
    //Load in page info from db
    this.profile = this.getProfile(this.getCurrentPageID());
    //Load in user
    this.user = this.getUser(this.getCurrentID());
    //get user type
    this.profile.type = this.getType(this.profile.id);
    this.user.type = this.getType(this.user.id);

    /*DEBUGGING*/
    this.profile.id = "same";
    this.user.id = "same";
    this.profile.type = "attendee";
    /*END DEBUGGING*/
    
    //check validity
    if (this.profile.id == this.user.id){
      this.isValid = true;
    }else{
      this.isValid = false;
    }
    this.UICheck();

  }

  handleFileInput(files: FileList) {
    this.profileImgFile = files.item(0);
    
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

  //get user info from url 
  getUser(id){
    //assign to new attendee
    var user = new User(id);
    //setup user for view

    
    return user;
  }

  getProfile(id){
    var profile = new User("id");
    //load in from db and assign to profile
    return profile;
  }

  //get id from OAuth
  getCurrentID(){
    var id = "testID";
    return id;
  }

  //get passed id of profile to view
  getCurrentPageID(){
    var id = "testID";
    return id;
  }
  //get user type
  getType(id){
    var type= "attendee"
    return type;
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
        this.getUser(this.getCurrentID());
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

  UICheck(){
    //check user type
    if(this.profile.type == "attendee"){
      this.isAttendee = true;
      //set UI to reflect attendee
      this.namePlaceholder = "Name";
      this.emailPlaceholder = "Email";
      this.phonePlaceholder = "Phone Number";
      if (this.isValid){
        this.tagText = "Click tags to add them to your profile";
        this.uploadImgText = "Upload Your Picture";
        this.tagDescription = "I am interested in: ";
        this.descriptionText = "Here's a look at your profile. Press the edit button to switch to edit mode.";
      }else{
        this.descriptionText = "";
        this.greeting = "Here's a look at " + this.user.name + "'s profile.";
      }
    }else if(this.profile.type == "company"){
      //set UI to reflect company
      this.isAttendee = false;
      this.namePlaceholder = "Company Name";
      this.emailPlaceholder = "Contact Email";
      this.phonePlaceholder = "Contact Phone Number"
      if (this.isValid){
        this.tagText = "Click tags which your company is interested in";
        this.uploadImgText = "Upload Company Picture";
        this.tagDescription = this.user.name + " is interested in: ";
        this.descriptionText = "Here's a look at your company profile. Press the edit button to switch to edit mode.";
      }else{
        this.descriptionText = "";
        this.greeting = "Here's a look at " + this.user.name + "'s profile.";
      }
      
    }
    //set greeting
    if(this.viewMode){
      if(this.isValid){
        this.greeting = "Welcome Back, ".concat(this.user.name);
      }else{
        this.descriptionText = "";
        this.greeting = "Here's a look at " + this.user.name + "'s profile.";
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