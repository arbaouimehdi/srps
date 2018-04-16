import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { AddStudentComponent } from './student/add-student.component';
import { ManageStudentComponent } from './student/manage-student.component';
import { AddClassComponent } from './class/add-class.component';
import { ManageClassesComponent } from './class/manage-classes.component';
import { AddSubjectComponent } from './subject/add-subject.component';
import { ManageSubjectsComponent } from './subject/manage-subjects.component';
import { ManageResultsComponent } from './result/manage-results.component';
import { AddResultComponent } from './result/add-result.component';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'add-student',
        component: AddStudentComponent
      },
      {
        path: 'manage-students',
        component: ManageStudentComponent
      },
      {
        path: 'add-class',
        component: AddClassComponent
      },
      {
        path: 'manage-classes',
        component: ManageClassesComponent
      },
      {
        path: 'add-subject',
        component: AddSubjectComponent
      },
      {
        path: 'manage-subjects',
        component: ManageSubjectsComponent
      },
      {
        path: 'add-result',
        component: AddResultComponent
      },
      {
        path: 'manage-results',
        component: ManageResultsComponent
      }
    ]
  }
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    adminRouting
  ],
  declarations: [
    AdminComponent,
    AddStudentComponent,
    ManageStudentComponent,
    AddClassComponent,
    ManageClassesComponent,
    AddSubjectComponent,
    ManageSubjectsComponent,
    ManageResultsComponent,
    AddResultComponent,
  ]
})
export class AdminModule { }
