import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }      from './home/home.component'
import { EventMapComponent } from './event-map/event-map.component';
import { AboutComponent } from './about/about.component';
import { AttendeeProfileComponent } from './attendee-profile/attendee-profile.component';
import { LoginComponent } from './login/login.component';
import { EventListViewComponent } from './event-list-view/event-list-view.component';
import { CoordHomeComponent } from './coord-home/coord-home.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'event', component:EventMapComponent },
  { path: 'event/:id', component: EventMapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'attendee-profile', component: AttendeeProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'event-list-view', component: EventListViewComponent},
  { path: 'coord-home/:id', component: CoordHomeComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule,
   ]
})
export class AppRoutingModule {}
