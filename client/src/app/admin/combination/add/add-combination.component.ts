import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

// Models
import { Combination } from '../../../shared/models/combination.model';
import { Subject } from '../../../shared/models/subject.model';
import { Classe } from '../../../shared/models/classe.model';

// Services
import { CombinationsService } from '../../../shared/services/combination.service';

@Component({
  selector: 'app-add-combination',
  templateUrl: './add-combination.component.html',
  styleUrls: ['./add-combination.component.scss']
})
export class AddCombinationComponent implements OnInit {

  isSubmitting = false;
  combinationForm: FormGroup;
  combination: Combination;
  subjects: Subject;
  classes: Classe;

  /**
   * Consturctor
   *
   *
   * @param combinationsService
   * @param route
   * @param fb
   * @param router
   */
  constructor(
    private combinationsService: CombinationsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.combinationForm = this.fb.group({
      classe: '',
      subject: '',
      status: '',
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
    // Retreive the prefetched Combinations
    this.route.data.subscribe(
      (data) => {
        this.subjects = data.subject.subjects;
        this.classes = data.classe.classes;
      }
    );
  }

  /**
   *
   *
   * Add an Item
   *
   *
   */
  addItem(){
    this.isSubmitting = true;

    this.combinationsService
      .add(this.combinationForm.value)
      .subscribe(
        success => {
          this.router.navigateByUrl('admin/manage-subjects-combination')
        },
        err => {
          this.isSubmitting = false;
        }
    );
  }

}
