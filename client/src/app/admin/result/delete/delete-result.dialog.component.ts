import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Component, Inject} from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { ApiService } from '../../../shared/services/api.service';
import { SubjectsService } from '../../../shared/services/subject.service';

@Component({
  selector: 'app-delete-result.dialog',
  templateUrl: './delete-result.dialog.component.html',
  styleUrls: ['./delete-result.dialog.component.scss']
})

export class DeleteResultDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteResultDialogComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){ }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete() {
    this.apiService.delete(`/result/${this.data.student}/${this.data.classe}`).subscribe();
  }

}
