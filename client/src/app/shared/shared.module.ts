import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ShowAuthedDirective } from './show-authed.directive';

import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatSelectModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSortModule,
  MatTableModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

import { ListErrorsComponent } from './list-errors.component';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    ShowAuthedDirective,
    ListErrorsComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSortModule,
    MatTableModule,
    MatToolbarModule,
    MatTooltipModule,
    ShowAuthedDirective,
    ListErrorsComponent
  ]
})
export class SharedModule {}
