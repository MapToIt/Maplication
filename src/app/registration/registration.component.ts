import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { CoordinatorService } from '../services/coordinator/coordinator.service';
import { Attendee } from '../shared/domain-model/attendee';
import { Company } from '../shared/domain-model/company';
import { Coordinator } from '../shared/domain-model/coordinator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
    private _CoordinatorService: CoordinatorService, private route: ActivatedRoute, 
    private router: Router) { }

    currentUser: firebase.User;

  ngOnInit() {
    this.currentUser = this.afAuth.auth.currentUser;
  }

  createAttendee(){

  }

  createCompany(){

  }

  createCoordinator(){
    var coordinator = new Coordinator();
    if(this.currentUser){
      coordinator.coordinatorId = 0;
      coordinator.email = this.currentUser.email;
      coordinator.firstName = this.currentUser.displayName.split(' ')[0];
      coordinator.lastName = this.currentUser.displayName.split(' ')[1];
      coordinator.phoneNumber = null;
      coordinator.userId = this.currentUser.uid;
    }

    this._CoordinatorService.addCoordinator(coordinator);
  }

}
