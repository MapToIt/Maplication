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
  urlPlaceholder: string = "Company Website URL";
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
  currTag: string;
  states = [];
  user: User = new User("");    //change to testID to view logged-in
  profile: User = new User("");
  

  constructor() {}

  ngOnInit() {
    //load in states
    this.states = this.getStates();

    //Load in page info from db
    this.profile = this.getProfile(this.getCurrentPageID());
    //Load in user
    this.user = this.getUser(this.getCurrentID());
    //get user type
    this.profile.type = this.getType(this.profile.id);
    this.user.type = this.getType(this.user.id);

    /*DEBUGGING*/
    this.profile.id = "same";
    this.user.id = "diff";
    this.profile.type = "company";
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
  //get states from db
  getStates(){
    return ["Alabama", "Alaska", "Arizona", "Ohio", "Michigan", "Florida"]
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
        this.tagText = "You are interested in these fields:";
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
      this.phonePlaceholder = "Contact Phone Number";
      this.urlPlaceholder = "Your Company Url";
      if (this.isValid){
        this.tagText = "Tags which your company is interested in (click to remove)";
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

  //debug user object
  debug(){
    console.log(this.user);
  }

  hasTags(){
    return (this.user.tags.length != 0)
  }



  //add career tag to user
  addTag(){
    var tag = this.currTag;
    console.log(tag);
    if(this.viewMode){
      if(!this.user.tags.includes(tag)){
         this.user.tags.push(tag);
      }
    }
  }

  removeTag(tag: string){
    if(this.viewMode){
      this.user.tags.splice(this.user.tags.findIndex((index) => { return index == tag}), 1)
      document.getElementById(tag).remove
    }
  }

}