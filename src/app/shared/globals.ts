import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';

@Injectable()
export class Globals {
  apiUrl: string = 'http://192.241.142.82:5000/api/';
  isAttendee: boolean = false;
  isCoordinator: boolean = false;
  isCompany: boolean = false;
  appLoaded: boolean = false;
  currentUser: firebase.User = null;
}
