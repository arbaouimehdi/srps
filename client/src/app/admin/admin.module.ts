import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { FlexLayoutModule } from '@angular/flex-layout';

// Shared
import { SharedModule } from '../shared/shared.module';
import { DeleteDialogComponent } from '../shared/dialogs/delete/delete.dialog.component';

// Admin
import { AdminComponent } from './admin.component';

// Authentication
import { AdminAuthResolver } from './admin-auth-resolver.service';

// Home
import { HomeComponent } from './home/home.component';

// Students
import { AddStudentComponent } from './student/add/add-student.component';
import { ManageStudentComponent } from './student/manage/manage-student.component';
import { StudentsService } from '../shared/services/student.service';
import { StudentResolver } from './student/students-resolver.service';

// Genders
import { GendersService } from '../shared/services/gender.service';
import { GenderResolver } from './genders/genders-resolver.service';

// Classes
import { AddClassComponent } from './class/add/add-class.component';
import { ManageClassesComponent } from './class/manage/manage-classes.component';
import { EditClassComponent } from './class/edit/edit-class.component';
import { ClassesService } from '../shared/services/class.service';
import { ClassResolver } from './class/classes-resolver.service';

// Subjects
import { AddSubjectComponent } from './subject/add/add-subject.component';
import { ManageSubjectsComponent } from './subject/manage/manage-subjects.component';
import { EditSubjectComponent } from '../admin/subject/edit/edit-subject.component';
import { SubjectsService } from '../shared/services/subject.service';
import { SubjectResolver } from './subject/subjects-resolver.service';

// Subject Combinations
import { AddSubjectCombinationComponent } from './subject/combination/add-subject-combination.component';
import { ManageSubjectsCombinationComponent } from './subject/combination/manage-subjects-combination.component';

// Results
import { ManageResultsComponent } from './result/manage-results.component';
import { AddResultComponent } from './result/add-result.component';

// Profile
import { PasswordComponent } from './profile/password.component';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent,
    resolve: {
      isAuthenticated: AdminAuthResolver
    },
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'add-student',
        component: AddStudentComponent
      },
      {
        path: 'manage-students',
        component: ManageStudentComponent,
        resolve: {
          student: StudentResolver,
          gender: GenderResolver,
        }
      },
      {
        path: 'add-class',
        component: AddClassComponent
      },
      {
        path: 'manage-classes',
        component: ManageClassesComponent,
        resolve: {
          claass: ClassResolver
        }
      },
      {
        path: 'add-subject',
        component: AddSubjectComponent
      },
      {
        path: 'manage-subjects',
        component: ManageSubjectsComponent,
        resolve: {
          subject: SubjectResolver
        }
      },
      {
        path: 'add-subject-combination',
        component: AddSubjectCombinationComponent
      },
      {
        path: 'manage-subjects-combination',
        component: ManageSubjectsCombinationComponent,
      },
      {
        path: 'add-result',
        component: AddResultComponent
      },
      {
        path: 'manage-results',
        component: ManageResultsComponent
      },
      {
        path: 'profile-password',
        component: PasswordComponent
      }
    ]
  }
]);

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    BrowserModule,
    FlexLayoutModule,
    adminRouting
  ],
  declarations: [

    // Admin
    AdminComponent,

    // Students
    AddStudentComponent,
    ManageStudentComponent,

    // Classes
    AddClassComponent,
    ManageClassesComponent,

    // Subjects
    AddSubjectComponent,
    ManageSubjectsComponent,

    // Subjects Combination
    AddSubjectCombinationComponent,
    ManageSubjectsCombinationComponent,

    // Results
    ManageResultsComponent,
    AddResultComponent,

    // Profile
    PasswordComponent,

    // Home
    HomeComponent,

    // Dialogs
    DeleteDialogComponent,
    EditSubjectComponent,
    EditClassComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
    EditSubjectComponent,
    EditClassComponent
  ],
  providers: [

    // Resolvers
    AdminAuthResolver,
    SubjectResolver,
    ClassResolver,
    StudentResolver,
    GenderResolver,

    // Services
    SubjectsService,
    ClassesService,
    StudentsService,
    GendersService
  ]
})
export class AdminModule { }
