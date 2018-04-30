import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Class } from '../../../shared/models/class.model';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-edit-class',
  templateUrl: './edit-class.component.html',
  styleUrls: ['./edit-class.component.scss']
})
export class EditClassComponent {

  constructor(
    public dialogRef: MatDialogRef<EditClassComponent>,
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
    this.apiService.put(`/claass/${this.data.id}`, this.data).subscribe();
  }


}
