import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class Globals {
  readonly apiUrl: string = 'http://localhost:63411/api/';
  isAttendee: boolean = false;
  isCoordinator: boolean = false;
  isCompany: boolean = false;
  appLoaded: boolean = false;
  currentUser: firebase.User = null;
}
