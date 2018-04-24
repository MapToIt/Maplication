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
import { JobPostings } from '../shared/domain-model/jobPostings';
import { JobModalComponent } from './job-modal/job-modal.component';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../services/job-service/job.service';
import { State } from '../shared/domain-model/state';

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
  isProfile: boolean = true;
  profile: Company = new Company();
  now: Date = new Date();
  chips: Tags[];
  companyChips: String[];
  states: State[];
  jobs: JobPostings[];
  events: EventAttendance[];
  futureEvents: EventAttendance[] = [];
  file:any;
  streetAddress:string;
  mask:any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  successMessage: string;
  failMessage: string;
  private _success = new Subject<string>();
  private _fail = new Subject<string>();

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private _CompanyService: CompanyService, private _UserService: UserService,
              private _EventAttendanceService: EventAttendanceService,
              private globals: Globals, private modalService: NgbModal,
              private _JobService: JobService, private _StateService: StatesService,
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
              this.streetAddress = this.profile.streetNumber + " " + this.profile.street;
              this._JobService.GetJobPostingsByCompanyId(this.profile.companyId).subscribe((companyJobs) =>{
                this.jobs = companyJobs;
                console.log(this.jobs);
              });
            
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
      
      this._EventAttendanceService.GetEventAttendanceByUser(this.uid).subscribe((rsvps) => {
        this.events = rsvps;
        this.futureEvents=rsvps.filter(event => moment(event.event.startTime) >= moment());
      });

      this._StateService.getStates().subscribe((states)=> {
        this.states = states;
      });
   }

   ngOnInit(): void {
    this._success.subscribe((message) => this.successMessage = message);
    this._fail.subscribe((message) => this.failMessage = message);
    debounceTime.call(this._success, 5000).subscribe(() => this.successMessage = null);
    debounceTime.call(this._fail, 5000).subscribe(() => this.failMessage = null);
  }  


  failedMessage($e){
    this._fail.next($e);
  }

  succeedMessage($e){
    this._success.next($e);
  }

  openJobModal(companyId: number){
    let job = new JobPostings();
    job.companyId = companyId;

    let options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(JobModalComponent, options);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.notify.subscribe(($e) => {
      this._success.next($e);
    })
    modalRef.componentInstance.fail.subscribe(($e) => {
      this._fail.next($e);
    });
  }

  updateJobs($e){

  }

}
