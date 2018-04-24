import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { JobPostings } from '../../shared/domain-model/jobPostings';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobModalComponent } from '../job-modal/job-modal.component';
import { JobService } from '../../services/job-service/job.service';
import { Subject } from 'rxjs';
import { Company } from '../../shared/domain-model/company';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  @Input () jobs: JobPostings[];
  @Input () isProfileUser:boolean;
  @Input () profile: Company;
  successMessage: string;
  failMessage: string;
  @Output() _success: EventEmitter<string> = new EventEmitter<string>();
  @Output() _fail: EventEmitter<string> = new EventEmitter<string>();

  constructor(private modalService: NgbModal,
              private _JobService: JobService) { 
    
  }

  ngOnInit() {
    console.log("in list component", this.jobs);
  }

  addJobPosting(companyId: number){
    let job = new JobPostings();
    job.companyId = this.profile.companyId;
    let options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(JobModalComponent, options);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.notify.subscribe(($e) => {
      this._success.emit($e);
      this._JobService.GetJobPostingsByCompanyId(this.profile.companyId).subscribe((jobs) => {
        this.jobs = jobs;
      });
    })
    modalRef.componentInstance.fail.subscribe(($e) => {
      this._fail.emit($e);
    })
  }

  updateJobPosting(job: JobPostings){
    let selectedMoments:Date[] = new Array();
    selectedMoments.push(job.datePosted);
    selectedMoments.push(job.validThrough);
    let options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(JobModalComponent, options);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.selectedMoments = selectedMoments;
    modalRef.componentInstance.notify.subscribe(($e) => {
      this._success.emit($e);
      this._JobService.GetJobPostingsByCompanyId(this.profile.companyId).subscribe((jobs) => {
        this.jobs = jobs;
      });
    })
    modalRef.componentInstance.fail.subscribe(($e) => {
      this._fail.emit($e);
    })
  }

}
