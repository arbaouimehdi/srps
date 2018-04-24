import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-subject-combination',
  templateUrl: './add-subject-combination.component.html',
  styleUrls: ['./add-subject-combination.component.scss']
})
export class AddSubjectCombinationComponent implements OnInit {

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
