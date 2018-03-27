import { Event } from './event';
import { UserTypes } from './userTypes';

export class EventAttendance{
  attendanceId: number;
  userId: string;
  userTypeId: number;
  event: Event;
  userTypes: UserTypes;
}
