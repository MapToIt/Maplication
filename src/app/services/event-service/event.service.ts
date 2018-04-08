import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Map } from '../../shared/domain-model/map';
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
import { Event } from '../../shared/domain-model/event';

@Injectable()
export class EventService {

  constructor(private http: HttpClient, private globals: Globals) { }

  GetEventByCoordId(coordId:number){
    return this.http.get<Event[]>(this.globals.apiUrl + `event/coordinator/${coordId}`);
  }

  GetEvents()
  {
    return this.http.get<Event[]>(this.globals.apiUrl + `event/details`);
  }

  GetEventById(id:number){
    return this.http.get<Event>(this.globals.apiUrl + `event/Details/${id}`);
  }

  GetFutureEvents()
  {
    return this.http.get<Event[]>(this.globals.apiUrl + `event/futureEvents`);
  }

  GetEventsByFilter(start:Date, end:Date, state:State, isCompany:boolean, companyId: number){
    var filter = new EventFilter();
    filter.Start = start;
    filter.End = end;
    filter.State = state;
    filter.IsCompany = isCompany;
    filter.CompanyId = companyId;

    return this.http.post<Event[]>(this.globals.apiUrl + `event/filter`, filter);
  }
}
