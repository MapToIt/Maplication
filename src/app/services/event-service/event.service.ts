import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Map } from '../../shared/domain-model/map';
import { Event } from '../../shared/domain-model/event';
import { Globals } from '../../shared/globals';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { EventFilter } from '../../shared/filter/eventFilter';
import { State } from '../../shared/domain-model/state';

@Injectable()
export class EventService {

  constructor(private http: HttpClient, private globals: Globals) { }

  GetEventByCoordId(coordId:number){
    return this.http.get<Event[]>(Globals.apiUrl + `event/coordinator/${coordId}`);
  }

  GetEvents()
  {
    return this.http.get<Event[]>(Globals.apiUrl + `event/details`);
  }

  GetFutureEvents()
  {
    return this.http.get<Event[]>(Globals.apiUrl + `event/futureEvents`);
  }

  GetEventsByFilter(start:Date, end:Date, state:State, isCompany:boolean){
    var filter = new EventFilter();
    filter.Start = start;
    filter.End = end;
    filter.State = state;
    filter.IsCompany = isCompany;

    return this.http.post<Event[]>(Globals.apiUrl + `event/filter`, filter);
  }
}