import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { UserService } from '../services/user-service/user.service';
import { EventAttendanceService } from '../services/event-attendance-service/event-attendance.service';
import { CompanyService } from '../services/company-service/company.service';
import { FileUploadService } from '../services/file-upload-service/file-upload.service';
import { Company } from '../shared/domain-model/company';
import { State } from '../shared/domain-model/state';
import { StatesService } from '../services/states-service/states.service';
import { ChipService } from '../services/chip-service/chip.service';
import { Tags } from '../shared/domain-model/tags';
import { Globals } from '../shared/globals';
import * as  moment from 'moment';
import { EventAttendance } from '../shared/domain-model/eventAttendance';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { EmploymentTypes } from '../shared/domain-model/employment-types';
import { SalaryTypes } from '../shared/domain-model/salary-types';
import { SalaryTypeService } from '../services/salary-type-service/salary-type.service';
import { EmploymentTypeService } from '../services/employment-type-service/employment-type.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  //company variable declarations
  uid:string;
  currentUser: firebase.User;
  isProfileUser: boolean;
  changeMade: boolean = false;
  isProfile: boolean = true;
  profile: Company = new Company();
  now: Date = new Date();
  states: State[];
  chips: Tags[];
  newTag: Tags;
  companyChips: String[];
  employmentTypes: EmploymentTypes[];
  salaryTypes: SalaryTypes[];
  events: EventAttendance[];
  futureEvents: EventAttendance[] = [];
  file:any;
  mask:any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  successMessage: string;
  failMessage: string;
  private _success = new Subject<string>();
  private _fail = new Subject<string>();

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.states.filter(v => v.stateName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {stateName: string}) => x.stateName;

  searchTags = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.chips.filter(v => v.tag.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatterTag = (x: {tag: string}) => x.tag;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private _StatesService: StatesService, private _ChipService: ChipService,
              private _CompanyService: CompanyService, private _UserService: UserService,
              private _EventAttendanceService: EventAttendanceService,
              private _SalaryTypesService: SalaryTypeService,
              private _EmploymentTypesService: EmploymentTypeService,
              private _FileUploadService: FileUploadService, private globals: Globals,
              private route: ActivatedRoute, private router: Router) {
               
      this.route.params.subscribe( params => this.uid = params['id']);
      console.log(this.uid);

      this._UserService.getUserType(this.uid).subscribe((userType) => {
        if(userType != null)
        {
          if (userType.toLowerCase() == "company")
          {
            this._CompanyService.getCompany(this.uid).subscribe((profile) => {
              this.profile = profile;           
              this.companyChips = profile.chips ? JSON.parse(profile.chips) : new Array();
            });
          }
          else
          {
            this.router.navigate(['*']);
          }
        }
      });

      this.currentUser = this.globals.currentUser;
      
      //check if user logged in is profile owner
      this.isProfileUser = this.uid == this.currentUser.uid;
      console.log((!this.globals.isAttendee && !this.globals.isCoordinator && !this.isProfileUser), ' = ',
            !this.globals.isAttendee, !this.globals.isCoordinator, !this.isProfileUser)
      if(!this.globals.isAttendee && !this.globals.isCoordinator && !this.isProfileUser)
      {
        this.router.navigate(['*']);
      }

      this._StatesService.getStates().subscribe((states) => {
        this.states = states;
      });

      this._ChipService.getChips().subscribe((chips) => {
        this.chips = chips;
      });   
      
      this._EventAttendanceService.GetEventAttendanceByUser(this.uid).subscribe((rsvps) => {
        this.events = rsvps;
        this.futureEvents=rsvps.filter(event => moment(event.event.startTime) >= moment());
      });

      this._EmploymentTypesService.getEmploymentTypes().subscribe((types) => {
        this.employmentTypes = types;
      });

      this._SalaryTypesService.getSalaryTypes().subscribe((types) => {
        this.salaryTypes = types;
      });
   }

   ngOnInit(): void {
    this._success.subscribe((message) => this.successMessage = message);
    this._fail.subscribe((message) => this.failMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
    debounceTime.call(this._fail, 5000).subscribe(() => this.failMessage = null);
  }  

  updateCompany(){
    this.profile.chips = JSON.stringify(this.companyChips);
    this.profile.phoneNumber = this.profile.phoneNumber.replace(/\D+/g, '');
    console.log(this.profile);
    if (!(this.profile.city && this.profile.companyName && this.profile.phoneNumber && 
          this.profile.state && this.profile.street && this.profile.streetNumber)){
      alert("Please complete all fields of your profile before saving.");
    } else {
      this._CompanyService.updateCompany(this.profile).subscribe(
        data => {
          if(data != null){
            this.changeMade = false;
            this._success.next('Company successfully updated');
            this.router.navigate(['company-profile', this.afAuth.auth.currentUser.uid]);
          }
        },
        err => {
          this._fail.next('Failed to update profile.');
        }
      );
    }
  }

  addChip(newChip){
    if(!this.companyChips.includes(newChip.tag)){
      this.companyChips.push(newChip.tag);
      this.newTag = null;
      this.changeMade = true;
    }
  }

  deleteChip(chip: string) {
    const index: number = this.companyChips.indexOf(chip);
    this.companyChips.splice(index, 1);
    this.changeMade = true;
  }

  handleFileInputImg(files: any[]) {
    var file: File = files[0];

    this._FileUploadService.uploadFile(file).subscribe(
      (data) => {
        this.profile.logo = data;
        this.updateCompany();
      }
    )
  }

  goToEvent(eventId){
    this.router.navigate(['event', eventId]); 
  }

  goToAttendee(eventId){
    this.router.navigate(['attendee-list', eventId]); 
  }

}
