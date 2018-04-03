import { Coordinator } from "./coordinator";
import { State } from './state';

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
    public state: State;
    public coordinator: Coordinator;
  }
  