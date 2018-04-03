import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { StateService } from '../services/state.service';
import { Event } from '../shared/domain-model/event';
import { Attendee } from '../shared/domain-model/attendee';
import { EventAttendanceService } from '../services/event-attendance-service/event-attendance.service';
import { UserService } from '../services/user-service/user.service';
import { AttendeeService } from '../services/attendee-service/attendee.service';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.css']
})
export class AttendeeListComponent implements OnInit {

  eventId:number;
  attendees: Attendee[] = new Array();

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private _EventAttendanceService: EventAttendanceService, private _UserService:UserService,
              private _AttendeeService: AttendeeService,
              private route: ActivatedRoute, private router: Router) { 

    this.route.params.subscribe( params => this.eventId = params['id']);
    this.afAuth.authState.subscribe((user) => {
      if(user == null){
        this.router.navigate(['*']);
      }

      this._UserService.getUserType(user.uid).subscribe((userType) => { 
        if(userType != null)
        {
          if (userType.toLowerCase() != "company")
          {
            this.router.navigate(['*']);
          }else{
            this._EventAttendanceService.GetAttendeeAttendanceByEvent(this.eventId).subscribe((rsvps)=> {
              rsvps.forEach(rsvp => {
                this._AttendeeService.getAttendee(rsvp.userId).subscribe((user) => {
                  if (!this.attendees.find(x => x.userId == rsvp.userId)){
                    this.attendees.push(user);
                  }                  
                });
              });
              console.log(this.attendees);
            });
          }
        } else {
          this.router.navigate(['*']);
        }
      });
    });
  }

  ngOnInit() {
  }

}
