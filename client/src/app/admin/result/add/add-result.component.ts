import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, FormArray, ValidationErrors, Validators } from '@angular/forms';

// Models
import { Result } from '../../../shared/models/result.model';
import { Student } from '../../../shared/models/student.model';
import { Combination } from '../../../shared/models/combination.model';

// Services
import { ResultsService } from '../../../shared/services/result.service';
import { ApiService } from '../../../shared';

@Component({
  selector: 'app-add-result',
  templateUrl: './add-result.component.html',
  styleUrls: ['./add-result.component.scss']
})
export class AddResultComponent implements OnInit {

  isSubmitting = false;
  resultForm: FormGroup;
  result: Result;
  students: Student;
  combinations;
  classes;
  combination_subjects;

  /**
   * Constructor
   *
   *
   * @param resultsService
   * @param route
   * @param fb
   * @param router
   */
  constructor(
    private resultsService: ResultsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private apiService: ApiService,
  ) {
    this.resultForm = this.fb.group({
      student: '',
      classe: ''
    });

  }

  /**
   *
   *
   * Init
   *
   *
   */
  ngOnInit() {
    // Retreive the prefetched Students
    this.route.data.subscribe(
      (data) => {
        this.combinations = data.combination.combinations;
        this.students = data.student.students;
        this.classes = data.classe.classes;
      }
    );
  }

  /**
   *
   * Add an Item
   *
   */
  addItem() {

    let resultForm = this.resultForm.value;
    let resultsLength = Object.keys(resultForm).length;
    let errorsLength = Object.keys(this.getFormValidationErrors()).length;
    let subjectsScores = []
    let hiddenSubjectsLength = document.querySelectorAll('.hidden-subjects').length;

    if (resultsLength > 2) {
      for (let i = 0; i < hiddenSubjectsLength; i++) {
        subjectsScores[i] = {
          student: resultForm.student,
          classe: resultForm.classe,
          subject: resultForm[`subject${i}`],
          score: resultForm[`score${i}`],
        }
      }

      // if the form is valid
      if (errorsLength == 0 ){
        this.resultsService
          .add(subjectsScores)
          .subscribe(
            success => {
              this.router.navigateByUrl('admin/manage-results')
            },
            err => {
              this.isSubmitting = false;
            }
        );
      }

    }

  }

  /**
   * Get Combination Subjects
   *
   *
   * @param class_id
   */
  getCombinationSubjects(classe) {
    this.apiService.get(`/combination/classe/${classe._id}`).subscribe((data) => {
      this.combination_subjects = data.combination;

      let formLength = Object.keys(this.resultForm.value).length;

      // Remove Score Form Controls if They already exist
      if (formLength > 2) {
        for (let i = 0; i < (formLength - 1); i++) {
          this.resultForm.removeControl(`score${i}`)
          this.resultForm.removeControl(`subject${i}`)
        }
      }

      // Add Scores Form Controls
      for (let i = 0; i < this.combination_subjects.length; i++) {
        this.resultForm.addControl(`score${i}`, new FormControl('', [
          Validators.min(0),
          Validators.max(100)
        ]))
        this.resultForm.addControl(`subject${i}`, new FormControl(''));
      }

    });
  }

  getFormValidationErrors() {
    let errors = [];

    Object.keys(this.resultForm.controls).forEach(key => {

      const controlErrors: ValidationErrors = this.resultForm.get(key).errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          errors[key] = controlErrors[keyError];
        });
      }
    });

    return errors;
  }

}
