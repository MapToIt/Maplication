import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap/datepicker/ngb-date';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Company } from '../shared/domain-model/company';
import { Notes } from '../shared/domain-model/notes';
import { RatingType } from '../shared/domain-model/ratingType';

import { CompanyService } from '../services/company-service/company.service';
import { NotesService } from '../services/notes-service/notes.service';
import { RatingTypesService } from '../services/rating-types-service/rating-types.service';
import { UserService } from '../services/user-service/user.service';
import { Globals } from '../shared/globals';
import { noteModel } from '../shared/filter/noteModel';
import { NoteUpdateModalComponent } from './note-update-modal/note-update-modal.component';

 
@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  
  entries: noteModel[];
  ratingTypes: RatingType[];
  uid: string;
  start: NgbDate;
  end: NgbDate;
  attendeeName: string;
  company: Company;
  degree: string;
  university:string;
  ratingType: RatingType;
  loaded: boolean;

  //for autocomplete
  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.ratingTypes.filter(v => v.rating.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {rating: string}) => x.rating;  

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
    private _NotesService: NotesService, private _UserService:UserService,
    private _RatingTypesService: RatingTypesService, private _CompanyService: CompanyService,
    public modalService: NgbModal,
    private route: ActivatedRoute, private router: Router, public globals: Globals) {
     
    this.route.params.subscribe( params => this.uid = params['id']);
      
    if(this.globals.currentUser.uid != this.uid){
      this.router.navigate(['*']);
    }else{  
      this._CompanyService.getCompany(this.uid).subscribe((company) => {
        this.company = company;
        this._RatingTypesService.getRatingTypes().subscribe((ratingTypes) => {
          this.ratingTypes = ratingTypes;
          var date = new Date();
          var ngbDateStruct = { day: date.getDate(), month: date.getMonth(), year: date.getFullYear()};
          this.start = new NgbDate(ngbDateStruct.year, ngbDateStruct.month, ngbDateStruct.day);
          this.end = new NgbDate(ngbDateStruct.year, ngbDateStruct.month + 1, ngbDateStruct.day + 1);
          this.updateEntries();
        });
      }) 
    }
  }


  ngOnInit() {
  }

  updateEntries(){
    var start = this.start ? new Date(this.start.year, this.start.month - 1, this.start.day) : null;
    var end = this.end ? new Date(this.end.year, this.end.month - 1, this.end.day) : null;

    this._NotesService.getNotesByFilter(this.attendeeName, this.company.companyId, this.degree, 
                      this.university, this.ratingType, start, end).subscribe((entries) => {
      this.entries = entries;
      console.log(this.entries);
      this.loaded = true;
    });
    
  }

  openNoteModal(note: Notes){
    let options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(NoteUpdateModalComponent, options);
    modalRef.componentInstance.note = note;
  }
}
