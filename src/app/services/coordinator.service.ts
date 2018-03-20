export interface coordObj {
  coordId: number;
}
import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpParams,
  HttpHeaders
} from '@angular/common/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';


import {
  Observable
}from 'rxjs/Observable';

@Injectable()
export class CoordinatorService {

  constructor(private http: HttpClient) { }


}
