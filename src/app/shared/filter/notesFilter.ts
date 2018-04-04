import { RatingType } from '../domain-model/ratingType';

export class NotesFilter {
    start: Date;
    end: Date;
    attendeeName: string;
    degree: string;
    university: string;
    ratingType: RatingType;
    companyId: number;
  }