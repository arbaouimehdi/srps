import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// Models
import { Student } from '../../../shared/models/student.model';
import { Gender } from '../../../shared/models/gender.model';
import { Classe } from '../../../shared/models/classe.model';

import { ApiService } from '../../../shared/services/api.service';
import { GendersService } from '../../../shared/services/gender.service';
import { ClassesService } from '../../../shared/services/classe.service';

@Component({
  selector: 'app-edit-student',
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.scss']
})
export class EditStudentComponent {

  genders: Gender;
  classes: Classe;

  constructor(
    public dialogRef: MatDialogRef<EditStudentComponent>,
    public apiService: ApiService,
    public genderServices: GendersService,
    public classeServices: ClassesService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.genderServices.get('genders').subscribe((data) => {
      this.genders = data.genders;
    })
    this.classeServices.get('classes').subscribe((data) => {
      this.classes = data.classes;
    })
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.apiService.put(`/student/${this.data.id}`, this.data).subscribe();
  }


}
