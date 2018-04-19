import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../shared/globals';
import { Recruiter } from '../../shared/domain-model/recruiter';

@Injectable()
export class RecruiterService {

  constructor(private http: HttpClient, private globals: Globals) { }

  GetRecruiters(){
    this.http.get<Recruiter[]>(this.globals.apiUrl + `Recruiter`);
  }

  GetRecruiterByFilter(filter){
    this.http.post<Recruiter[]>(this.globals.apiUrl + `Recruiter/Filter`, filter);
  }

  GetRecruitersByCompanyId(id){
    this.http.get<Recruiter[]>(this.globals.apiUrl + `Recruiter/Company/${id}`);
  }

  AddRecruiter(newRecruiter){
    return this.http.post<Recruiter>(this.globals.apiUrl + `Recruiter/Add`, newRecruiter);
  }

  UpdateRecruiter(updatedRecruiter){
    return this.http.put<Recruiter>(this.globals.apiUrl + `Recruiter/Recruiter`, updatedRecruiter);
  }

}
