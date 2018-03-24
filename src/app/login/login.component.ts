import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {FirebaseUISignInSuccess} from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { UserService } from '../services/user-service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, private _UserService: UserService) { 
    
  }

  ngOnInit() {
  }

  successCallback(data: FirebaseUISignInSuccess) {
    console.log('successCallback', data);
    console.log('uid', data.currentUser.uid);
    this._UserService.getUserType(data.currentUser.uid).subscribe((userData) => {
      var userType = userData;
      console.log("User Type:", userType);
    });
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
