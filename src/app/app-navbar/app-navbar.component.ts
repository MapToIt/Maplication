import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user-service/user.service';
import * as firebase from 'firebase/app';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  navbarCollapsed: boolean = true;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router, 
    private _UserService: UserService, public globals: Globals) {
   }

  ngOnInit() {
  }



  logout() {
    this.afAuth.auth.signOut();
    this.globals.isAttendee = false;
    this.globals.isCompany = false;
    this.globals.isCoordinator = false;
    this.router.navigate(['*']);
  }

  goToProfile(){
    if (this.globals.isAttendee)
    {
      this.router.navigate(['attendee-profile', this.afAuth.auth.currentUser.uid]);
    }
    else if (this.globals.isCompany)
    {
      this.router.navigate(['company-profile', this.afAuth.auth.currentUser.uid]);
    }
    else
    {
      this.router.navigate(['coord-home', this.afAuth.auth.currentUser.uid]);
    }
  }

  goToNotes(){
    this.router.navigate(['notes', this.afAuth.auth.currentUser.uid]);          
  }

  goToLogin(){
    this.router.navigate(['login']);
  }

  goToEvents(){
    this.router.navigate(['event-list-view']);
  }

  goToAbout(){
    this.router.navigate(['about']);
  }

}
