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
import {FileUploadService} from '../services/file-upload-service/file-upload.service';
import { TagsService } from '../services/tags-service/tags.service'
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
  fieldTags: Tags[] =[];
  stringTags: string[] = [];
  currTag: string;
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
              private router: Router, private fileUploadService: FileUploadService,
              private tagsService: TagsService) {

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
              if (!this.profile.image){
                this.profile.image = "/assets/placeholder.png";
              }
              if(!this.profile.chips){
                this.profile.chips = new Array<Tags>();
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
    this.tagsService.getTags().subscribe((data) => {
      this.fieldTags = data;
      this.fieldTags.forEach(
        (tag: Tags) => {this.stringTags.push(tag.tag)}
    )
    }), err => { console.log(err) }
  }
  
  submit(){
    //submit to database
    console.log(this.profile);
    this.attendeeService.updateAttendee(this.profile).subscribe(
      () => {console.log("Successfully submitted to db")},
      (err) => {console.log(err)}
     )
    //submit images
    //switch to view mode
    this.switchMode();
  }

  //switch views based on controls
  switchMode(){
    //check validation
    //var err = this.authentication()

      if(this.isValid){
        if(this.viewMode){
          this.greeting = "Welcome Back, ".concat(this.profile.fullName);
          this.viewMode = false;
        }else{
          this.viewMode = true;
        }
      }
  
  }

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
    var tag = this.currTag;
    var tagObj: Tags = this.fieldTags.find((t: Tags) => {return t.tag == tag})

    if(this.viewMode){
      if(!this.profile.chips.includes(tagObj)){
        this.profile.chips.push(tagObj);
      }
    }
  }

  removeTag(tag: string){
    if(this.viewMode){
      this.profile.chips.splice(this.profile.chips.findIndex((index) => { return index.tag == tag}), 1)
      document.getElementById(tag).remove
    }
  }
}