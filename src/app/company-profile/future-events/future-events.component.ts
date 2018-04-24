import { Component, OnInit, Input } from '@angular/core';
import { EventAttendance } from '../../shared/domain-model/eventAttendance';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-future-events',
  templateUrl: './future-events.component.html',
  styleUrls: ['./future-events.component.css']
})

export class FutureEventsComponent implements OnInit {

  @Input () futureEvents:EventAttendance[];
  @Input () isProfileUser:boolean;

  constructor( private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
  }

  goToEvent(eventId){
    this.router.navigate(['event', eventId]); 
  }

  goToAttendee(eventId){
    this.router.navigate(['attendee-list', eventId]); 
  }
}
