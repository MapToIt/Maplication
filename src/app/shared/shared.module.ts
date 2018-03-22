import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EventFilterPipe } from './pipes/event-filter.pipe';
//import { CompanyComponent } from './domain-model/company/company.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [EventFilterPipe, 
    //CompanyComponent
  ],
  exports: [
    EventFilterPipe
  ]
})
export class SharedModule { }
