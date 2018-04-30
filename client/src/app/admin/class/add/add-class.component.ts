import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Models
import { Class } from '../../../shared/models/class.model';

// Services
import { ClassesService } from '../../../shared/services/class.service';

// Resolvers
import { ClassResolver } from '../classes-resolver.service';

@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.scss']
})
export class AddClassComponent implements OnInit {

  isSubmitting = false;
  claass: Class = {} as Class;
  classForm: FormGroup;

  /**
   * Constructor
   *
   *
   */
  constructor(
    private classesService: ClassesService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.classForm = this.fb.group({
      name_text: '',
      name_numeric: '',
      section: ''
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

    this.classesService
      .add(this.classForm.value)
      .subscribe(
        success => {
          this.router.navigateByUrl('admin/manage-classes')
        },
        err => {
          this.isSubmitting = false;
        }
    );
  }

}
