import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFilterPipe } from './pipes/event-filter.pipe';
import { NoteModalComponent } from './modals/note-modal/note-modal.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    EventFilterPipe, 
    NoteModalComponent
  ],
  exports: [
    EventFilterPipe
  ]
})
export class SharedModule { }
