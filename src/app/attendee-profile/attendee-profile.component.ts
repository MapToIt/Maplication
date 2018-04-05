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
import { StatesService } from '../services/states-service/states.service';
import { UserService} from '../services/user-service/user.service';
import {AttendeeService} from '../services/attendee-service/attendee.service';
import {CompanyService} from '../services/company-service/company.service';
import {FileUploadService} from '../services/file-upload-service/file-upload.service';
import { Tags } from '../shared/domain-model/tags';
import { forEach } from '@angular/router/src/utils/collection';
import { ChipService } from '../services/chip-service/chip.service';
import { State } from '../shared/domain-model/state';
import { Globals } from '../shared/globals';

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
  stateObjs: State[];
  states: string[];
  profile: Attendee = new Attendee();
  uid: string;
  currentUser: firebase.User;
  mask:any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
  attendeeChips: String[];
  newTag: Tags;


  searchTags = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.fieldTags.filter(v => v.tag.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatterTag = (x: {tag: string}) => x.tag;
  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private cdr: ChangeDetectorRef, private statesService: StatesService,
              private userService: UserService, private attendeeService: AttendeeService, 
              private companyService: CompanyService, private route: ActivatedRoute, 
              private router: Router, private fileUploadService: FileUploadService,
              private tagsService: ChipService, public globals: Globals) {

      this.route.params.subscribe( params => this.uid = params['id']);

      this.currentUser = this.globals.currentUser;
      
      //check validity
      if (this.uid == this.currentUser.uid){
        this.isValid = true;
        this.greeting = `Welcome back, ${this.profile.fullName}!`;
      }else{
        this.isValid = false;
        this.greeting = `Here's a look at ${this.profile.fullName}'s profile`;      
      }
    

      if (this.globals.isCompany || (this.globals.isAttendee && this.globals.currentUser.uid == this.uid))
      {
        this.attendeeService.getAttendee(this.uid).subscribe((attendee) => {
          this.profile = attendee;
          if (!this.profile.fullName){
            this.profile.fullName = attendee.firstName + ' ' + attendee.lastName
          }
          if (!this.profile.image){
            this.profile.image = "/assets/placeholder.png";
          }
          this.attendeeChips = attendee.chips ? JSON.parse(attendee.chips) : new Array();
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
    this.statesService.getStates().subscribe((data) => {
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
  
  addChip(newChip){
    if(!this.attendeeChips.includes(newChip.tag)){
      this.attendeeChips.push(newChip.tag);
      this.newTag = null;
    }
  }

  deleteChip(chip: string) {
    const index: number = this.attendeeChips.indexOf(chip);
    this.attendeeChips.splice(index, 1);
  }

  submit(){
    //submit to database
    if (this.authentication()){
      this.profile.chips = JSON.stringify(this.attendeeChips);
      this.attendeeService.updateAttendee(this.profile).subscribe(
        (data) => {console.log("Submitting to db")},
        (err) => {console.log(err)},
        () => {console.log("Success")}
      )
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
    if ((prof.firstName == null || prof.email == null || prof.phoneNumber == null || prof.degree == null || prof.university == null))
    {
      return false;
    }
    if ((prof.image == null || prof.resume == null)){ return false }
    if (prof.chips == ""){ return false}
    return true;
  }


  // //debug user object
  debug(files){
    console.log(files);
  }



  // //add career tag to user
  // addTag(){
  //   if(this.viewMode){
  //     //get tag object that matches string tag
  //     var tag: Tags = this.fieldTags.find((tag: Tags) => {return this.currTag == tag.tag});
  //     var str = JSON.stringify(tag);
  //     this.profile.chips += str;
  //   }
  // }

  // removeTag(tag: string){
  //   if(this.viewMode){
  //     var userTags: Tags[] = this.profile.chips != "" ? JSON.parse(this.profile.chips) : [];
  //     userTags.splice(userTags.findIndex((index) => { return index.tag == tag}), 1)
  //     document.getElementById(tag).remove
  //     this.profile.chips = JSON.stringify(userTags);
  //   }
  // }


}