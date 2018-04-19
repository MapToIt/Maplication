import { Component, OnInit, HostListener, NgZone, Input, Renderer2, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from "../shared/domain-model/table";
import { Event } from "../shared/domain-model/event";
import { Map } from '../shared/domain-model/map';
import { Coordinator } from '../shared/domain-model/coordinator';
import { Company } from '../shared/domain-model/company';
import { State } from '../shared/domain-model/state';
import { RSVP } from '../shared/filter/rsvp';
import { MapService } from '../services/map-service/map.service';
import { TableService } from '../services/table-service/table.service';
import { StatesService } from '../services/states-service/states.service';
import { UserService } from '../services/user-service/user.service';
import { CoordinatorService } from '../services/coordinator/coordinator.service';
import { EventAttendanceService } from '../services/event-attendance-service/event-attendance.service';
import { CompanyService } from '../services/company-service/company.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateMapPromptComponent } from '../create-map-prompt/create-map-prompt.component';
import * as firebase from 'firebase/app';
import * as $ from 'jquery';
import { AngularFireAuth } from 'angularfire2/auth';
import { FlatpickrOptions } from 'ng2-flatpickr';


import { Observable } from 'rxjs';

import * as SVG from 'svg.js';
import { AngularFireStorage } from 'angularfire2/storage';
import { Globals } from '../shared/globals';

enum tableColor {
  AVAILABLE = '#00ff00',
  OCCUPIED = '#ff0000'
};

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css'],
  providers: [MapService, TableService, StatesService]
})
export class EventMapComponent implements OnInit {

  @ViewChild('drawing') drawing;

  uploadImage: File;

  imagePath:string = '../../assets/SampleMap.png';
  imageHeight:number = 600;
  imageWidth:number = 600;

  dataLoaded:boolean = false;

  tables: Table[];
  events: Event[];
  eventInfo: Event;

  eventTables: Table[];
  eventId: number;
  mapId: number;
  mapInfo: Map;
  dateTime: FlatpickrOptions;

  editToggle: boolean;
  deleteToggle: boolean;
  buttonClass: string;
  draw: any;

  states: State[];

  mapPopulated: boolean = false;

  tempPoint: any = {};

  userType: string;
  isEventCoordinator: boolean = false;
  coordinator: Coordinator = new Coordinator();

  attendingCompanies: Company[] = [];
  activeCompany: Company;

  mapImage: File;

  isAttending: boolean = false;

  constructor(private _ngZone: NgZone,
              private route: ActivatedRoute,
              private router: Router,
              private afAuth: AngularFireAuth,
              private afStore: AngularFireStorage,
              private _MapService: MapService,
              private _TableService: TableService,
              private _UserService: UserService,
              private _StatesService: StatesService,
              private _CoordinatorService: CoordinatorService,
              private _EventAttendanceService: EventAttendanceService,
              private _CompanyService: CompanyService,
              private modalService: NgbModal,
              private renderer: Renderer2,
              private changeRef: ChangeDetectorRef,
              public globals: Globals) {
    this.route.params.subscribe( params => this.eventId = params['id']);

    this.editToggle = false;
    this.deleteToggle = false;
    this.buttonClass = "btn btn-success";
  }

  ngOnInit() {
    this.GetMap(this.eventId);
    this._StatesService.getStates().subscribe((statesData) => {
      this.states = statesData;
    });
  }

  DrawMap(){
    this.draw = SVG('drawing').size(this.imageWidth, this.imageHeight);
    //this.draw = SVG('drawing').size(window.screen.width, window.screen.height / 2)
    let image = this.draw.image(this.mapInfo.image).size(this.imageWidth, this.imageHeight);
    //let image = this.draw.image(this.mapInfo.image).size(window.screen.width, window.screen.height /2 );
    let rect = this.draw.rect(this.imageWidth, this.imageHeight).opacity(0).attr({'class': 'unselectable', 'draggable':false});
    rect.id('drawLayer');

    let drawingMouseDown = this.renderer.listen(this.drawing.nativeElement, 'mousedown', (evt) => {
      this.AddPointOne(evt);
    });
    let drawingMouseUp = this.renderer.listen(this.drawing.nativeElement, 'mouseup', (evt) => {
      if (evt.target.id.substring(0,7) == 'tableId'){
        let tableIdString = evt.target.id.substring(7,evt.target.id.length);
        let tableId = parseInt(tableIdString);
        for (let i = 0; i < this.eventTables.length; i ++){
          if (this.eventTables[i].tableId === tableId){
            this.router.navigate(['company-profile', this.eventTables[i].company.userId]);
          }
        }
      }
      this.AddPointTwo(evt);
    });
    let drawingMouseOver = this.renderer.listen(this.drawing.nativeElement, 'mouseover', (evt) => {
      if (evt.target.id.substring(0,7) == 'tableId'){
        let tableIdString = evt.target.id.substring(7,evt.target.id.length);
        let tableId = parseInt(tableIdString);
        for (let i = 0; i < this.eventTables.length; i ++){
          if (this.eventTables[i].tableId === tableId){
            this.activeCompany = this.eventTables[i].company;
          }
        }
      }
    })
  }

