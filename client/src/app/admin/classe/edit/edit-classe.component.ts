import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { Classe } from '../../../shared/models/classe.model';
import { ApiService } from '../../../shared/services/api.service';

@Component({
  selector: 'app-edit-classe',
  templateUrl: './edit-classe.component.html',
  styleUrls: ['./edit-classe.component.scss']
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
    this.apiService.put(`/classe/${this.data.id}`, this.data).subscribe();
  }


}
