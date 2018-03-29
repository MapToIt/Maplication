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
import { Tags } from '../../shared/domain-model/tags';

@Injectable()
export class ChipService {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
    private http: HttpClient, private globals: Globals) { }

    getChips(){
      return this.http.get<Tags[]>(Globals.apiUrl + `Chips`);
    }

}