  toggleEdit(){
    this.editToggle = !this.editToggle;
    this.deleteToggle = false;
    if (this.editToggle){
      this.buttonClass = "btn btn-warning";
    } else {
      this.buttonClass = "btn btn-success";
    }
  }

  toggleDelete(){
    this.deleteToggle = !this.deleteToggle;
    this.editToggle = false;
    this.buttonClass = "btn btn-success";
  }

  AddPointOne(e){
    console.log('addpointone');
    e.preventDefault();
    if (this.editToggle){
      this.tempPoint.x1 = e.pageX - this.GetElementOffset(document.getElementById('drawLayer')).left;
      this.tempPoint.y1 = e.pageY - this.GetElementOffset(document.getElementById('drawLayer')).top;
    } else if (this.deleteToggle){
      console.log('here');
      this.DeleteTable(parseInt(e.target.id.substring(7,9)));
    }
  }

  AddPointTwo(e){
    console.log('addpointtwo');
    if (this.editToggle){
      this.tempPoint.x2 = e.pageX - this.GetElementOffset(document.getElementById('drawLayer')).left;
      this.tempPoint.y2 = e.pageY - this.GetElementOffset(document.getElementById('drawLayer')).top;
      this.AddNewTable();
    }
  }

  AddNewTable(){
    let x, y, width, height = 0;
    x = this.tempPoint.x1 < this.tempPoint.x2 ? this.tempPoint.x1 : this.tempPoint.x2;
    y = this.tempPoint.y1 < this.tempPoint.y2 ? this.tempPoint.y1 : this.tempPoint.y2;
    width = Math.abs(this.tempPoint.x1 - this.tempPoint.x2);
    height = Math.abs(this.tempPoint.y1 - this.tempPoint.y2);
    console.log(x, y, width, height);
    x = Math.round((x/this.imageWidth) * 1000);
    y = Math.round((y/this.imageHeight) * 1000);
    width = Math.round((width/this.imageWidth) * 1000);
    height = Math.round((height/this.imageHeight) * 1000);
    if (width != 0 && height != 0){
      this.eventTables.push(new Table(0, this.mapId, null, x, y, width, height));
      if (this.eventTables.length > 1){ //Are there more than tables than the one we just added
        this.eventTables[this.eventTables.length - 1].tableId = this.eventTables[this.eventTables.length-2].tableId + 1;
      } else {
        this.eventTables[this.eventTables.length - 1].tableId = 1;
      }
      this.DrawTable(this.eventTables[this.eventTables.length-1]);
      console.log(this.eventTables[this.eventTables.length-1]);
      this.AddTable(this.eventTables[this.eventTables.length-1]);
    } else {
      console.log("Table invalid");
    }
  }

  GetElementOffset(element)
  {
    var de = document.documentElement;
    var box = element.getBoundingClientRect();
    var top = box.top + window.pageYOffset - de.clientTop;
    var left = box.left + window.pageXOffset - de.clientLeft;
    return { top: top, left: left };
  }

  DrawTable(table: Table){
    let tempColor = '';
    if (table.companyId != null){
      tempColor = tableColor.OCCUPIED;
    } else {
      tempColor = tableColor.AVAILABLE;
    }
    //1000 is a percent modifier since im lazy and im not converting the database from int to decimal
    let tempWidth = (table.width * this.imageWidth) / 1000;
    let tempHeight = (table.height * this.imageHeight) / 1000;
    table.tableSVG = this.draw.rect(tempWidth, tempHeight).fill(tempColor).opacity(.5);
    table.tableSVG.move((table.xCoordinate/1000.0)*this.imageWidth, (table.yCoordinate/1000.0)*this.imageHeight);
    table.tableSVG.attr({'id': 'tableId' + table.tableId});
  }

  DeleteTable(tableId: number){
    console.log("DELETE TABLE");
    this._MapService.DeleteTable(tableId);
    for (let i = 0; i < this.eventTables.length; i++){
      if (this.eventTables[i].tableId == tableId){
        this.ResetTable(this.eventTables[i]);
        this.eventTables.splice(i, 1);
      }
    }
  }

