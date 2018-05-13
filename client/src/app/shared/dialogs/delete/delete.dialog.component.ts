import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';

// Models
import { Errors } from '../../models/errors.model';

// Services
import { ApiService } from '../../../shared/services/api.service';
import { SubjectsService } from '../../../shared/services/subject.service';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: './delete.dialog.html',
  styleUrls: ['./delete.dialog.scss']
})
export class DeleteDialogComponent {

  errors: Errors = {errors: {}}
  isValid: Boolean;

  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.apiService.delete(`/${this.data.route}/${this.data.id}`).subscribe();
  }

}
