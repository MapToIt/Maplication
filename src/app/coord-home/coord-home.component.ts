import { NgModule} from '@angular/core';
import { Component, OnInit } from '@angular/core'; 
import { Pipe, PipeTransform} from '@angular/core';
import { Coordinator } from '../shared/domain-model/coordinator';
import { FormBuilder, Validators } from '@angular/forms';
//import { Table } from "../shared/domain-model/table";
import { CoordinatorService } from "../services/coordinator/coordinator.service";
import { UserService } from '../services/user-service/user.service';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
//import { Event } from '../shared/domain-model/event';
import { Event } from './coord';

import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-coord-home',
  templateUrl: './coord-home.component.html',
  styleUrls: ['./coord-home.component.css'],
  providers: [CoordinatorService]
})
 
export class CoordHomeComponent implements OnInit {
   public index = 0;
   //public now = new Date();
   public now = '2018/03/22 00:00:00';
   cId: number = 0;
   uId: string;
   coords: Coordinator[] = new Array();
   cIdHold: number;
   totalRec : number;
   page: number = 1;
   profile: Coordinator = new Coordinator();

  evts = [
    {id: 1, coord: 1, date: '2018/05/01 00:00:00', name: 'Kent Recruitment'},
    {id: 1, coord: 1, date: '2018/05/30 00:00:00', name: 'Portage County Recruitment'},
    {id: 1, coord: 1, date: '2018/06/01 00:00:00', name: 'IBM Recruitment'},
    {id: 1, coord: 1, date: '2018/06/15 00:00:00', name: 'Stark County Recruitment'},
    {id: 1, coord: 1, date: '2018/06/30 00:00:00', name: 'Medical Recruitment'},
    {id: 1, coord: 1, date: '2018/07/01 00:00:00', name: 'Google Recruitment'},
    {id: 2, coord: 2, date: '2017/09/01 00:00:00', name: 'Web Developer Recruitment'},
    {id: 1, coord: 1, date: '2017/09/15 00:00:00', name: 'Educational Recruitment'},
    {id: 1, coord: 1, date: '2017/10/01 00:00:00', name: 'Cleveland Recruitment'},
    {id: 1, coord: 1, date: '2017/10/30 00:00:00', name: 'Engineering Recruitment'},
    {id: 1, coord: 1, date: '2017/11/01 00:00:00', name: 'Network Recruitment'},
    {id: 1, coord: 1, date: '2017/12/01 00:00:00', name: 'Tech Recruitment'},
    {id: 1, coord: 1, date: '2018/01/25 00:00:00', name: 'RN Recruitment'},
    {id: 1, coord: 1, date: '2018/02/01 00:00:00', name: 'Network Recruitment'}
  ];
 
  myEvent = this.evts[0]; 
  pastEvents: Event[] = new Array();
  futureEvents: Event[] = new Array();

  constructor(private _CoordinatorService: CoordinatorService, private route: ActivatedRoute, private _UserService: UserService,
     private router: Router, public afAuth: AngularFireAuth, public af: AngularFireDatabase) {  
    this.route.params.subscribe( params => this.uId = params['id']);  
    console.log(this.uId);
    this._UserService.getUserType(this.uId).subscribe((userType) => {
      if(userType != null)
      {
        if (userType.toLowerCase() == "coordinator" )
        {
          this.afAuth.authState.subscribe((user) => {
            if(user.uid == this.uId)
            {
              this._CoordinatorService.getCoordinatorById(this.uId).subscribe((profile) => {
                this.profile = profile;    
                console.log("Profile ", this.profile);    
              });
            } else
            {
              this.router.navigate(['*']);
            };
          });
        }
        else
        {
          this.router.navigate(['*']);
        }
      }
    });

    this.pastEvents = this.evts.filter(event => event.date < this.now);
    this.futureEvents = this.evts.filter(event => event.date >= this.now);
  }

   updateCoord(){
   //let coord = new Coordinator(cId,firstName,lastName,this.uId,email,phone);
    //this.coords.push(coord);
    //console.log(coord);
    this._CoordinatorService.updateCoordinator(this.profile).subscribe((UpdatedCoordinator) => {
      console.log("Updated Coordinator");
    })
    
  }

  uid: string;
  
  ngOnInit() {
    
  }
  
}
