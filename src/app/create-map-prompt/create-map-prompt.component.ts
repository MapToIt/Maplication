import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-map-prompt',
  templateUrl: './create-map-prompt.component.html',
  styleUrls: ['./create-map-prompt.component.css']
})
export class CreateMapPromptComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

}
