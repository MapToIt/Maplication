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
  events: Event[];
  eventId: number;
  eventInfo: Event;
  eventTables: Table[];


  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe( params => this.eventId = params['id']);
    this.tables = [
      //Table(event, company, x, y, width, height)
      new Table(0, null, 100, 100, 100, 100),
      new Table(0, 0, 200, 200, 100, 100),
    ];
    this.events = [
      new
    ];
  }

  ngOnInit() {
    let draw = SVG('drawing').size(this.imageWidth, this.imageHeight);
    let image = draw.image(this.imagePath).size(this.imageWidth, this.imageHeight).attr({'class': 'unselectable', 'draggable': false});
    for (let table of this.tables){
      table.DrawTable(draw);
    }
  }
}
