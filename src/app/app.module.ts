import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireStorageModule } from 'angularfire2/storage';
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
import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from './shared/shared.module';

import {Ng2AutoCompleteModule} from 'ng2-auto-complete';
import { StatesService } from './services/states-service/states.service';
import { Globals } from './shared/globals';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { EventFilterPipe } from './shared/pipes/event-filter.pipe'
import { UserService } from './services/user-service/user.service';
import { AttendeeService } from './services/attendee-service/attendee.service';
import { CompanyService } from './services/company-service/company.service';
import { FileUploadService } from './services/file-upload-service/file-upload.service';
import { CoordinatorService } from './services/coordinator/coordinator.service';

import { ChipService } from './services/chip-service/chip.service';
import { EventService } from './services/event-service/event.service';
import { EventAttendanceService } from './services/event-attendance-service/event-attendance.service';
import { NotesService } from './services/notes-service/notes.service';
import { RatingTypesService } from './services/rating-types-service/rating-types.service';


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
  credentialHelper: CredentialHelper.None
};

import { environment } from './../../environments/environment';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';
import { AppRoutingModule } from './/app-routing.module';
import { EventMapComponent } from './event-map/event-map.component';
import { AboutComponent } from './about/about.component';
import { AttendeeListComponent } from './attendee-list/attendee-list.component';
import { AttendeeProfileComponent } from './attendee-profile/attendee-profile.component';
import { LoginComponent } from './login/login.component';
import { NotesComponent } from './notes/notes.component';
import { EventListViewComponent } from './event-list-view/event-list-view.component';
import { CoordHomeComponent } from './coord-home/coord-home.component';
import { RegistrationComponent } from './registration/registration.component';
import { CompanyProfileComponent } from './company-profile/company-profile.component';
import { CreateMapPromptComponent } from './create-map-prompt/create-map-prompt.component';
import { NoteModalComponent } from './attendee-list/note-modal/note-modal.component';
import { NoteUpdateModalComponent } from './notes/note-update-modal/note-update-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppNavbarComponent,
    AboutComponent,
    AttendeeListComponent,
    LoginComponent,
    AttendeeProfileComponent,
    EventMapComponent,
    NotesComponent,
    EventListViewComponent,
    CoordHomeComponent,
    RegistrationComponent,
    CompanyProfileComponent,
    CreateMapPromptComponent,
    NoteModalComponent,
    NoteUpdateModalComponent,

  ],
  entryComponents: [
    CreateMapPromptComponent,
    NoteModalComponent,
    NoteUpdateModalComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    Ng2AutoCompleteModule,
    AngularFireDatabaseModule,
    AngularBasicModalModule,
    AngularFireStorageModule,
    NgbModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    Ng2SearchPipeModule,
    SharedModule,
    NgxPaginationModule,
    TextMaskModule
  ],
  providers: [
    Globals,
    UserService,
    StatesService,
    AttendeeService,
    CompanyService,
    FileUploadService,
    CoordinatorService,
    ChipService,
    EventService,
    EventAttendanceService,
    NotesService,
    RatingTypesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
