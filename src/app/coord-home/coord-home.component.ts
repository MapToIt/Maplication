import { NgModule} from '@angular/core';
import { Component, OnInit } from '@angular/core'; 
import { Pipe, PipeTransform} from '@angular/core';
import { Coordinator } from '../shared/domain-model/coordinator';
import { FormBuilder, Validators } from '@angular/forms';
import { CoordinatorService } from "../services/coordinator/coordinator.service";
import { UserService } from '../services/user-service/user.service';
import { EventService } from '../services/event-service/event.service';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase/app';
import {AngularFireAuth} from 'angularfire2/auth';
import { Event } from '../shared/domain-model/event';
import { Input } from '@angular/core';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateMapPromptComponent } from '../create-map-prompt/create-map-prompt.component';
//import { Event } from './coord';
import * as  moment from 'moment';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Globals } from '../shared/globals';


@Component({
  selector: 'app-coord-home',
  templateUrl: './coord-home.component.html',
  styleUrls: ['./coord-home.component.css']
})
 
export class CoordHomeComponent implements OnInit {
   public index = 0;
   public now = moment();
   cId: number = 0;
   uId: string;
   coords: Coordinator[] = new Array();
   cIdHold: number;
   totalRec : number;
   page: number = 1;
   profile: Coordinator = new Coordinator();
   pastEvents: Event[] = new Array();
   futureEvents: Event[] = new Array();
  // evts = [
  //   {id: 1, coord: 1, date: '2018/05/01 00:00:00', name: 'Kent Recruitment'},
  //   {id: 1, coord: 1, date: '2018/05/30 00:00:00', name: 'Portage County Recruitment'},
  //   {id: 1, coord: 1, date: '2018/06/01 00:00:00', name: 'IBM Recruitment'},
  //   {id: 1, coord: 1, date: '2018/06/15 00:00:00', name: 'Stark County Recruitment'},
  //   {id: 1, coord: 1, date: '2018/06/30 00:00:00', name: 'Medical Recruitment'},
  //   {id: 1, coord: 1, date: '2018/07/01 00:00:00', name: 'Google Recruitment'},
  //   {id: 2, coord: 2, date: '2017/09/01 00:00:00', name: 'Web Developer Recruitment'},
  //   {id: 1, coord: 1, date: '2017/09/15 00:00:00', name: 'Educational Recruitment'},
  //   {id: 1, coord: 1, date: '2017/10/01 00:00:00', name: 'Cleveland Recruitment'},
  //   {id: 1, coord: 1, date: '2017/10/30 00:00:00', name: 'Engineering Recruitment'},
  //   {id: 1, coord: 1, date: '2017/11/01 00:00:00', name: 'Network Recruitment'},
  //   {id: 1, coord: 1, date: '2017/12/01 00:00:00', name: 'Tech Recruitment'},
  //   {id: 1, coord: 1, date: '2018/01/25 00:00:00', name: 'RN Recruitment'},
  //   {id: 1, coord: 1, date: '2018/02/01 00:00:00', name: 'Network Recruitment'}
  // ];
 
  // myEvent = this.evts[0]; 
  

  constructor(private _CoordinatorService: CoordinatorService, 
              private _EventService: EventService,private route: ActivatedRoute, 
              private _UserService: UserService, private router: Router, 
              public afAuth: AngularFireAuth, public af: AngularFireDatabase, 
              public modalService: NgbModal, public globals: Globals) {  
    this.route.params.subscribe( params => this.uId = params['id']);  
    console.log(this.uId);
    this._UserService.getUserType(this.uId).subscribe((userType) => {
      if(userType != null)
      {
        if (userType.toLowerCase() == "coordinator" )
        {
            if(this.globals.currentUser.uid == this.uId)
            {
              this._CoordinatorService.getCoordinatorById(this.uId).subscribe((profile) => {
                this.profile = profile;    
                console.log("Profile ", this.profile);   
                this._EventService.GetEventByCoordId(this.profile.coordinatorId).subscribe((evts) => {
                  console.log('event', evts);
                 this.pastEvents = evts.filter(event => moment(event.startTime) < this.now);
                 this.futureEvents = evts.filter(event => moment(event.startTime) >= this.now);
                });
              });
            } else
            {
              this.router.navigate(['*']);
            }
        }
        else
        {
          this.router.navigate(['*']);
        }
      }
    });

   // this.pastEvents = this.evts.filter(event => event.date < this.now);
   // this.futureEvents = this.evts.filter(event => event.date >= this.now);
  }

   updateCoord(){
   //let coord = new Coordinator(cId,firstName,lastName,this.uId,email,phone);
    //this.coords.push(coord);
    //console.log(coord);
    this._CoordinatorService.updateCoordinator(this.profile).subscribe((UpdatedCoordinator) => {
      console.log("Updated Coordinator");
    })
    
  }
openEventPrompt(){
  let options: NgbModalOptions = {size: 'lg'};
  const modalRef = this.modalService.open(CreateMapPromptComponent, options);
  modalRef.componentInstance.eventCoordinator = this.profile.coordinatorId;
}
  ngOnInit() {
    
  }
  
}
