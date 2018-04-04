import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { Globals } from '../../shared/globals';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { Notes } from '../../shared/domain-model/notes';
import { NotesFilter } from '../../shared/filter/notesFilter';
import { RatingType } from '../../shared/domain-model/ratingType';

@Injectable()
export class NotesService {

  constructor(private http: HttpClient, public globals: Globals) { }

  getNotes(uid: string) {
    return this.http.get<Notes[]>(this.globals.apiUrl + 'Notes/' + uid);
  }

  //by note id
  getNotesById(id:number){
    return this.http.get<Notes[]>(this.globals.apiUrl + 'Notes/ById' + id);
  }

  updateNote(note:Notes){
    return this.http.post<Notes>(this.globals.apiUrl + `Notes`, note);
  }

  getNotesByFilter(attendeeName: string, companyId:number, degree:string, 
                    university:string, ratingType:RatingType, start:Date, end:Date){
    var filter= new NotesFilter();
    filter.attendeeName = attendeeName;
    filter.companyId = companyId;
    filter.degree = degree;
    filter.university = university;
    filter.ratingType = ratingType;
    filter.start = start;
    filter.end = end;

    return this.http.post<Notes[]>(this.globals.apiUrl + `notes/filter/`, filter);
  }

  addNote(note: Notes){
    return this.http.put<Notes>(this.globals.apiUrl + `Notes`, note);
  }
}
