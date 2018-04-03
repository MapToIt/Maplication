import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { Globals } from '../../shared/globals';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { RSVP } from '../../shared/filter/rsvp';
import { EventAttendance } from '../../shared/domain-model/eventAttendance';


@Injectable()
export class EventAttendanceService {

  constructor(private http: HttpClient, private globals: Globals) { }

  GetAttendeeAttendanceByEvent(eventId:number){
    return this.http.get<EventAttendance[]>(Globals.apiUrl + `eventattendance/attendee/${eventId}`);
  }

  GetCompanyAttendanceByEvent(eventId:number){
    return this.http.get<EventAttendance[]>(Globals.apiUrl + `eventattendance/company/${eventId}`);
  }

  GetAllAttendanceByEvent(eventId:number){
    return this.http.get<EventAttendance[]>(Globals.apiUrl + `eventattendance/event/${eventId}`);
  }

  GetEventAttendanceByUser(userId:string){
    return this.http.get<EventAttendance[]>(Globals.apiUrl + `eventattendance/user/${userId}`);
  }

  updateRSVP(rsvp: RSVP) {
    return this.http.put<RSVP>(Globals.apiUrl + 'eventattendance', rsvp)
  }

}
