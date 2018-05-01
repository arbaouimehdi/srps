import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-combination',
  templateUrl: './add-combination.component.html',
  styleUrls: ['./add-combination.component.scss']
})
export class AddCombinationComponent implements OnInit {

  subjects = [
    { name: 'English' },
    { name: 'Math' },
    { name: 'Computer Science' }
  ];

  classes = [
    {name: 'One Section-A'},
    {name: 'Two Section-A'},
    {name: 'KTT Section-H'}
  ];

  constructor() { }

  ngOnInit() {
  }

}
