import { NgModule} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core'; 
import { Pipe, PipeTransform} from '@angular/core';
import { Coord } from './coord';
import { FormBuilder, Validators } from '@angular/forms';
import { Table } from "../shared/domain-model/table";
import { logger } from '@firebase/database/dist/esm/src/core/util/util';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';


@Component({
  selector: 'app-coord-home',
  templateUrl: './coord-home.component.html',
  styleUrls: ['./coord-home.component.css']
})
 
export class CoordHomeComponent implements OnInit {
   public index = 0;
   public now: Date = new Date();
   cId: number = 0;
   uId: string;
   coords: Coord[] = new Array();
   cIdHold: number;
   pastEvents = [];
   futureEvents = [];
   
  futures = [
    {id: 1, coord: 1, date: '05/01/2018', name: 'Kent Recruitment'},
    {id: 1, coord: 1, date: '05/30/2018', name: 'Portage County Recruitment'},
    {id: 1, coord: 1, date: '06/01/2018', name: 'IBM Recruitment'},
    {id: 1, coord: 1, date: '06/15/2018', name: 'Stark County Recruitment'},
    {id: 1, coord: 1, date: '06/30/2018', name: 'Medical Recruitment'},
    {id: 1, coord: 1, date: '07/01/2018', name: 'Google Recruitment'}
  ]
  pasts = [
    {id: 2, coord: 2, date: '9/01/2017 00:00', name: 'Web Developer Recruitment'},
    {id: 1, coord: 1, date: '9/15/2017 00:00', name: 'Educational Recruitment'},
    {id: 1, coord: 1, date: '10/01/2017 00:00', name: 'Cleveland Recruitment'},
    {id: 1, coord: 1, date: '10/30/2017 00:00', name: 'Engineering Recruitment'},
    {id: 1, coord: 1, date: '11/01/2017', name: 'Network Recruitment'},
    {id: 1, coord: 1, date: '12/01/2017', name: 'Tech Recruitment'},
    {id: 1, coord: 1, date: '01/25/2018', name: 'RN Recruitment'},
    {id: 1, coord: 1, date: '02/01/2018', name: 'Network Recruitment'}
  ]
  evts = [
    {id: 1, coord: 1, date: '05/01/2018', name: 'Kent Recruitment'},
    {id: 1, coord: 1, date: '05/30/2018', name: 'Portage County Recruitment'},
    {id: 1, coord: 1, date: '06/01/2018', name: 'IBM Recruitment'},
    {id: 1, coord: 1, date: '06/15/2018', name: 'Stark County Recruitment'},
    {id: 1, coord: 1, date: '06/30/2018', name: 'Medical Recruitment'},
    {id: 1, coord: 1, date: '07/01/2018', name: 'Google Recruitment'},
    {id: 2, coord: 2, date: '9/01/2017', name: 'Web Developer Recruitment'},
    {id: 1, coord: 1, date: '9/15/2017', name: 'Educational Recruitment'},
    {id: 1, coord: 1, date: '10/01/2017', name: 'Cleveland Recruitment'},
    {id: 1, coord: 1, date: '10/30/2017', name: 'Engineering Recruitment'},
    {id: 1, coord: 1, date: '11/01/2017', name: 'Network Recruitment'},
    {id: 1, coord: 1, date: '12/01/2017', name: 'Tech Recruitment'},
    {id: 1, coord: 1, date: '01/25/2018', name: 'RN Recruitment'},
    {id: 1, coord: 1, date: '02/01/2018', name: 'Network Recruitment'}
  ]
  myPast = this.pasts[0];
  myFuture = this.futures[0];
  totalRec : number;
  page: number = 1;
  myEvent = this.evts[0]; 
  
  constructor(private route: ActivatedRoute) {  
    this.route.params.subscribe( params => this.uId = params['id']);  
    
   }
   
   
   addCoord(firstName,lastName,email,phone){
    let coord = new Coord("",firstName,lastName,this.uId,email,phone);
    this.coords.push(coord);
    console.log("Coordinator Added");
  }
  ngOnInit() {
    
  }
  
}
