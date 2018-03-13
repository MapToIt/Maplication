import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  
  isUser = false;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase) {
   }

  ngOnInit() {
  }

  logout() {
    this.afAuth.auth.signOut();
  }

}
