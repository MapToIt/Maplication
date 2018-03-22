import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  
  isUser = false;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router) {
   }

  ngOnInit() {
  }



  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['*']);
  }

}
