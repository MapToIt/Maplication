export class Event {
  public eventId: number;
  public eventName: string;
  public coordinator: string; //Should be a number reference to coordinator DM, but for now string
  public eventStartTime: Date;
  public eventEndTime: Date;

  constructor(eventId:number, eventName:string, coordinator:string, eventStartTime:Date, eventEndTime:Date){
    this.eventId = eventId;
    this.eventName = eventName;
    this.coordinator = coordinator;
    this.eventStartTime = eventStartTime;
    this.eventEndTime = eventEndTime;
  }


}
