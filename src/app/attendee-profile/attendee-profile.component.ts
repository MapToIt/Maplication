import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { User } from './user';
import {Attendee} from '../shared/domain-model/attendee'
import {Company} from '../shared/domain-model/company'
import { logger } from '@firebase/database/dist/esm/src/core/util/util';
import { AngularFireAuth } from 'angularfire2/auth';
import { AnonymousSubscription } from 'rxjs/Subscription';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { ChangeDetectorRef } from '@angular/core';
import { NgModule } from '@angular/core/src/metadata/ng_module';
import { StateService, stateObj } from '../services/state.service';
import { UserService} from '../services/user-service/user.service';
import {AttendeeService} from '../services/attendee-service/attendee.service';
import {CompanyService} from '../services/company-service/company.service';
import { Tags } from '../shared/domain-model/tags';


@Component({
  selector: 'app-attendee-profile',
  templateUrl: './attendee-profile.component.html',
  styleUrls: ['./attendee-profile.component.css']
})
export class AttendeeProfileComponent implements OnInit { 

  //debug
  myUID: string = "1XZbEmGQfJPAVwLh1KjzgMchiUd2";

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
  isValid: boolean = false;
  
  //profile image setup
  profileImg: string = "/assets/placeholder.png";
  profileImgFile: File;

