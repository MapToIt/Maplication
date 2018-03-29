import { Injectable } from '@angular/core';
import { Tags } from '../../shared/domain-model/tags';
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

@Injectable()
export class TagsService {

  constructor(private http: HttpClient) { }

  //get observable array of all tags
  getTags() {
    return this.http.get<Tags[]>(Globals.apiUrl + 'Chips')
  }
}
