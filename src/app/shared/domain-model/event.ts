export class Event {
    public eventId: number;
    public eventTitle: string;
    public coordinator: string; //Should be a number reference to coordinator DM, but for now string
    public eventStartTime: Date;
    public eventEndTime: Date;
    public description: string;
    public streetNumber: number;
    public street: string;
    public city: string;
    public stateId: number;
    public zipcode: number;
    public eventPic: string;
    public state: string;
  
    constructor(eventId:number, eventTitle:string, coordinator:string, eventStartTime:Date, eventEndTime:Date, description:string, streetNumber:number, street:string, city:string, stateId: number, zipcode:number){
      this.eventId = eventId;
      this.eventTitle = eventTitle;
      this.coordinator = coordinator;
      this.eventStartTime = eventStartTime;
      this.eventEndTime = eventEndTime;
      this.description = description;
      this.streetNumber = streetNumber;
      this.street = street;
      this.city = city;
      this.stateId = stateId;
      this.zipcode = zipcode;
    }
  
  
  }
  