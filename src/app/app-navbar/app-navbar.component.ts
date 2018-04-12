import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../services/user-service/user.service';
import * as firebase from 'firebase/app';
import { Globals } from '../shared/globals';
import { LoginComponent } from '../login/login.component';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  navbarCollapsed: boolean = true;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
    private route: ActivatedRoute, private router: Router, 
    public modalService: NgbModal,
    private _UserService: UserService, public globals: Globals) {
   }

  ngOnInit() {
  }



  logout() {
    this.afAuth.auth.signOut();
    this.globals.isAttendee = false;
    this.globals.isCompany = false;
    this.globals.isCoordinator = false;
    this.navbarCollapsed=true;
    this.router.navigate(['*']);
  }

  goToProfile(){
    if (this.globals.isAttendee)
    {
      this.router.navigate(['attendee-profile', this.afAuth.auth.currentUser.uid]);
      this.navbarCollapsed=true;
    }
    else if (this.globals.isCompany)
    {
      this.router.navigate(['company-profile', this.afAuth.auth.currentUser.uid]);
      this.navbarCollapsed=true;
    }
    else
    {
      this.router.navigate(['coord-home', this.afAuth.auth.currentUser.uid]);
      this.navbarCollapsed=true;
    }
  }

  goToNotes(){
    this.router.navigate(['notes', this.afAuth.auth.currentUser.uid]);          
    this.navbarCollapsed=true;
  }

  goToLogin(){
    let options: NgbModalOptions = {size: 'sm',  windowClass: 'dark-modal'};
    const modalRef = this.modalService.open(LoginComponent, options);
    this.navbarCollapsed=true;
  }

  goToEvents(){
    this.router.navigate(['event-list-view']);
    this.navbarCollapsed=true;
  }

  goToAbout(){
    this.router.navigate(['about']);
    this.navbarCollapsed=true;
  }

}
