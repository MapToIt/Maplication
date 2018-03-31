import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
import {FileUploadService} from '../services/file-upload-service/file-upload.service';
import { Tags } from '../shared/domain-model/tags';
import { forEach } from '@angular/router/src/utils/collection';
import { ChipService } from '../services/chip-service/chip.service';

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
  fieldTags: Tags[] =[];
  stringTags: string[] = [];
  currTag: string;
  stateObjs: stateObj[];
  states: string[];
  profile: Attendee = new Attendee();
  uid: string;
  currentUser: firebase.User;
  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private cdr: ChangeDetectorRef, private stateService: StateService,
              private userService: UserService, private attendeeService: AttendeeService, 
              private companyService: CompanyService, private route: ActivatedRoute, 
              private router: Router, private fileUploadService: FileUploadService,
              private tagsService: ChipService) {

      this.route.params.subscribe( params => this.uid = params['id']);
      console.log(this.uid);

      this.afAuth.authState.subscribe((user) => {
        this.currentUser = user;
        
        //check validity
        if (this.uid == this.currentUser.uid){
          this.isValid = true;
          this.greeting = `Here's a look at ${this.profile.fullName}'s profile`;
        }else{
          this.isValid = false;
          this.greeting = `Welcome back, ${this.profile.fullName}!`;
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
              if (!this.profile.image){
                this.profile.image = "/assets/placeholder.png";
              }
              if(!this.profile.chips){
                this.profile.chips = "";
              }
              //set greeting
              if (!this.isValid) {
                this.greeting = `Here's a look at ${this.profile.fullName}'s profile`;
              } else {
                this.greeting = `Welcome back, ${this.profile.fullName}!`;
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
      this.getTags();
      
    
    }

    ngOnInit() {

    // /*DEBUGGING*/
    // this.uid = this.myUID;
    // // this.profile.id = "NOT MY ID";
    // this.profile.type = "Company";
    // /*END DEBUGGING*/

  }

  handleFileInputImg(files) {
    var file: File = files[0];
    console.log(file)

      this.fileUploadService.uploadFile(file).subscribe(
        (data) => {
          this.profile.image = data;
        }
      )
  }

  handleFileInputRes(files) {
    var file: File = files[0];

    this.fileUploadService.uploadFile(file).subscribe(
      (data) => {
        this.profile.resume = data;
      }
    )
  }


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

  //get states from db
  getTags() {
    var tagObjs: any[] = [];
    this.tagsService.getChips().subscribe((data) => {
      this.fieldTags = data;
      this.fieldTags.forEach(
        (tag: Tags) => {this.stringTags.push(tag.tag)}
    )
    }), err => { console.log(err) }
  }
  
  submit(){
    //submit to database
    console.log(this.profile);
    if (this.authentication()){
      this.attendeeService.updateAttendee(this.profile).subscribe(
        () => {console.log("Successfully submitted to db")},
        (err) => {console.log(err)}
      )
      //submit images
      //switch to view mode
      this.switchMode();
      this.descriptionText = "";
    }else{
      this.descriptionText = "Please fill out all fields!";
    }
  }

  //switch views based on controls
  switchMode(){
    //check validation
    //var err = this.authentication()

      if(this.isValid){
        if(this.viewMode){
          this.viewMode = false;
        }else{
          this.viewMode = true;
        }
      }
  
  }

  //form authentication
  authentication(){
    var prof = this.profile;
    if (!(prof.firstName || prof.email || prof.phoneNumber || prof.degree || prof.university))
    {
      return false;
    }
    if (!(prof.image || prof.resume)){ return false}
    if (prof.chips.length == 0){ return false}
    return true;
  }


  // //debug user object
  debug(files){
    console.log(files);
  }

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
    if(this.viewMode){
      var tag = this.currTag;
      var tagObj: Tags = this.fieldTags.find((t: Tags) => { return t.tag == tag })
      var userTags: Tags[] = JSON.parse(this.profile.chips);
      if(!userTags.includes(tagObj)){
        userTags.push(tagObj);
      }
      this.profile.chips = JSON.stringify(userTags);
    }
  }

  removeTag(tag: string){
    if(this.viewMode){
      var userTags: Tags[] = JSON.parse(this.profile.chips);
      userTags.splice(userTags.findIndex((index) => { return index.tag == tag}), 1)
      document.getElementById(tag).remove
      this.profile.chips = JSON.stringify(userTags);
    }
  }

}