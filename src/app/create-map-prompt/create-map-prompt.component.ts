import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatesService } from '../services/states-service/states-service.service';
import { MapService } from '../services/map-service/map.service';
import { State } from '../shared/domain-model/state';
import { Event } from '../shared/domain-model/event';
import { Map } from '../shared/domain-model/map';

@Component({
  selector: 'app-create-map-prompt',
  templateUrl: './create-map-prompt.component.html',
  styleUrls: ['./create-map-prompt.component.css'],
  providers: [StatesService, MapService]
})
export class CreateMapPromptComponent implements OnInit {
  @Input () eventCoordinator;

  eventTitle: string;
  eventDescription: string;
  eventStart: Date;
  eventEnd: Date;
  startDate;
  startTime;
  endDate;
  endTime;
  eventStreetNumber: number;
  eventStreetName: string;
  eventCity: string;
  eventState: number;
  eventZipCode: number;
  states: State[];

  constructor(public activeModal: NgbActiveModal, private _StatesService: StatesService, private _MapService: MapService) { }

  ngOnInit() {
    this.GetStates();
  }

  Submit()
  {
    if (typeof(this.eventStreetNumber) === "number" && typeof(this.eventZipCode) === "number" && this.eventTitle != null
          && this.eventCoordinator != null && this.eventDescription != null && this.eventStreetName != null && this.eventCity != null
          && typeof(this.eventState) === "number")
    {
      this.eventStart = this.CombineDateAndTime(this.startDate, this.startTime);
      this.eventEnd = this.CombineDateAndTime(this.endDate, this.endTime);
      let addMap = new Map();
      addMap.event = new Event();
      addMap.mapId = 0;
      addMap.eventId = 0;
      addMap.image = "";
      addMap.event.eventId = 0;
      addMap.event.eventTitle = this.eventTitle;
      addMap.event.coordinatorId = this.eventCoordinator;
      addMap.event.startTime = this.eventStart;
      addMap.event.endTime = this.eventEnd;
      addMap.event.description = this.eventDescription;
      addMap.event.streetNumber = this.eventStreetNumber;
      addMap.event.street = this.eventStreetName;
      addMap.event.city = this.eventCity;
      addMap.event.stateId = this.eventState;
      addMap.event.zipcode = this.eventZipCode;
      addMap.event.eventPic = "";
      
      console.log(typeof(this.eventStart));
      console.log(addMap);
      //this._MapService.AddMap(addMap);
    }
  }

  GetStates()
  {
    this._StatesService.GetStates().subscribe((statesData) => {
      this.states = statesData;
      console.log(this.states);
    });
  }

  CombineDateAndTime(date, time)
  {
    let timeString = time.hour + ':' + time.minute + ':00';
    let dateString = date.year + '-' + date.month + '-' + date.day;
    console.log(dateString + ' ' + timeString);
    let result = new Date(dateString + ' ' + timeString);

    return result;
  }

}
