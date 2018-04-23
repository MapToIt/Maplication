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
import { Router } from '@angular/router';

@Injectable()
export class MapService {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private http: HttpClient, private globals: Globals, private router: Router) { }

  GetMapById(eventId:number){
    return this.http.get<Map>(this.globals.apiUrl + `map/details/${eventId}`);
  }

  AddMap(map: Map){
    console.log(JSON.stringify(map));
    return this.http.post<Map>(this.globals.apiUrl + `map/add`, map);
  }

  UpdateMap(map: Map){
    return this.http.put(this.globals.apiUrl + `map/update`, map);
  }

  DeleteTable(tableId: number){
    return this.http.delete(this.globals.apiUrl + `map/tables/${tableId}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(
      'Something bad happened; please try again later.');
  };

}
