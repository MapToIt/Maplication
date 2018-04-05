import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { State } from '../shared/domain-model/state';
import { StatesService } from '../services/states-service/states.service';
import { Event } from '../shared/domain-model/event';
import { RSVP } from '../shared/filter/rsvp';
import { EventService } from '../services/event-service/event.service';
import { EventAttendanceService } from '../services/event-attendance-service/event-attendance.service';
import { UserService } from '../services/user-service/user.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { Globals } from '../shared/globals';
import { CompanyService } from '../services/company-service/company.service';
import { Company } from '../shared/domain-model/company';

@Component({
  selector: 'app-event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})

export class EventListViewComponent implements OnInit {
  events: any;
  states: State[];
  start: NgbDate;
  end: NgbDate;
  state:State;
  page = 1;
  currentUser: firebase.User;
  userType: string;
  company: Company = null;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.states.filter(v => v.stateName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {stateName: string}) => x.stateName;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private _StatesService: StatesService, 
              private _EventService: EventService, 
              private _CompanyService: CompanyService,
              private _EventAttendanceService: EventAttendanceService, 
              private _UserService:UserService,
              private route: ActivatedRoute, private router: Router, 
              public globals:Globals) {
               
                console.log("globals: ", globals.isAttendee, globals.isCompany, globals.isCoordinator);

    if(this.globals.currentUser == null || (!this.globals.isCompany && !this.globals.isAttendee)){
      this.router.navigate(['*']);
    }

    var date = new Date();
    console.log (date, date.getDate());
    var ngbDateStruct = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};
    console.log(ngbDateStruct);
    this.start = new NgbDate(ngbDateStruct.year, ngbDateStruct.month + 1, ngbDateStruct.day);
    this.end = new NgbDate(ngbDateStruct.year, ngbDateStruct.month + 2, ngbDateStruct.day);
    this.state = null;

    if (this.globals.isCompany){
      this._CompanyService.getCompany(this.globals.currentUser.uid).subscribe((company) => {
        this.company = company;
        this.updateEvents(); 
      })
    } else {
      this.updateEvents();
    }

    this._StatesService.getStates().subscribe((states) => {
      this.states = states;
    });   
     
   }

  ngOnInit() {
  }

  updateEvents(){
    var start = this.start ? new Date(this.start.year, this.start.month - 1, this.start.day) : null;
    var end = this.end ? new Date(this.end.year, this.end.month - 1, this.end.day) : null;
    console.log("in updateEvents(): ", this.userType);

    this._EventService.GetEventsByFilter(start, end, this.state, this.globals.isCompany, this.company.companyId).subscribe((events) => {
      this.events = events;

      this._EventAttendanceService.GetEventAttendanceByUser(this.globals.currentUser.uid).subscribe((rsvps) => {
        this.events.forEach(event => {
          if (rsvps.find(function(rsvp) {
              return rsvp.event.eventId == event.eventId;
            })){
              event.rsvp = true;
          }
          else {
            event.rsvp = false;
          }
        });
        console.log(this.events);
      });
    });
    
  }

  rsvp(eventId: number){
    let rsvp = new RSVP();
    rsvp.Event = eventId;
    rsvp.UserId = this.globals.currentUser.uid;
    rsvp.UserType = this.userType;
    this._EventAttendanceService.updateRSVP(rsvp).subscribe((addedRsvp) => {
      console.log(addedRsvp);
      this.updateEvents();
    });    
  }

  goToMap(eventId: number){
    this.router.navigate(['event', eventId]);
  }

  goToAttendeeList(eventId: number){
    this.router.navigate(['attendee-list', eventId]);
  }
}
