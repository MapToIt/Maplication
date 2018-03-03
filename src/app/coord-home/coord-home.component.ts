import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-coord-home',
  templateUrl: './coord-home.component.html',
  styleUrls: ['./coord-home.component.css']
})
export class CoordHomeComponent implements OnInit {
   public index = 0;
  futures = [
    {date: '05/01/2018', name: 'Kent Recruiters'},
    {date: '05/30/2018', name: 'Portage County Recruitment'},
    {date: '06/01/2018', name: 'IBM Recruitment'}
  ]
  pasts = [
    {date: '10/01/2017', name: 'Cleveland Recruitment'},
    {date: '10/30/2017', name: 'Engineering Recruitment'},
    {date: '11/01/2017', name: 'Network Recruitment'},
    {date: '12/01/2017', name: 'Tech Recruitment'},
    {date: '01/25/2018', name: 'RN Recruitment'},
    {date: '02/01/2018', name: 'Network Recruitment'}
  ]
  myPast = this.pasts[0];
  myFuture = this.futures[0];
  constructor() {    
   }
    public next(){
    this.index = Math.min(this.index+5, this.pasts.length - 1);
   }
  ngOnInit() {
    
  }

}
