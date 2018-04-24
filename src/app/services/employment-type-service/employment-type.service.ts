import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../shared/globals';
import { EmploymentTypes } from '../../shared/domain-model/employment-types';

@Injectable()
export class EmploymentTypeService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getEmploymentTypes(){
    return this.http.get<EmploymentTypes[]>(this.globals.apiUrl + `EmploymentType`);
  }

}
