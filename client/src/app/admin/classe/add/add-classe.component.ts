import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

// Models
import { Classe } from '../../../shared/models/classe.model';

// Services
import { ClassesService } from '../../../shared/services/classe.service';

// Resolvers
import { ClasseResolver } from '../classes-resolver.service';

@Component({
  selector: 'app-add-classe',
  templateUrl: './add-classe.component.html',
  styleUrls: ['./add-classe.component.scss']
})
export class AddClassComponent implements OnInit {

  isSubmitting = false;
  classe: Classe = {} as Classe;
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
      name_numeric: ['', [
        Validators.min(0),
        Validators.max(10)
      ]],
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
