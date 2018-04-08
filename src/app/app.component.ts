import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase/app';
import { Globals } from '../app/shared/globals';
import { UserService } from '../app/services/user-service/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  currentUser: firebase.User;
  items: AngularFireObject<any[]>;
  msgVal: string = '';

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              public globals: Globals, private _UserService: UserService) {
      this.afAuth.authState.subscribe((user) => {
        if(user == null) { this.globals.appLoaded = true; }
        else{
          this.globals.currentUser = user;
          this._UserService.getUserType(user.uid).subscribe((userType) => {
            if(userType != null)
            {
              if(userType.toLowerCase() == "attendee")
              {
                this.globals.isAttendee = true;
                this.globals.appLoaded = true;
              }
              else if(userType.toLowerCase() == "company")
              {
                this.globals.isCompany = true;
                this.globals.appLoaded = true;
              }
              else if (userType.toLowerCase() == "coordinator")
              {
                this.globals.isCoordinator = true;
                this.globals.appLoaded = true;
              }
            }  
          });
        }
      });
      
      
  }

  title = 'Maplication';
}
