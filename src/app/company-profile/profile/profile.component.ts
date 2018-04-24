import { Component, OnInit, state, Input, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import { Company } from '../../shared/domain-model/company';
import { State } from '../../shared/domain-model/state';
import { Tags } from '../../shared/domain-model/tags';
import { Globals } from '../../shared/globals';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { FileUploadService } from '../../services/file-upload-service/file-upload.service';
import { CompanyService } from '../../services/company-service/company.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { StatesService } from '../../services/states-service/states.service';
import { ChipService } from '../../services/chip-service/chip.service';
import { JobPostings } from '../../shared/domain-model/jobPostings';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobModalComponent } from '../job-modal/job-modal.component';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input () profile: Company;
  @Input () streetAddress: string;
  @Input () companyChips: string[];
  @Input () states: State[];
  @Input () chips: Tags[];
  @Input () isProfileUser: boolean;
  private _success = new Subject<string>();
  private _fail = new Subject<string>();
  newTag: Tags;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @Output() fail: EventEmitter<string> = new EventEmitter<string>();
  changeMade: boolean = false;
  mask:any[] = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];


  search = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.states.filter(v => v.stateName.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatter = (x: {stateName: string}) => x.stateName;

  searchTags = (text$: Observable<string>) =>
    text$
      .debounceTime(200)
      .map(term => term === '' ? []
        : this.chips.filter(v => v.tag.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10));

  formatterTag = (x: {tag: string}) => x.tag;

  constructor(private _CompanyService: CompanyService,
              private _StatesService: StatesService, private _ChipService: ChipService,
              private _FileUploadService: FileUploadService, private globals: Globals,
              private route: ActivatedRoute, private router: Router,
              private modalService: NgbModal,
              public afAuth: AngularFireAuth, public af: AngularFireDatabase) {

                this._StatesService.getStates().subscribe((states) => {
                  this.states = states;
                });
          
                this._ChipService.getChips().subscribe((chips) => {
                  this.chips = chips;
                });   
               }

  ngOnInit() {}

  updateCompany(){
    this.profile.chips = JSON.stringify(this.companyChips);
    this.profile.phoneNumber = this.profile.phoneNumber.replace(/\D+/g, '');
    this.profile.streetNumber = parseInt(this.streetAddress.slice(0, this.streetAddress.indexOf(' ')));
    this.profile.street = this.streetAddress.slice(this.streetAddress.indexOf(' ')+1, this.streetAddress.length);
    console.log(this.profile);
    if (!(this.profile.city && this.profile.companyName && this.profile.phoneNumber && 
          this.profile.state && this.profile.street && this.profile.streetNumber)){
      alert("Please complete all fields of your profile before saving.");
    } else {
      this._CompanyService.updateCompany(this.profile).subscribe(
        data => {
          if(data != null){
            this.changeMade = false;
            this.notify.emit('Note successfully updated.');
            this.router.navigate(['company-profile', this.afAuth.auth.currentUser.uid]);
          }
        },
        err => {
          this.fail.emit('Note successfully updated.');
        }
      );
    }
  }

  addChip(newChip){
    if(!this.companyChips.includes(newChip.tag)){
      this.companyChips.push(newChip.tag);
      this.newTag = null;
      this.changeMade = true;
    }
  }

  deleteChip(chip: string) {
    const index: number = this.companyChips.indexOf(chip);
    this.companyChips.splice(index, 1);
    this.changeMade = true;
  }

  handleFileInputImg(files: any[]) {
    var file: File = files[0];

    this._FileUploadService.uploadFile(file).subscribe(
      (data) => {
        this.profile.logo = data;
        this.updateCompany();
      }
    )
  }

  AddJobPosting(){
    let job = new JobPostings();
    job.companyId = this.profile.companyId;
    let options: NgbModalOptions = {size: 'lg'};
    const modalRef = this.modalService.open(JobModalComponent, options);
    modalRef.componentInstance.job = job;
    modalRef.componentInstance.notify.subscribe(($e) => {
      this.notify.emit(this._success.next($e));
    })
    modalRef.componentInstance.fail.subscribe(($e) => {
      this.fail.emit(this._fail.next($e));
    })
  }
}