  ResetTable(table: Table){
    //To dynamically draw map when window gets resized
    table.tableSVG.remove();
  }

  GetMap(eventId:number)
  {
    this._MapService.GetMapById(eventId).subscribe((mapData) =>
    {
      this.mapInfo = mapData;
      this.mapId = this.mapInfo.mapId;
      let sd = new Date(this.mapInfo.event.startTime);
      this.mapInfo.event.startTime = new Date(Date.UTC(sd.getFullYear(), sd.getMonth(), sd.getDate(), sd.getHours(), sd.getMinutes(), sd.getSeconds()));
      let ed = new Date(this.mapInfo.event.endTime);
      this.mapInfo.event.endTime = new Date(Date.UTC(ed.getFullYear(), ed.getMonth(), ed.getDate(), ed.getHours(),ed.getMinutes(), ed.getSeconds()));
      this.CheckEditPermissions();
      this.mapPopulated = true;
      if (this.mapInfo.image != null){
        this.DrawMap();
        this.GetTables(this.mapId);
      }
      this.checkAttendance();
      this.GetEventAttendance();
    });
  }

  GetTables(mapId: number)
  {
    this._TableService.GetTablesByMap(mapId).subscribe((tableData) => {
      this.eventTables = tableData;
      for (var i = 0; i < this.eventTables.length; i++)
      {
        this.DrawTable(this.eventTables[i]);
      }
    });
  }

  AddTable(table:Table)
  {
    this._TableService.AddTable(table);
  }

  openEventPrompt() {
    let options: NgbModalOptions = { size: 'lg'};
    const modalRef = this.modalService.open(CreateMapPromptComponent, options);
    modalRef.componentInstance.eventCoordinator = 1;
  }

  CheckEditPermissions(){      
    this._UserService.getUserType(this.globals.currentUser.uid).subscribe((userType) => { 
      if(userType != null)
      {
        if (userType.toLowerCase() == "attendee")
        {
          this.userType = userType;
        }
        else if (userType.toLowerCase() == "company")
        {
          this.userType = userType;
        }
      } else {
        userType = null;
      }
    });

    //check if user logged in is event coordinator
    this.isEventCoordinator = this.mapInfo.event.coordinator.userId == this.globals.currentUser.uid;
  }

  DetectFiles(event){
    console.log(event.target.files.item(0));
    this.uploadImage = event.target.files.item(0);
  }

  SubmitMapChanges(){
    this._MapService.UpdateMap(this.mapInfo);
  }

  SubmitMap(){
   let storageRef = firebase.storage().ref();
   console.log(typeof(this.uploadImage));
   console.log(this.uploadImage);
   let uploadTask = storageRef.child(`/maps/${this.mapInfo.mapId}/${this.uploadImage.name}`).put(this.uploadImage);
   uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) =>  {
        // upload in progress
      },
        (error) => {
        // upload failed
        console.log(error)
      },
      () => {
        // upload success
        console.log(uploadTask.snapshot.downloadURL);
        this.mapInfo.image = uploadTask.snapshot.downloadURL;
        this._MapService.UpdateMap(this.mapInfo);
        this.DrawMap();
      }
    );
  }

  rsvp(eventId: number){
    let rsvp = new RSVP();
    rsvp.Event = eventId;
    rsvp.UserId = this.globals.currentUser.uid;
    rsvp.UserType = this.userType;
    this._EventAttendanceService.updateRSVP(rsvp).subscribe((rsvp) => {
      if (this.userType.toLowerCase() == 'company'){
        this.isAttending = true;
        if (this.globals.isCompany){
          for (var i = 0; i < this.eventTables.length; i++){
            this.ResetTable(this.eventTables[i]);
          }
          this.eventTables = null;
          this.GetTables(this.mapId);
        }  
      }
    });  
  }

  checkAttendance(){
    this._EventAttendanceService.GetEventAttendanceByUser(this.globals.currentUser.uid).subscribe((data) => {
      for (var i = 0; i < data.length; i++){
        if (data[i].event.eventId == this.mapInfo.eventId){
          this.isAttending = true;
        }
      }
    });
  }

  GetEventAttendance(){
    this._EventAttendanceService.GetCompanyAttendanceByEvent(this.mapInfo.eventId).subscribe((data) => {
      for (var i = 0; i < data.length; i++){
        this._CompanyService.getCompany(data[i].userId).subscribe((company) => {
          this.attendingCompanies.push(company);
        });
      }
      console.log(this.attendingCompanies);
    });
  }

  GoToAttendeeList(eventId: number){
    this.router.navigate(['attendee-list', eventId]);
  }

}
