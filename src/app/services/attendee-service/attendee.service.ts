import { Injectable } from '@angular/core';
import { Globals } from '../../shared/globals';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { Attendee } from '../../shared/domain-model/attendee'

@Injectable()
export class AttendeeService {

  constructor(private http: HttpClient) { }

  getAttendee(id: string){
    return this.http.get<Attendee>(Globals.apiUrl + 'Attendee/' + id)
  }

  updateAttendee(attendee: Attendee){
    this.http.post(Globals.apiUrl + 'Attendee', attendee)
  }

  addAttendee(attendee: Attendee){
    this.http.put(Globals.apiUrl + 'Attendee', attendee);
  }
}