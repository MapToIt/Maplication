import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Globals } from '../../shared/globals';
import { Coordinator } from '../../shared/domain-model/coordinator';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

@Injectable()
export class CoordinatorService {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
    private http: HttpClient, private globals: Globals) { }

  getCoordinators(){
    return this.http.get<Coordinator[]>(Globals.apiUrl + `Coordinator`);
  }
  
  getCoordinatorById(uid:string){
    return this.http.get<Coordinator>(Globals.apiUrl + `Coordinator/${uid}`);
  }

  addCoordinator(user:Coordinator){
    return this.http.post<Coordinator>(Globals.apiUrl + `Coordinator`, user);
  }

  updateCoordinator(user:Coordinator){
    return this.http.put<Coordinator>(Globals.apiUrl + `Coordinator`, user);
  }

}
