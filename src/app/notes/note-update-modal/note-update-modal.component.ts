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
  selector: 'app-note-update-modal',
  templateUrl: './note-update-modal.component.html',
  styleUrls: ['./note-update-modal.component.css']
})
export class NoteUpdateModalComponent implements OnInit {
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

    if (this.note.ratingId == null){
      validForm = false;
      alert('Please enter a rating.');
    }

    if (this.note.recruiter == null){
      validForm = false;
      alert('Please enter the recruiter\'s name.');
    }
    
    if (validForm)
    {
      let newNote = new Notes();
      newNote.noteId = this.note.noteId;
      newNote.note = this.note.note;
      newNote.companyId = this.note.companyId;
      newNote.attendeeId = this.note.attendeeId;
      newNote.eventId = this.note.eventId;
      newNote.ratingId = this.note.ratingId;
      newNote.recruiter = this.note.recruiter;
      newNote.date = this.note.date;

      this._NotesService.updateNote(newNote).subscribe((addedNote) => {
        if (addedNote != null){
          this.activeModal.close();
        }
      })
    }
  }

}
