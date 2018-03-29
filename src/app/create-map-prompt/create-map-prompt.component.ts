import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatesService } from '../services/states-service/states-service.service';
import { State } from '../shared/domain-model/state';
import { Event } from '../shared/domain-model/event';
import { Map } from '../shared/domain-model/map';

@Component({
  selector: 'app-create-map-prompt',
  templateUrl: './create-map-prompt.component.html',
  styleUrls: ['./create-map-prompt.component.css'],
  providers: [StatesService]
})
export class CreateMapPromptComponent implements OnInit {

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

  eventCoordinator = 1;

  states: State[];

  constructor(public activeModal: NgbActiveModal, private _StatesService: StatesService) { }

  ngOnInit() {
    this.GetStates();
  }

  Submit()
  {
    console.log(this.eventTitle);
    console.log(this.eventDescription);
    this.eventStart = this.CombineDateAndTime(this.startDate, this.startTime);
    console.log(this.startTime);
    this.eventEnd = this.CombineDateAndTime(this.endDate, this.endTime);
    console.log(this.eventStart);
    console.log(this.eventEnd);
    console.log(this.eventStreetNumber);
    console.log(this.eventStreetName);
    console.log(this.eventCity);
    console.log(this.eventState);
    console.log(this.eventZipCode);
    let addMap = new Map();
    addMap.event = new Event();
    addMap.mapId = 0;
    addMap.eventId = 0;
    addMap.image = "";
    let mapJSON = JSON.stringify(addMap);
    console.log(addMap);
    console.log(mapJSON);
    addMap.event.eventId = 0;
    addMap.event.eventTitle = this.eventTitle;
    addMap.event.coordinatorId = this.eventCoordinator;
    addMap.event.eventStartTime = this.eventStart;
    addMap.event.eventEndTime = this.eventEnd;
    addMap.event.description = this.eventDescription;
    addMap.event.streetNumber = this.eventStreetNumber;
    addMap.event.street = this.eventStreetName;
    addMap.event.city = this.eventCity;
    addMap.event.stateId = this.eventState;
    addMap.event.zipcode = this.eventZipCode;
    addMap.event.eventPic = "";
    
    console.log(addMap);
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
