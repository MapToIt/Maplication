import { Injectable } from '@angular/core';

@Injectable()
export class RsvpService {

  constructor() { }
  registerEmail:string = "2qool4skool@gmail.net";
  eventID:number = 100000000009;

  getRSVPKey(){
    var key,[] = [this.registerEmail, this.eventID];
    return key;
  }
}
