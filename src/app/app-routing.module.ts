import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }      from './home/home.component'
import { EventMapComponent } from './event-map/event-map.component';
import { AboutComponent } from './about/about.component';
import { AttendeeProfileComponent } from './attendee-profile/attendee-profile.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { EventListViewComponent } from './event-list-view/event-list-view.component';
import { CoordHomeComponent } from './coord-home/coord-home.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'event/:id', component: EventMapComponent },
  { path: 'about', component: AboutComponent },
  { path: 'attendee-profile/:id', component: AttendeeProfileComponent },
  { path: 'company-profile/:id', component: CompanyProfileComponent },
  { path: 'login', component: LoginComponent },
  { path: 'notes', component: NotesComponent },
  { path: 'event-list-view', component: EventListViewComponent},
  { path: 'coord-home/:id', component: CoordHomeComponent },
  { path: 'registration', component: RegistrationComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [
    RouterModule,
   ]
})
export class AppRoutingModule {}
