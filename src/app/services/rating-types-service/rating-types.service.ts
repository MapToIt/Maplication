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
import { RatingType } from '../../shared/domain-model/ratingType';

@Injectable()
export class RatingTypesService {

  constructor(private http: HttpClient, public globals: Globals) { }

  getRatingTypes(){
    return this.http.get<RatingType[]>(this.globals.apiUrl + `RatingType`);
  }
}
