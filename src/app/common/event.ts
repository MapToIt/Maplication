import { Time } from "@angular/common";

export class Event {
    eventPic:string;
    eventID:number;
    eventName:string;
    eventDesc:string;
    eventLocCity:string;
    eventLocState:string;

    constructor(id:number, name:string, desc:string, pic:string, city:string, state:string) {
        this.eventDesc = desc;
        this.eventID = id;
        this.eventName = name;
        this.eventPic = pic;
        this.eventLocCity = city;
        this.eventLocState = state;
    }
}
