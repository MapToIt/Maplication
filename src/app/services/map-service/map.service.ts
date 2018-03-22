import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
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

@Injectable()
export class MapService {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private http: HttpClient, private globals: Globals) { }

  GetMapById(eventId:number){
    return this.http.get<Map>(Globals.apiUrl + `map/details/${eventId}`);
  }

}
