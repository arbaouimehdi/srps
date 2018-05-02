import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// Models
import { Combination } from '../../../shared/models/combination.model';
import { Subject } from '../../../shared/models/subject.model';
import { Classe } from '../../../shared/models/classe.model';

import { ApiService } from '../../../shared/services/api.service';
import { SubjectsService } from '../../../shared/services/subject.service';
import { ClassesService } from '../../../shared/services/classe.service';

@Component({
  selector: 'app-edit-combination',
  templateUrl: './edit-combination.component.html',
  styleUrls: ['./edit-combination.component.scss']
})
export class EditCombinationComponent {

  subjects: Subject;
  classes: Classe;

  constructor(
    public dialogRef: MatDialogRef<EditCombinationComponent>,
    public apiService: ApiService,
    public subjectServices: SubjectsService,
    public classeServices: ClassesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.subjectServices.get('subjects').subscribe((data) => {
      this.subjects = data.subjects;
    })
    this.classeServices.get('classes').subscribe((data) => {
      this.classes = data.classes;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.apiService.put(`/combination/${this.data.id}`, this.data).subscribe();
  }


}
