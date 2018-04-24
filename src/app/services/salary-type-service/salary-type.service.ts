import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Globals } from '../../shared/globals';
import { SalaryTypes } from '../../shared/domain-model/salary-types';

@Injectable()
export class SalaryTypeService {

  constructor(private http: HttpClient, private globals: Globals) { }

  getSalaryTypes(){
    return this.http.get<SalaryTypes[]>(this.globals.apiUrl + `SalaryTypes`);
  }

}
