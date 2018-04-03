import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { HttpModule, Http, Response, Headers, RequestOptions } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Table } from '../../shared/domain-model/table';
import { Globals } from '../../shared/globals';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { catchError } from 'rxjs/operators';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';

@Injectable()
export class TableService {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private http: HttpClient, private globals: Globals) { }

  GetTablesByMap(mapId:number){
    return this.http.get<Table[]>(Globals.apiUrl + `map/tables/${mapId}`);
  }

  AddTable(table:Table){
    var tempTable = {TableId: table.tableId, MapId: table.mapId, CompanyId: table.companyId,
                     XCoordinate: table.xCoordinate, YCoordinate: table.yCoordinate,
                     Width: table.width, Height: table.height};
    //var toSend = JSON.stringify(tempTable);
    console.log(tempTable);
    this.http.post(Globals.apiUrl + `map/tables/add`, tempTable)
      .catch(this.handleError)
      .subscribe(
        data => console.log('success', data),
        error => console.log('oops', error)
      );
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
