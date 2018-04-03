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
import { StateService } from '../services/state.service';
import { Event } from '../shared/domain-model/event';
import { RSVP } from '../shared/filter/rsvp';
import { EventService } from '../services/event-service/event.service';
import { EventAttendanceService } from '../services/event-attendance-service/event-attendance.service';
import { UserService } from '../services/user-service/user.service';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';

@Component({
  selector: 'app-event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})

export class EventListViewComponent implements OnInit {
  events: any;
  states: State[];
  company:string;
  start: NgbDate;
  end: NgbDate;
  state:State;
  page = 1;
  currentUser: firebase.User;
  userType: string;

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.states.filter(v => v.stateName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {stateName: string}) => x.stateName;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private _StateService: StateService, private _EventService: EventService,
              private _EventAttendanceService: EventAttendanceService, private _UserService:UserService,
              private route: ActivatedRoute, private router: Router) {
               

      this.afAuth.authState.subscribe((user) => {
        if(user == null){
          this.router.navigate(['*']);
        }
        this.currentUser = user;

        this._UserService.getUserType(this.currentUser.uid).subscribe((userType) => { 
          if(userType != null)
          {
            this.userType = userType;
            console.log(this.userType);
            if (!(userType.toLowerCase() == "attendee" || userType.toLowerCase() == "company"))
            {
              this.router.navigate(['*']);
            }else{
              var date = new Date();
              console.log (date, date.getDate());
              var ngbDateStruct = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};
              console.log(ngbDateStruct);
              this.start = new NgbDate(ngbDateStruct.year, ngbDateStruct.month + 1, ngbDateStruct.day);
              this.end = new NgbDate(ngbDateStruct.year, ngbDateStruct.month + 2, ngbDateStruct.day);
              this.state = null;
              
              this.updateEvents();
            }
          } else {
            this.router.navigate(['*']);
          }
        });
      });
      
      this._StateService.getStates().subscribe((states) => {
        this.states = states;
      });   
     
   }

  ngOnInit() {
  }

  updateEvents(){
    var start = this.start ? new Date(this.start.year, this.start.month - 1, this.start.day) : null;
    var end = this.end ? new Date(this.end.year, this.end.month - 1, this.end.day) : null;
    console.log("in updateEvents(): ", this.userType);
    var isCompany = this.userType.toLowerCase() == "company";

    this._EventService.GetEventsByFilter(start, end, this.state, isCompany).subscribe((events) => {
      this.events = events;

      this._EventAttendanceService.GetEventAttendanceByUser(this.currentUser.uid).subscribe((rsvps) => {
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
      });
    });
    
  }

  rsvp(eventId: number){
    let rsvp = new RSVP();
    rsvp.Event = eventId;
    rsvp.UserId = this.currentUser.uid;
    rsvp.UserType = this.userType;
    this._EventAttendanceService.updateRSVP(rsvp).subscribe((rsvp) => {
      this.updateEvents();
    });    
  }

  goToMap(eventId: number){
    this.router.navigate(['event', eventId]);
  }
}
