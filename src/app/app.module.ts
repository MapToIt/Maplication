import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModel } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import {
  AuthMethods,
  AuthProvider,
  AuthProviderWithCustomConfig,
  CredentialHelper,
  FirebaseUIAuthConfig,
  FirebaseUIModule
} from 'firebaseui-angular';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularBasicModalModule } from 'angular-basic-modal';
import { SharedModule } from './shared/shared.module';


const facebookCustomConfig: AuthProviderWithCustomConfig = {
  provider: AuthProvider.Facebook,
  customConfig: {
    scopes: [
      'public_profile',
      'email',
      'user_likes',
      'user_friends'
    ],
    customParameters: {
      // Forces password re-entry.
      auth_type: 'reauthenticate'
    }
  }
};

const firebaseUiAuthConfig: FirebaseUIAuthConfig = {
  providers: [
    AuthProvider.Google,
    facebookCustomConfig,
    // AuthProvider.Twitter,
    // AuthProvider.Github,
    AuthProvider.Password,
    // AuthProvider.Phone
  ],
  method: AuthMethods.Popup,
  tos: '<your-tos-link>',
  credentialHelper: CredentialHelper.AccountChooser
};

import { environment } from './../../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { EventMapComponent } from './event-map/event-map.component';
import { AboutComponent } from './about/about.component';
import { AttendeeProfileComponent } from './attendee-profile/attendee-profile.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { EventListViewComponent } from './event-list-view/event-list-view.component';
import { CoordHomeComponent } from './coord-home/coord-home.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppNavbarComponent,
    AboutComponent,
    LoginComponent,
    AttendeeProfileComponent,
    EventMapComponent,
    NotesComponent,
    EventListViewComponent,
    CoordHomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AngularFireDatabaseModule,
    AngularBasicModalModule,
    NgbModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    SharedModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
