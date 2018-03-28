import { Coordinator } from "./coordinator";

export class Event {
    public eventId: number;
    public eventTitle: string;
    public coordinatorId: number; //Should be a number reference to coordinator DM, but for now string
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
    public coordinator: Coordinator;
  }
  