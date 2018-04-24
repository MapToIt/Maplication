import { Company } from './company';
import { EmploymentTypes } from './employment-types';
import { SalaryTypes } from './salary-types';

export class JobPostings{
  jobId: number;
  companyId: number;
  jobTitle: string;
  description: string;
  company: Company;
  employmentTypeId:number;
  baseSalary:number;
  salaryTypeId:number;
  datePosted:Date;
  validThrough:Date;
  active:boolean;
  employmentType:EmploymentTypes;
  salaryType:SalaryTypes;
}
