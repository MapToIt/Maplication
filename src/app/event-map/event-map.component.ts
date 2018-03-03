import { Component, OnInit } from '@angular/core';
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
  imageHeight:number = 1000;
  imageWidth:number = 1000;
  tables: Table[];
  eventTables: Table[];
  events: Event[];
  eventId: number;
  eventInfo: Event;


  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.eventId = params['id']);
    this.tables = [
      //Table(id, event, company, x, y, width, height)
      new Table(0, 1, 0, 44, 258, 87, 42),
      new Table(1, 1, 20, 158, 258, 87, 42),
      new Table(2, 1, null, 272, 258, 87, 42),
      new Table(3, 1, 11, 386, 258, 87, 42),
      new Table(4, 1, null, 500, 258, 87, 42),
      new Table(5, 1, null, 614, 258, 87, 42),
      new Table(6, 1, 9, 728, 258, 87, 42),
      new Table(7, 1, null, 842, 258, 87, 42),
      new Table(8, 2, null, 44, 258, 87, 42),
      new Table(9, 2, 5, 158, 258, 87, 42),
      new Table(10, 2, 2, 272, 258, 87, 42),
      new Table(11, 2, 11, 386, 258, 87, 42),
      new Table(12, 2, 1, 500, 258, 87, 42),
      new Table(13, 2, 4, 614, 258, 87, 42),
      new Table(14, 2, null, 728, 258, 87, 42),
      new Table(15, 2, null, 842, 258, 87, 42),
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
    let draw = SVG('drawing').size(this.imageWidth, this.imageHeight);
    let image = draw.image(this.imagePath).size(this.imageWidth, this.imageHeight).attr({'class': 'unselectable', 'draggable': false});
    for (let table of this.eventTables){
      table.DrawTable(draw);
    }
  }
}
