import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';

import { PdfRow } from '../pdf/template/pdf-row';
import { pdfData } from '../pdf/template/pdf-data';

import * as _ from 'lodash'

// Services
import { ResultsService } from '../../shared/services/result.service';

@Component({
  selector: 'app-detail-results',
  templateUrl: './detail-results.component.html',
  styleUrls: ['./detail-results.component.scss']
})
export class DetailResultsComponent implements OnInit {

  result;
  student;
  classe;
  roll_id;

  stats;

  students;
  classes;
  subjects;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private resultsServices: ResultsService,
    public dialog: MatDialog
  ) {}

  /**
   *
   * Init
   *
   */
  ngOnInit() {

    // Retreive the prefetched data
    this.route.data.subscribe(
      (data) => {
        this.students = data.student.students;
        this.subjects = data.subject.subjects;
        this.classes = data.classe.classes;
      }
    );


    //
    //
    // Get URL Params
    this.route.queryParams.subscribe(params => {

      if (params.roll_id && params.classe) {

        this.resultsServices
          .find(params.roll_id, params.classe)
          .subscribe(
            result => {
              let results = result.result;

              this.result  = results;
              this.student = results[0].student;
              this.classe  = params.classe;
              this.roll_id = params.roll_id;

              this.stats = {
                total_marks: _.sumBy(results, 'score'),
                size: _.size(results) * 100
              }

            },
          )
      }

    });
  }

  /**
   * Get Student Object
   *
   *
   * @param student_id
   */
  getStudent(student_id) {
    let students = this.students;
    let student_index = students.findIndex(obj => obj._id === student_id);

    return students[student_index]
  }

  /**
   * Get Classe Object
   *
   * @param classe_id
   */
  getClasse(classe_id) {
    let classes = this.classes;
    let classe_index = classes.findIndex(obj => obj._id === classe_id);

    let section = classes[classe_index].section;
    let name_text = classes[classe_index].name_text;

    return `${name_text}(${section})`
  }

  /**
   * Get Subject Object
   *
   * @param subject_id
   */
  getSubject(subject_id) {
    let subjects = this.subjects;
    let subject_index = subjects.findIndex(obj => obj._id === subject_id);

    return subjects[subject_index]
  }

  /**
   * Calculate Marks Percentage
   *
   *
   * @param total_marks
   * @param size
   */
  marksPercentage(total_marks, size) {
    return (total_marks / size) * 100
  }

}
