import { Coordinator } from "./coordinator";

export class Event {
    public eventId: number;
    public eventTitle: string;
    public coordinatorId: number;
    public startTime: Date;
    public endTime: Date;
    public description: string;
    public streetNumber: number;
    public street: string;
    public city: string;
    public stateId: number;
    public zipCode: number;
    public eventPic: string;
    public state: string;
    public coordinator: Coordinator;
  }
  