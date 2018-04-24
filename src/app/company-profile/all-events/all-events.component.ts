import { Component, OnInit, Input } from '@angular/core';
import { EventAttendance } from '../../shared/domain-model/eventAttendance';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-events',
  templateUrl: './all-events.component.html',
  styleUrls: ['./all-events.component.css']
})
export class AllEventsComponent implements OnInit {

  @Input () events:EventAttendance[];

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
