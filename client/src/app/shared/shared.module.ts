import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatInputModule, MatIconModule, MatToolbarModule, MatCard, MatCardModule, MatCardTitle } from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    RouterModule,
  ],
  declarations: [
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatCardModule,
    MatCardTitle,
    RouterModule,
  ]
})
export class SharedModule {}
