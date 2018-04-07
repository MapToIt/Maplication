import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { CoordinatorService } from '../services/coordinator/coordinator.service';
import { AttendeeService } from '../services/attendee-service/attendee.service';
import { CompanyService } from '../services/company-service/company.service';
import { Attendee } from '../shared/domain-model/attendee';
import { Company } from '../shared/domain-model/company';
import { Coordinator } from '../shared/domain-model/coordinator';
import { Globals } from '../shared/globals';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
    private _CoordinatorService: CoordinatorService, 
    private _AttendeeService: AttendeeService, private _CompanyService: CompanyService, private route: ActivatedRoute, 
    private router: Router, public globals:Globals) {
      if(this.globals.isAttendee || this.globals.isCompany || this.globals.isCoordinator){
        this.router.navigate(['*']);
      }
     }

  ngOnInit() {
    
  }

  createAttendee(){
    var attendee = new Attendee();

    if (this.globals.currentUser){
      attendee.attendeeId = 0;
      attendee.email = this.globals.currentUser.email;
      attendee.firstName = this.globals.currentUser.displayName.split(' ')[0];
      attendee.lastName = this.globals.currentUser.displayName.split(' ')[1];
      attendee.chips = null;
      attendee.degree = null;
      attendee.image = null;
      attendee.phoneNumber = null;
      attendee.resume = null;
      attendee.university = null;
      attendee.userId = this.globals.currentUser.uid;

      this._AttendeeService.addAttendee(attendee).subscribe((attendee) => {
        this.router.navigate(['attendee-profile', this.globals.currentUser.uid]);
      });
    }

  }

  createCompany(){
    var company = new Company();

    if (this.globals.currentUser){
      company.chips = null;
      company.city = null;
      company.companyId = 0;
      company.companyName = null;
      company.logo = null;
      company.phoneNumber = null;
      company.stateId = null;
      company.street = null;
      company.streetNumber = null;
      company.url = null;
      company.userId = this.globals.currentUser.uid;
      company.zipCode = null;
    }
    this._CompanyService.addCompany(company).subscribe((addedCompany) => {
      this.router.navigate(['company-profile', this.globals.currentUser.uid]);
    });    

  }

  createCoordinator(){
    var coordinator = new Coordinator();

    if(this.globals.currentUser){
      coordinator.coordinatorId = 0;
      coordinator.email = this.globals.currentUser.email;
      coordinator.firstName = this.globals.currentUser.displayName.split(' ')[0];
      coordinator.lastName = this.globals.currentUser.displayName.split(' ')[1];
      coordinator.phoneNumber = null;
      coordinator.userId = this.globals.currentUser.uid;

      this._CoordinatorService.addCoordinator(coordinator).subscribe((user) => {
        this.router.navigate(['coord-home', this.globals.currentUser.uid]);
      })
    }
  }

}
