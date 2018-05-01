import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  genders = [
    'Male',
    'Female',
    'Other',
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
