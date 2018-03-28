import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Globals } from '../../shared/globals';
import { Observable } from 'rxjs/Observable';
import { State } from '../../shared/domain-model/state';

@Injectable()
export class StatesService {

  constructor(private http: HttpClient, private globals: Globals) { }

  GetStates(){
    return this.http.get<State[]>(Globals.apiUrl + `state`);
  }

}
