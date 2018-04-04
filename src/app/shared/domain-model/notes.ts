import { Company } from './company';
import { RatingType } from './ratingType';
import { Attendee } from './attendee';

export class Notes{
  noteId: number;
  note: string;
  company: Company;
  attendee: Attendee;
  event: Event;
  date: Date;
  rating: RatingType;
}
