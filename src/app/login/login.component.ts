import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { UserService } from '../services/user-service/user.service';

export class AuthService {
  private currentUser: firebase.User = null;
  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }
    return true;
  }
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {

  private currentUser: firebase.User = null;
  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private _UserService: UserService, private route: ActivatedRoute, 
              private router: Router) 
  { 
    
  }

  ngOnInit() 
  {
    this.afAuth.authState.subscribe((response) => this.firebaseAuthChangeListener(response));
  }

  firebaseAuthChangeListener(response) 
  {
    if (this.currentUser){
      if (response == null)
      {
        console.log('Logged out :(');
        this.router.navigate(['*']);
      }

    }
    else
    {
      this.currentUser = response;
      if (response) {
        this._UserService.getUserType(response.uid).subscribe((userType) => {
              if(userType != null)
              {
                if(userType.toLowerCase() == "company" || userType.toLowerCase() == "attendee")
                {
                  this.router.navigate(['event-list-view']);
                }
                else if (userType.toLowerCase() == "coordinator")
                {
                  this.router.navigate(['coord-home', {id: response.uid}]);
                }
                else
                {
                  this.router.navigate(['*']);
                }
              } 
              else 
              {
                this.router.navigate(['registration']);
              }      
            });
      } 
    }
  }

  isLoggedIn() {
    if (this.currentUser == null) {
      return false;
    }
    return true;
  }

  logout() 
  {
    this.afAuth.auth.signOut();
    this.router.navigate(['*']);
  }

}
