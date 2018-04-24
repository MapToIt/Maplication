import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SalaryTypeService } from '../../services/salary-type-service/salary-type.service';
import { EmploymentTypeService } from '../../services/employment-type-service/employment-type.service';
import { EmploymentTypes } from '../../shared/domain-model/employment-types';
import { SalaryTypes } from '../../shared/domain-model/salary-types';
import { JobPostings } from '../../shared/domain-model/jobPostings';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../../services/job-service/job.service';

@Component({
  selector: 'app-job-modal',
  templateUrl: './job-modal.component.html',
  styleUrls: ['./job-modal.component.css']
})
export class JobModalComponent implements OnInit {
  
  employmentTypes: EmploymentTypes[];
  salaryTypes: SalaryTypes[];

  @Input () job: JobPostings;
  @Input () selectedMoments: Date[];
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @Output() fail: EventEmitter<string> = new EventEmitter<string>();
  

  constructor(public activeModal: NgbActiveModal,
              private _SalaryTypesService: SalaryTypeService,
              private _EmploymentTypesService: EmploymentTypeService,
              private _JobService: JobService) {
                

    this._EmploymentTypesService.getEmploymentTypes().subscribe((types) => {
      this.employmentTypes = types;
    });

    this._SalaryTypesService.getSalaryTypes().subscribe((types) => {
      this.salaryTypes = types;
    });
  }
              

  ngOnInit() {
  }

  Submit()
  {
    this.job.datePosted = this.selectedMoments[0];
    this.job.validThrough = this.selectedMoments[1];
    this.job.active = true;
    if(this.job.jobId != undefined){
      this._JobService.UpdateJobPosting(this.job).subscribe((job) =>{
        if (job != null){
          this.notify.emit('Job posting successfully updated.');
          this.activeModal.close();
        }
        else{
          this.fail.emit('Job posting failed to update.');
        }
      });
    } else {
      this._JobService.AddJobPosting(this.job).subscribe((job) =>{
        if (job != null){
          this.notify.emit('Job posting successfully added.');
          this.activeModal.close();
        }
        else{
          this.fail.emit('Job posting failed.');
        }
      });
    }
    
    this.activeModal.close();
  }
}
