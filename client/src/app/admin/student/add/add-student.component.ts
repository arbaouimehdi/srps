import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Models
import { Student } from '../../../shared/models/student.model';
import { Gender } from '../../../shared/models/gender.model';
import { Classe } from '../../../shared/models/classe.model';

// Services
import { StudentsService } from '../../../shared/services/student.service';

@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.scss']
})
export class AddStudentComponent implements OnInit {

  isSubmitting = false;
  studentForm: FormGroup;
  student: Student;
  genders: Gender;
  classes: Classe;


  /**
   * Constructor
   *
   *
   * @param route
   */
  constructor(
    private studentsService: StudentsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.studentForm = this.fb.group({
      full_name: '',
      roll_id: '',
      email: '',
      gender: '',
      classe: '',
      birth_date: '',
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
        this.genders = data.gender.genders;
        this.classes = data.classe.classes;
      }
    );
  }

  /**
   *
   * Add an Item
   *
   */
  addItem(){
    this.isSubmitting = true;

    this.studentsService
      .add(this.studentForm.value)
      .subscribe(
        success => {
          this.router.navigateByUrl('admin/manage-students')
        },
        err => {
          this.isSubmitting = false;
        }
    );
  }

}
