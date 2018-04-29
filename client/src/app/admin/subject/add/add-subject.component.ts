import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Models
import { Subject } from '../../../shared/models/subject.model';

// Services
import { SubjectsService } from '../../../shared/services/subject.service';

// Resolvers
import { SubjectResolver } from '../subjects-resolver.service';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss']
})
export class AddSubjectComponent implements OnInit {

  isSubmitting = false;
  subject: Subject = {} as Subject;
  subjectForm: FormGroup;

  /**
   * Constructor
   *
   *
   */
  constructor(
    private subjectsService: SubjectsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.subjectForm = this.fb.group({
      name: '',
      code: ''
    });
  }

  /**
   *
   * Init
   *
   */
  ngOnInit() {
  }

  /**
   *
   * Add an Item
   *
   */
  addItem(){
    this.isSubmitting = true;

    this.subjectsService
      .add(this.subjectForm.value)
      .subscribe(
        success => {
          this.router.navigateByUrl('admin/manage-subjects')
        },
        err => {
          this.isSubmitting = false;
        }
    );
  }

}
