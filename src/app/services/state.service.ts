export interface stateObj{
  stateId: number;
  stateName: string;
}
import { Globals } from './../shared/globals';
import { Injectable } from '@angular/core';
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

@Injectable()
export class StateService {

  constructor(private http: HttpClient) { }

  //get observable array of all states
  getStates(){
    return this.http.get<stateObj[]>(Globals.apiUrl +'State')
  }

}
