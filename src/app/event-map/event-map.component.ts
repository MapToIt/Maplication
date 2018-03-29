import { Component, OnInit, HostListener, NgZone, Input } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Table } from "../shared/domain-model/table";
import { Event } from "../shared/domain-model/event";
import { Map } from '../shared/domain-model/map';
import { Coordinator } from '../shared/domain-model/coordinator';
import { MapService } from '../services/map-service/map.service';
import { TableService } from '../services/table-service/table.service';
import { UserService } from '../services/user-service/user.service';
import { CoordinatorService } from '../services/coordinator/coordinator.service';
import { NgbModal, NgbActiveModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { CreateMapPromptComponent } from '../create-map-prompt/create-map-prompt.component';
import * as firebase from 'firebase/app';
import { AngularFireAuth } from 'angularfire2/auth';

import { Observable } from 'rxjs';

import * as SVG from 'svg.js';

enum tableColor {
  AVAILABLE = '#00ff00',
  OCCUPIED = '#ff0000'
};

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css'],
  providers: [MapService, TableService]
})
export class EventMapComponent implements OnInit {
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

  editToggle: boolean;
  buttonClass: string;
  draw: any;

  mapPopulated: boolean = false;

  tempPoint: any = {};

  currentUser: firebase.User;
  isEventCoordinator: boolean = false;
  coordinator: Coordinator = new Coordinator();

  constructor(private _ngZone: NgZone,
              private route: ActivatedRoute,
              private router: Router,
              private afAuth: AngularFireAuth,
              private _MapService: MapService,
              private _TableService: TableService,
              private _UserService: UserService,
              private _CoordinatorService: CoordinatorService,
              private modalService: NgbModal) {
    this.route.params.subscribe( params => this.eventId = params['id']);

    

    this.editToggle = false;
    this.buttonClass = "btn btn-success";
  }

  ngOnInit() {
    this.GetMap(this.eventId);
    this.draw = SVG('drawing').size(this.imageWidth, this.imageHeight);
    let image = this.draw.image(this.imagePath).size(this.imageWidth, this.imageHeight);
    let rect = this.draw.rect(this.imageWidth, this.imageHeight).opacity(0).attr({'class': 'unselectable', 'draggable':false});
    rect.id('drawLayer');
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(ev:MouseEvent) {
    this.AddPointOne(ev);
  }

  @HostListener('mouseup', ['$event'])
  onMouseUp(ev:MouseEvent){
    this.AddPointTwo(ev);
  }

  toggleEdit(){
    this.editToggle = !this.editToggle;
    if (this.editToggle){
      this.buttonClass = "btn btn-warning";
    } else {
      this.buttonClass = "btn btn-success";
    }
  }

  AddPointOne(e){
    console.log('addpointone');
    e.preventDefault();
    if (this.editToggle){
      this.tempPoint.x1 = e.pageX - this.GetElementOffset(document.getElementById('drawLayer')).left;
      this.tempPoint.y1 = e.pageY - this.GetElementOffset(document.getElementById('drawLayer')).top;
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
      this.GetTables(this.mapId);
      this.CheckEditPermissions();
      this.mapPopulated = true;
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
    this.afAuth.authState.subscribe((user) => {
      this.currentUser = user;
      
      //check if user logged in is profile owner
      this.isEventCoordinator = this.mapInfo.event.coordinator.userId == this.currentUser.uid;
      console.log(this.isEventCoordinator);
      console.log(this.mapInfo.event.coordinator.userId);
      console.log(this.currentUser.uid);
    });
  }
}
