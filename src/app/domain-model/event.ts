export class Event{
  public eventId: number;
  public eventName: string;
  public coordinator: number;
  public eventStateTime: Date;
  public eventEndTime: Date;

  constructor(eventId:number, eventName:number, coordinator:number, eventStartTime:Date, eventEndTime:Date){
    this.eventId = eventId;
    this.eventName = eventName;
    this.coordinator = coordinator;
    this.eventStartTime = eventStartTime;
    this.eventEndTime = eventEndTime;
  }

  
}
