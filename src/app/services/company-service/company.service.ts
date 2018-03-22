import { Injectable } from '@angular/core';
import { Globals } from '../../shared/globals';
import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import {
  Observable
} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';
import { Company } from '../../shared/domain-model/company'

@Injectable()
export class CompanyService {

  constructor(private http: HttpClient) { }

  getCompany(id: string) {
    return this.http.get<Company>(Globals.apiUrl + 'Company/' + id)
  }

  updateCompany(company: Company) {
    this.http.post(Globals.apiUrl + 'Company', company)
  }

  addCompany(company: Company) {
    this.http.put(Globals.apiUrl + 'Company', company)
  }

}
