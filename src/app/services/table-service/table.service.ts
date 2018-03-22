import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpModule, Http, Response } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Table } from '../../shared/domain-model/table';
import { Globals } from '../../shared/globals';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/retry';
import 'rxjs/add/observable/of';
import 'rxjs/Rx';

@Injectable()
export class TableService {

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private http: HttpClient, private globals: Globals) { }

  GetTablesByMap(mapId:number){
    return this.http.get<Table[]>(Globals.apiUrl + `map/tables/${mapId}`);
  }

  AddTable(table:Table){
    var tempTable = {TableId: table.tableId, MapId: table.mapId, CompanyId: table.companyId,
                     XCoordinate: table.xCoordinate, YCoordinate: table.yCoordinate,
                     Width: table.width, Height: table.height};
    var toSend = JSON.stringify(tempTable);
    console.log(toSend);
    //this.http.post(Globals.apiUrl + `map/tables/add`, toSend);
  }

}
