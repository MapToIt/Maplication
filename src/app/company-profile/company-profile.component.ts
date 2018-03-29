import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import { UserService } from '../services/user-service/user.service';
import { CompanyService } from '../services/company-service/company.service';
import { Company } from '../shared/domain-model/company';
import { State } from '../shared/domain-model/state';
import { StateService } from '../services/state.service';
import { ChipService } from '../services/chip-service/chip.service';
import { Tags } from '../shared/domain-model/tags';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {

  //company variable declarations
  uid:string;
  currentUser: firebase.User;
  isProfileUser: boolean;
  profile: Company = new Company();
  states: State[];
  chips: Tags[];

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private _StateService: StateService, private _ChipService: ChipService,
              private _CompanyService: CompanyService, private _UserService: UserService,
              private route: ActivatedRoute, private router: Router) {
                this.route.params.subscribe( params => this.uid = params['id']);
      console.log(this.uid);

      this._UserService.getUserType(this.uid).subscribe((userType) => {
        if(userType != null)
        {
          if (userType.toLowerCase() == "company")
          {
            this._CompanyService.getCompany(this.uid).subscribe((profile) => {
              this.profile = profile;           
            })
          }
          else
          {
            this.router.navigate(['*']);
          }
        }
      });

      this.afAuth.authState.subscribe((user) => {
        this.currentUser = user;
        
        //check if user logged in is profile owner
        this.isProfileUser = this.uid == this.currentUser.uid;
      });

      this._StateService.getStates().subscribe((states) => {
        this.states = states;
      });

      this._ChipService.getChips().subscribe((chips) => {
        this.chips = chips;
        console.log(this.chips);
      });
   }

  ngOnInit() {
  }

  updateCompany(){

  }

}