  //career field tags
  fieldTags = ["Business", "Art", "Science", "Technology", "Software", "Architecture", "Design", "Management", "Marketing", "Accounting"]
  currTag: Tags;
  stateObjs: stateObj[];
  states: string[];
  UIUser = new User("none");
  profile: Attendee = new Attendee();
  uid: string;
  currentUser: firebase.User;
  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private cdr: ChangeDetectorRef, private stateService: StateService,
              private userService: UserService, private attendeeService: AttendeeService, 
              private companyService: CompanyService, private route: ActivatedRoute, 
              private router: Router) {

      this.route.params.subscribe( params => this.uid = params['id']);
      console.log(this.uid);

      this.afAuth.authState.subscribe((user) => {
        this.currentUser = user;
        
            //check validity
        if (this.uid == this.currentUser.uid){
          this.isValid = true;
        }else{
          this.isValid = false;
        }
      });
    
      this.userService.getUserType(this.uid).subscribe((userType) => {
        if(userType != null)
        {
          if (userType.toLowerCase() == "attendee")
          {
            this.attendeeService.getAttendee(this.uid).subscribe((attendee) => {
              this.profile = attendee;
              if (!this.profile.firstName){
                this.profile.fullName = attendee.firstName + ' ' + attendee.lastName
              }              
            })
          }
          else
          {
            this.router.navigate(['*']);
          }
        }
      });

      this.states = this.getStates();
    
    
    }

    ngOnInit() {


    //load in states
    

    // /*DEBUGGING*/
    // this.uid = this.myUID;
    // // this.profile.id = "NOT MY ID";
    // this.profile.type = "Company";
    // /*END DEBUGGING*/

    //this.UICheck();

  }

  // //get id from OAuth
  // regUser(id: string) {
  //   this.UIUser.id = id;
  //   //once user id is loaded from auth, load in profiles
  //   if (this.getUser() != "") {
  //     //get profile page from url
  //     this.profile = this.getProfile(this.getCurrentPageID())
  //   } else {
  //     this.profile = this.getProfile(this.UIUser.id)
  //   }
  //   //reload page

  //   //check validity
  //   if (this.profile.id == this.UIUser.id) {
  //     this.isValid = true;
  //   } else {
  //     this.isValid = false;
  //   }
  //   this.UICheck();

  // }

  handleFileInput(files: FileList) {
    this.profileImgFile = files.item(0);
    
  }



  // //get user info from url 
  // getUser(){
  //   //assign to new attendee
  //   var user: string;
  //   //setup user for view

    
  //   return user;
  // }

  // getProfile(id){
  //   var newProfile: User;
  //   var attendee: Attendee;
  //   var company: Company;
  //   var type = this.getType(id)
  //   if(type == "Attendee"){
  //     //load from attendee
  //     this.attendeeService.getAttendee(id).subscribe((data) => {
  //       attendee = data
  //       newProfile.convertFromAttendee(attendee)
  //     })
  //     //convert to UI
  //   }else if(type == "Company"){
  //     //load from company
  //     this.companyService.getCompany(id).subscribe((data) => {
  //       company = data
  //       //convert
  //     })
  //     //convert to UI
  //   }else{
  //     newProfile = new User(id);
  //   }
  //   return newProfile;
  // }



  //get passed id of profile to view
  // getCurrentPageID(){
  //   var id;
  //   this.route.params.subscribe(params => {id = params['id']});
  //   if(id)
  //     return id;
  //   else
  //     return "";
  // }

  // //get user type
  // getType(id){
  //   var type: string;
  //   this.userService.getUserType(id).subscribe((data) =>{
  //     type = data;
  //   })
  //   return type;
  // }

  //get states from db
  getStates(){
    var states: string[] = [];
    this.stateService.getStates().subscribe((data) => {
      this.stateObjs = data;
      //convert from objects to a string of state names
      this.stateObjs.forEach(state => {
        states.push(state.stateName);
      });
    }), err => { console.log(err)}
    
    return states;
  }
  
  submit(){
    // //submit to database
    // if (this.UIUser.type == "Attendee"){
    //   var attendee: Attendee = this.UIUser.convertToAttendee(this.UIUser, this.UIUser.id, null);
    //   if (this.newUser){
    //     //add user
    //   }else{
    //     //update user
    //   }
    // }
    // //submit images
    // //switch to view mode
    // this.switchMode();
    // this.debug();
  }

  //switch views based on controls
  switchMode(){
    //check validation
    //var err = this.authentication()

      if(this.isValid){
        if(this.viewMode){
          this.greeting = "Welcome Back, ".concat(this.UIUser.name);
          this.viewMode = false;
        }else{
          this.viewMode = true;
        }
      }
  
  }

  // UICheck(){
  //   //check user type
  //   if(this.profile.type == "Attendee"){
  //     this.isAttendee = true;
  //     //set UI to reflect attendee
  //     this.namePlaceholder = "Name";
  //     this.emailPlaceholder = "Email";
  //     this.phonePlaceholder = "Phone Number";
  //     if (this.isValid){
  //       this.tagText = "You are interested in these fields:";
  //       this.uploadImgText = "Upload Your Picture";
  //       this.tagDescription = "I am interested in: ";
  //       this.descriptionText = "Here's a look at your profile. Press the edit button to switch to edit mode.";
  //     }else{
  //       this.descriptionText = "";
  //       this.greeting = "Here's a look at " + this.profile.name + "'s profile.";
  //     }
  //   }else if(this.profile.type == "Company"){
  //     //set UI to reflect company
  //     this.isAttendee = false;
  //     this.greeting = "Welcome Back, ".concat(this.UIUser.name);
  //     this.namePlaceholder = "Company Name";
  //     this.emailPlaceholder = "Contact Email";
  //     this.phonePlaceholder = "Contact Phone Number";
  //     this.urlPlaceholder = "Your Company Url";
  //     if (this.isValid){
  //       this.tagText = "Tags which your company is interested in (click to remove)";
  //       this.uploadImgText = "Upload Company Picture";
  //       this.tagDescription = this.UIUser.name + " is interested in: ";
  //       this.descriptionText = "Here's a look at your company profile. Press the edit button to switch to edit mode.";
  //     }else{
  //       this.descriptionText = "";
  //       this.greeting = "Here's a look at " + this.profile.name + "'s profile.";
  //     }
      
  //   }

    // //set greeting
    // if(this.viewMode){
    //   if(this.isValid){
    //     this.greeting = "Welcome Back, ".concat(this.UIUser.name);

    //   }else{
    //     this.descriptionText = "";
    //     this.greeting = "Here's a look at " + this.profile.name + "'s profile.";
    //   } 
    // }else{
    //   if (this.isValid && this.profile.name != "") {
    //     this.greeting = "Welcome Back, ".concat(this.UIUser.name);

    //   } else {
    //     this.greeting = "Lets get started with your profile!";
    //   }
    // }
  

  // //form authentication
  // authentication(){
  //   var prof = this.profile;
  //   if(prof.type == "attendee"){    //check for attendee type
  //     if (
  //       prof.name || prof.email || prof.phoneNumber || prof.degree || prof.college == ""
  //     ){
  //       return "Please fill out all fields!"
  //     }
  //     if (prof.imgLink || prof.resumeLink == "" ){ return "Please upload a profile picture and resume!"}
  //     if (prof.tags.length == 0){ return "Please add some tags to your profile!"}
  //   }
  //   return "";
  // }

  // //debug user object
  // debug(){
  //   console.log(this.UIUser, this.profile);
  // }

  hasTags(){
    if (this.profile.chips){
      return (this.profile.chips.length != 0)
    }
    else{
      return false;
    }
  }



  //add career tag to user
  addTag(){
    var tag = this.currTag;
    console.log(tag);
    if(this.viewMode){
      if (!this.profile.chips.includes(tag)){
        this.profile.chips.push(tag);
      }
    }
  }

  removeTag(tag: Tags){
    if(this.viewMode){
      this.profile.chips.splice(this.profile.chips.findIndex((index) => { return index == tag}), 1)
      document.getElementById(tag.tag).remove
    }
  }
}