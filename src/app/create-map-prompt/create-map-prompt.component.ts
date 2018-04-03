import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { StatesService } from '../services/states-service/states-service.service';
import { MapService } from '../services/map-service/map.service';
import { State } from '../shared/domain-model/state';
import { Event } from '../shared/domain-model/event';
import { Map } from '../shared/domain-model/map';
import { Router } from '@angular/router';

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

  constructor(public activeModal: NgbActiveModal, 
              private _StatesService: StatesService, 
              private _MapService: MapService,
              private router: Router) { }

  ngOnInit() {
    this.GetStates();
  }

  Submit()
  {
    let validForm = true;
    if (this.eventTitle == null){
      validForm = false;
      alert('Please enter an event title.');
    }
    if (this.eventDescription == null){
      validForm = false;
      alert('Please enter an event description.');
    }
    //CHECK FOR EVENTSTART VALID DATE
    //CHECK FOR EVENTEND VALID DATE
    if (this.eventStreetNumber == null || typeof(this.eventStreetNumber) != 'number'){
      validForm = false;
      alert('Please enter a valid street number.');
    }
    if (this.eventStreetName == null){
      validForm = false;
      alert('Please enter a street name.');
    }
    if (this.eventCity == null){
      validForm = false;
      alert('Please enter a city.');
    }
    if (this.eventState == null){
      validForm = false;
      alert('Please enter a state.');
    }
    if (this.eventZipCode == null || typeof(this.eventZipCode) != 'number'){
      validForm = false;
      alert('Please enter a valid zip code.');
    }
    if (validForm)
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
      addMap.event.zipCode = this.eventZipCode;
      addMap.event.eventPic = "";
      
      console.log(typeof(this.eventStart));
      console.log(addMap);
      this._MapService.AddMap(addMap);
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
