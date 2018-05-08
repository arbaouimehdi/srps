import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

// Models
import { Result } from '../../../shared/models/result.model';

// Services
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-edit-result',
  templateUrl: './edit-result.component.html',
  styleUrls: ['./edit-result.component.scss']
})
export class EditResultComponent {

  student;
  classe;
  subjects;

  student_infos;
  classeName;
  all_subjects;

  constructor(
    public dialogRef: MatDialogRef<EditResultComponent>,
    public apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  ngOnInit() {
    this.classe = this.data.classe
    this.subjects = this.data.subjects
    this.student = this.data.student

    this.student_infos = this.data.student_infos
    this.classeName = this.data.classe_name
    this.all_subjects = this.data.all_subjects
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.apiService.put(`/result/${this.student}/${this.classe}`, this.data.subjects).subscribe();
  }

  /**
   * Get Gender Type
   *
   *
   * @param id
   */
  getSubject(id) {
    let subjects = this.all_subjects;
    let subject_index = subjects.findIndex(obj => obj._id === id);

    return subjects[subject_index]
  }

}
