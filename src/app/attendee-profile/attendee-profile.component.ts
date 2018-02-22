import { Component, OnInit } from '@angular/core';
import { Attendee } from './attendee';
import { logger } from '@firebase/database/dist/esm/src/core/util/util';

@Component({
  selector: 'app-attendee-profile',
  templateUrl: './attendee-profile.component.html',
  styleUrls: ['./attendee-profile.component.css']
})
export class AttendeeProfileComponent implements OnInit { 

  user: Attendee = new Attendee();

  constructor() {
  }

  ngOnInit() {
    function debug(){

    }
  }


}

