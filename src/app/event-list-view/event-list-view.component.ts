import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';

import { Event } from '../common/event';
import { EVENTSLIST } from './mock-events';
import { EventFilterPipe } from '../common/event-filter.pipe'

@Component({
  selector: 'app-event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})

export class EventListViewComponent implements OnInit {

  events = EVENTSLIST;

  selectedEvent: Event;

  constructor() { }

  ngOnInit() {
  }

  onSelect(event: Event): void{
    this.selectedEvent = event;
  }

}
