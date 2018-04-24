import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../shared/globals';
import { JobPostings } from '../../shared/domain-model/jobPostings';

@Injectable()
export class JobService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getAllJobPostings(){
    return this.http.get<JobPostings[]>(this.globals.apiUrl + `Jobs`);
  }

  getFilteredJobPostings(filter){
    return this.http.post<JobPostings[]>(this.globals.apiUrl + `Jobs/Filter`, filter);
  }

  GetJobPostingsByCompanyId(id){
    return this.http.get<JobPostings[]>(this.globals.apiUrl + `Jobs/Company/${id}`);
  }

  AddJobPosting(newJob){
    return this.http.post<JobPostings>(this.globals.apiUrl + `Jobs/Add`, newJob);
  }

  UpdateJobPosting(updatedJob){
    return this.http.put<JobPostings>(this.globals.apiUrl + `Jobs/Update`, updatedJob);
  }

}
