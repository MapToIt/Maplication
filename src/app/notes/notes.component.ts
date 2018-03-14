import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  
  addNote = false;

  entries = [
    {
      name:"John Doe",
      date:"Jan 1 1970",
      major:"Computer Science",
      email:"john.doe@gmail.com",
      notes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam at lectus urna duis convallis convallis. Nisl tincidunt eget nullam non nisi est sit amet. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Massa tincidunt dui ut ornare. A erat nam at lectus. Habitant morbi tristique senectus et netus et malesuada fames ac. Elit ullamcorper dignissim cras tincidunt. Gravida neque convallis a cras semper auctor neque vitae. Orci nulla pellentesque dignissim enim sit. Risus nullam eget felis eget nunc lobortis mattis. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Id faucibus nisl tincidunt eget nullam non. Sed elementum tempus egestas sed sed risus."
    },
    {
      name:"Jane Doe",
      date:"Jan 2 1970",
      major:"Physics",
      email:"jane.doe@kent.edu",
      notes:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nam at lectus urna duis convallis convallis. Nisl tincidunt eget nullam non nisi est sit amet. Lorem ipsum dolor sit amet consectetur adipiscing elit. Sit amet nisl suscipit adipiscing bibendum est ultricies integer. Cursus euismod quis viverra nibh cras pulvinar mattis nunc. Massa tincidunt dui ut ornare. A erat nam at lectus. Habitant morbi tristique senectus et netus et malesuada fames ac. Elit ullamcorper dignissim cras tincidunt. Gravida neque convallis a cras semper auctor neque vitae. Orci nulla pellentesque dignissim enim sit. Risus nullam eget felis eget nunc lobortis mattis. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Id faucibus nisl tincidunt eget nullam non. Sed elementum tempus egestas sed sed risus."
    }
  ];

  constructor() { 
  }

  ngOnInit() {
  }

  toggleAddNote(){
    this.addNote = true;
  }

  submitNote(){
    this.addNote = false;
  }
}
