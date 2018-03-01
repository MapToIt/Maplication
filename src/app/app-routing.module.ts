import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }      from './home/home.component';
import { EventMapComponent } from './event-map/event-map.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'event', component:EventMapComponent },
  { path: 'event/:id', component: EventMapComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule,
   ]
})
export class AppRoutingModule {}
