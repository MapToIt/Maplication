import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Table } from "../domain-model/table";
import { Event } from "../domain-model/event";

import * as SVG from 'svg.js';

@Component({
  selector: 'app-event-map',
  templateUrl: './event-map.component.html',
  styleUrls: ['./event-map.component.css']
})
export class EventMapComponent implements OnInit {
  imagePath:string = '../../assets/SampleMap.png';
  imageHeight:number = 600;
  imageWidth:number = 600;
  tables: Table[];
  eventTables: Table[];
  events: Event[];
  eventId: number;
  eventInfo: Event;
  editToggle: boolean;
  buttonClass: string;
  draw: any;

  tempPoint: any = {};

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.eventId = params['id']);
    this.editToggle = false;
    this.buttonClass = "btn btn-success";
    this.tables = [
      //Table(id, event, company, x, y, width, height)
      new Table(0, 1, 0, .044, .258, .087, .042),
      new Table(1, 1, 20, .158, .258, .087, .042),
      new Table(2, 1, null, .272, .258, .087, .042),
      new Table(3, 1, 11, .386, .258, .087, .042),
      new Table(4, 1, null, .500, .258, .087, .042),
      new Table(5, 1, null, .614, .258, .087, .042),
      new Table(6, 1, 9, .728, .258, .087, .042),
      new Table(7, 1, null, .842, .258, .087, .042),
      new Table(8, 2, null, .044, .258, .087, .042),
      new Table(9, 2, 5, .158, .258, .087, .042),
      new Table(10, 2, 2, .272, .258, .087, .042),
      new Table(11, 2, 11, .386, .258, .087, .042),
      new Table(12, 2, 1, .500, .258, .087, .042),
      new Table(13, 2, 4, .614, .258, .087, .042),
      new Table(14, 2, null, .728, .258, .087, .042),
      new Table(15, 2, null, .842, .258, .087, .042),
    ];
    console.log("tables instantiated");
    this.events = [
      //Event(id, name, coordinator, startime, endtime)
      new Event(1, 'White House Meet and Greet', 'Barack Obama', new Date(14, 4, 24, 11, 30, 0, 0), new Date(14, 4, 24, 14, 30, 0 ,0)),
      new Event(2, 'Rig the Election', 'Vladimir Putin', new Date(16, 8, 24, 12, 0, 0, 0), new Date(16, 9, 24, 12, 0, 0 ,0)),
    ];
    console.log("events instantiated");
    for (let event of this.events){
      if (event.eventId == this.eventId){
        console.log(event);
        this.eventInfo = event;
      }
    }
    console.log("eventInfo acquired");
    let index = 0;
    let results = [];
     for (let table of this.tables){
       if (table.event == this.eventId){
         console.log(table);
         results[index++] = table;
       }
     }
     for (let tab of results){
       console.log(tab);
     }
     this.eventTables = results;
     console.log("eventTables acquired");
  }

  ngOnInit() {
    this.draw = SVG('drawing').size(this.imageWidth, this.imageHeight);
    let image = this.draw.image(this.imagePath).size(this.imageWidth, this.imageHeight);
    let rect = this.draw.rect(this.imageWidth, this.imageHeight).opacity(0).attr({'class': 'unselectable', 'draggable':false});
    rect.id('drawLayer');
    for (let table of this.eventTables){
      table.DrawTable(this.draw, this.imageWidth, this.imageHeight);
    }
  }

  @HostListener('document:mousedown', ['$event'])
  onMouseDown(ev:MouseEvent) {
    this.AddPointOne(ev);
  }

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(ev:MouseEvent){
    this.AddPointTwo(ev);
  }

  toggleEdit(){
    this.editToggle = !this.editToggle;
    console.log(this.editToggle);
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
      console.log(this.tempPoint);
    }
  }

  AddPointTwo(e){
    console.log('addpointtwo');
    if (this.editToggle){
      this.tempPoint.x2 = e.pageX - this.GetElementOffset(document.getElementById('drawLayer')).left;
      this.tempPoint.y2 = e.pageY - this.GetElementOffset(document.getElementById('drawLayer')).top;
      console.log(this.tempPoint);
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
    x /= this.imageWidth;
    y /= this.imageHeight;
    width /= this.imageWidth;
    height /= this.imageHeight;
    this.eventTables.push(new Table(0, this.eventId, 0, x, y, width, height));
    this.eventTables[this.eventTables.length-1].DrawTable(this.draw, this.imageWidth, this.imageHeight);
    console.log('here');
  }

  GetElementOffset(element)
  {
    var de = document.documentElement;
    var box = element.getBoundingClientRect();
    var top = box.top + window.pageYOffset - de.clientTop;
    var left = box.left + window.pageXOffset - de.clientLeft;
    return { top: top, left: left };
  }
}
