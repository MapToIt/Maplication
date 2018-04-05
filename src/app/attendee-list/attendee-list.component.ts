import { Component, OnInit, state } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { FirebaseUISignInSuccess } from 'firebaseui-angular';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';
import { StatesService } from '../services/states-service/states.service';
import { Event } from '../shared/domain-model/event';
import { Attendee } from '../shared/domain-model/attendee';
import { EventAttendanceService } from '../services/event-attendance-service/event-attendance.service';
import { UserService } from '../services/user-service/user.service';
import { AttendeeService } from '../services/attendee-service/attendee.service';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NoteModalComponent } from './note-modal/note-modal.component';
import { Notes } from '../shared/domain-model/notes';
import { CompanyService } from '../services/company-service/company.service';
import { Globals } from '../shared/globals';
import { EventService } from '../services/event-service/event.service';

@Component({
  selector: 'app-attendee-list',
  templateUrl: './attendee-list.component.html',
  styleUrls: ['./attendee-list.component.css']
})
export class AttendeeListComponent implements OnInit {

  eventId:number;
  attendees: Attendee[] = new Array();
  attendeeName: string;
  university: string;
  degree: string;
  displayList: Attendee[] = new Array();

  constructor(public afAuth: AngularFireAuth, public af: AngularFireDatabase,
              private _EventAttendanceService: EventAttendanceService, private _UserService:UserService,
              private _CompanyService: CompanyService, private _AttendeeService: AttendeeService,
              private _EventService: EventService,
              public modalService: NgbModal, public globals: Globals,
              private route: ActivatedRoute, private router: Router) { 

    this.route.params.subscribe( params => this.eventId = params['id']);
    this.afAuth.authState.subscribe((user) => {
      if(user == null){
        this.router.navigate(['*']);
      }

      this._UserService.getUserType(user.uid).subscribe((userType) => { 
        if(userType != null)
        {
          if (userType.toLowerCase() != "company")
          {
            this.router.navigate(['*']);
          }else{
            this._EventAttendanceService.GetAttendeeAttendanceByEvent(this.eventId).subscribe((rsvps)=> {
              rsvps.forEach(rsvp => {
                this._AttendeeService.getAttendee(rsvp.userId).subscribe((user) => {
                  if (!this.attendees.find(x => x.userId == rsvp.userId)){
                    this.attendees.push(user);
                  }                  
                });
              });
              console.log(this.attendees);
            });
          }
        } else {
          this.router.navigate(['*']);
        }
      });
    });
  }

  ngOnInit() {
  }

  openNoteModal(attendee: Attendee){
    let note = new Notes();
    note.attendee = attendee;
    this._CompanyService.getCompany(this.globals.currentUser.uid).subscribe((company) => {
      note.company = company
      this._EventService.GetEventById(this.eventId).subscribe((event) => {
        note.event = event;

        console.log(typeof(note.event ), typeof(event));

        let options: NgbModalOptions = {size: 'lg'};
        const modalRef = this.modalService.open(NoteModalComponent, options);
        modalRef.componentInstance.note = note;
      });
    });
  }

  updateList(){
    //empty list
    this.displayList.splice(0,this.displayList.length);

    this.attendees.forEach(attendee => {
      if (this.matches(attendee)){
        this.displayList.push(attendee);
      }
    });
  }

  matches(attendee: Attendee){
    let matchesName = attendee.fullName.toLowerCase().includes(this.attendeeName.toLowerCase());
    let matchesSchool = attendee.university.toLowerCase().includes(this.university.toLowerCase());
    let matchesDegree = attendee.degree.toLowerCase().includes(this.degree.toLowerCase());

    return (matchesName && matchesSchool && matchesDegree);
  }

  goToAttendee(attendeeId: string){
    this.router.navigate(['attendee-profile', attendeeId]);
  }
}
