import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent }      from './home/home.component';
import { CoordHomeComponent } from './coord-home/coord-home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'coordinator', component: CoordHomeComponent },
  { path: '**', redirectTo: 'home'}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ 
    RouterModule,
   ]
})
export class AppRoutingModule {}