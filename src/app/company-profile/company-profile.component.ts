import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { UserService } from '../services/user-service/user.service';
import { CompanyService } from '../services/company-service/company.service';
import { FileUploadService } from '../services/file-upload-service/file-upload.service';
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
  newTag: Tags;
  companyChips: String[];
  file:any;
  mask:any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.states.filter(v => v.stateName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {stateName: string}) => x.stateName;

  searchTags = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.chips.filter(v => v.tag.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatterTag = (x: {tag: string}) => x.tag;

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              private _StateService: StateService, private _ChipService: ChipService,
              private _CompanyService: CompanyService, private _UserService: UserService,
              private _FileUploadService: FileUploadService,
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
              this.companyChips = profile.chips ? JSON.parse(profile.chips) : new Array();
            });
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

  //       search = (text$: Observable<string>) =>
  //   text$
  //     .debounceTime(200)
  //     .map(term => term === '' ? []
  //       : statesWithFlags.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  // formatter = (x: {name: string}) => x.name;

      });

      
   }

  ngOnInit() {
  }

  

  updateCompany(){
    this.profile.chips = JSON.stringify(this.companyChips);
    this._CompanyService.updateCompany(this.profile).subscribe((addedCompany) => {
      if(addedCompany != null){
        this.router.navigate(['company-profile', this.afAuth.auth.currentUser.uid]);
      }
    });
  }

  addChip(newChip){
    if(!this.companyChips.includes(newChip.tag)){
      this.companyChips.push(newChip.tag);
      this.newTag = null;
    }
  }

  deleteChip(chip: string) {
    const index: number = this.companyChips.indexOf(chip);
    this.companyChips.splice(index, 1);
  }

  handleFileInputImg(files: any[]) {
    var file: File = files[0];

    this._FileUploadService.uploadFile(file).subscribe(
      (data) => {
        this.profile.logo = data;
        this.updateCompany();
      }
    )
  }

}
