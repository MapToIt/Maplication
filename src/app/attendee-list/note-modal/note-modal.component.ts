import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from '../../services/notes-service/notes.service';
import { Globals } from '../../shared/globals';
import { RatingType } from '../../shared/domain-model/ratingType';
import { Notes } from '../../shared/domain-model/notes';
import { RatingTypesService } from '../../services/rating-types-service/rating-types.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-note-modal',
  templateUrl: './note-modal.component.html',
  styleUrls: ['./note-modal.component.css'],
})
export class NoteModalComponent implements OnInit {
  
  //note components
  @Input () note: Notes;

  //view vars
  ratings: RatingType[];



  constructor(public activeModal: NgbActiveModal, private _NotesService: NotesService,
              private _RatingTypesService: RatingTypesService, private router: Router,
              public globals: Globals) {
    
      this._RatingTypesService.getRatingTypes().subscribe((ratings) => {
        this.ratings = ratings;
        console.log(ratings);
      })
    }

  ngOnInit() {
  }

  Submit()
  {
    let validForm = true;
    if (this.note.note == null){
      validForm = false;
      alert('Please enter an note for this attendee.');
    }
    console.log(this.note.ratingId);
    if (this.note.ratingId == null){
      validForm = false;
      alert('Please enter a rating.');
    }
    if (validForm)
    {
      let newNote = new Notes();
      newNote.noteId = 0;
      newNote.note = this.note.note;
      newNote.companyId = this.note.company.companyId;
      newNote.attendeeId = this.note.attendee.attendeeId;
      newNote.eventId = this.note.event.eventId;
      newNote.ratingId = this.note.ratingId;
      newNote.date = new Date();

      console.log(JSON.stringify(newNote));

      this._NotesService.addNote(newNote).subscribe((addedNote) => {
        if (addedNote != null){
          this.activeModal.close();
        }
      })
    }
  }

}
