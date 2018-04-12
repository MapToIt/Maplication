import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { Globals } from '../shared/globals';
import { UserService } from '../services/user-service/user.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

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
  

  constructor(public activeModal: NgbActiveModal,
    public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
    private _UserService: UserService, private route: ActivatedRoute, 
    private router: Router, private globals:Globals) 
  { 
    
  }

  ngOnInit() 
  {
    
  }

  successCallback(data: FirebaseUISignInSuccess) {
    this.globals.currentUser = data.currentUser;
    this._UserService.getUserType(data.currentUser.uid).subscribe((userType) => {
      if(userType != null)
      {
        if(userType.toLowerCase() == "attendee")
        {
          this.globals.isAttendee = true;
          this.activeModal.close();
          this.router.navigate(['event-list-view']);
        }
        else if(userType.toLowerCase() == "company")
        {
          this.globals.isCompany = true;
          this.activeModal.close();
          this.router.navigate(['event-list-view']);
        }
        else if (userType.toLowerCase() == "coordinator")
        {
          this.globals.isCoordinator = true;
          this.activeModal.close();
          this.router.navigate(['coord-home', data.currentUser.uid]);
        }
        else
        {
          this.activeModal.close();
          this.router.navigate(['*']);
        }
      } 
      else 
      {
        this.activeModal.close();
        this.router.navigate(['registration']);
      }      
    });
  }
}
