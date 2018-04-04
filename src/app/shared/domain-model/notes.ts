import { Company } from './company';
import { RatingType } from './ratingType';
import { Attendee } from './attendee';
import { Event } from './event';

export class Notes{
  noteId: number;
  note: string;
  company: Company;
  companyId: number;
  attendee: Attendee;
  attendeeId: number;
  event: Event;
  eventId: number;
  date: Date;
  rating: RatingType;
  ratingId: number;
}
