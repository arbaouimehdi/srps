import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import * as _ from 'lodash'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  students_number: Number
  classes_number: Number
  subjects_number: Number
  results_number

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data.subscribe(
      (data) => {
        this.students_number = data.student.students.length;
        this.classes_number  = data.classe.classes.length;
        this.subjects_number = data.subject.subjects.length;
        this.results_number  = _(data.result.results).groupBy('student').size();
      }
    )
  }

}
