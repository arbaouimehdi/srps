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
  ]
})
export class AdminModule { }
