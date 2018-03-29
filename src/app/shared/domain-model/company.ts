import { State } from './state';
import { Tags } from './tags';

export class Company {
  companyId: number;
  userId: string;
  companyName: string;
  phoneNumber: string;
  streetNumber: number;
  street: string;
  city: string;
  stateId: number;
  zipCode: number;
  logo: string;
  url: string;
  chips: string;
  state: State;
}
