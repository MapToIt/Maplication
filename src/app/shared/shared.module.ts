import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFilterPipe } from './pipes/event-filter.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EventFilterPipe],
  exports: [
    EventFilterPipe
  ]
})
export class SharedModule { }
