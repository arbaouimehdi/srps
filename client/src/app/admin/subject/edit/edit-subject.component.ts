import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Subject } from '../../../shared/models/subject.model';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-edit-subject',
  templateUrl: './edit-subject.component.html',
  styleUrls: ['./edit-subject.component.scss']
})
export class EditSubjectComponent {

  constructor(
    public dialogRef: MatDialogRef<EditSubjectComponent>,
    public apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }


  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(): void {
    this.apiService.put(`/subject/${this.data.id}`, this.data).subscribe();
  }


}
