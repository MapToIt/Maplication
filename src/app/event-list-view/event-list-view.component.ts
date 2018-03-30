import { Component, OnInit } from '@angular/core';
import { Time } from '@angular/common';

import { Event } from '../shared/domain-model/event';
import { EVENTSLIST } from './mock-events';

@Component({
  selector: 'app-event-list-view',
  templateUrl: './event-list-view.component.html',
  styleUrls: ['./event-list-view.component.css']
})

export class EventListViewComponent implements OnInit {

  events = EVENTSLIST;

  searchText = "";

  selectedEvent: Event;

  constructor() { }

  ngOnInit() {
  }

  onSelect(event: Event): void{
    this.selectedEvent = event;
  }

}
