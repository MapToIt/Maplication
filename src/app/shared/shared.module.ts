import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFilterPipe } from './pipes/event-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    EventFilterPipe
  ],
  exports: [
    EventFilterPipe
  ]
})
export class SharedModule { }
