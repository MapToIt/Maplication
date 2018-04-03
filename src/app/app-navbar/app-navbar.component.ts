import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user-service/user.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {
  
  isUser = false;
  isAttendee = false;
  isCoordinator = false;
  isCompany = false;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router, 
    private _UserService: UserService) {
      this.afAuth.authState.subscribe((user) => {
        this._UserService.getUserType(user.uid).subscribe((userType) => {
        if(userType != null)
          {
            if (userType.toLowerCase() == "attendee")
            {
              this.isAttendee = true;
            }
            else if (userType.toLowerCase() == "company")
            {
              this.isCompany = true;
            }
            else
            {
              this.isCoordinator = true;
            }
          }
        });
      });
   }

  ngOnInit() {
  }



  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(['*']);
  }

  goToProfile(){
    this._UserService.getUserType(this.afAuth.auth.currentUser.uid).subscribe((userType) => {
      if(userType != null)
        {
          if (userType.toLowerCase() == "attendee")
          {
            this.isAttendee = true;
            this.router.navigate(['attendee-profile', this.afAuth.auth.currentUser.uid]);
          }
          else if (userType.toLowerCase() == "company")
          {
            this.isCompany = true;
            this.router.navigate(['company-profile', this.afAuth.auth.currentUser.uid]);
          }
          else
          {
            this.isCoordinator = true;
            this.router.navigate(['coord-home', this.afAuth.auth.currentUser.uid]);
          }
        }
    });
  }

}
