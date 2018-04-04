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
import { Company } from '../../shared/domain-model/company';

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient, public globals: Globals) { }

  getCompany(id: string) {
    return this.http.get<Company>(this.globals.apiUrl + 'Company/' + id);
  }

  updateCompany(company: Company) {
    return this.http.post<Company>(this.globals.apiUrl + `Company`, company);
  }
  

  addCompany(company: Company) {
    return this.http.put<Company>(this.globals.apiUrl + 'Company', company)
  }

}
