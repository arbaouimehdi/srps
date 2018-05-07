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
import { EditStudentComponent } from '../admin/student/edit/edit-student.component';
import { StudentsService } from '../shared/services/student.service';
import { StudentResolver } from './student/students-resolver.service';

// Genders
import { GendersService } from '../shared/services/gender.service';
import { GenderResolver } from './genders/genders-resolver.service';

// Classes
import { AddClassComponent } from './classe/add/add-classe.component';
import { ManageClassesComponent } from './classe/manage/manage-classes.component';
import { EditClassComponent } from './classe/edit/edit-classe.component';
import { ClassesService } from '../shared/services/classe.service';
import { ClasseResolver } from './classe/classes-resolver.service';

// Subjects
import { AddSubjectComponent } from './subject/add/add-subject.component';
import { ManageSubjectsComponent } from './subject/manage/manage-subjects.component';
import { EditSubjectComponent } from '../admin/subject/edit/edit-subject.component';
import { SubjectsService } from '../shared/services/subject.service';
import { SubjectResolver } from './subject/subjects-resolver.service';

// Subject Combinations
import { AddCombinationComponent } from './combination/add/add-combination.component';
import { ManageCombinationsComponent } from './combination/manage/manage-combinations.component';
import { EditCombinationComponent } from './combination/edit/edit-combination.component';
import { CombinationsService } from '../shared/services/combination.service';
import { CombinationResolver } from './combination/combinations-resolver.service';

// Results
import { AddResultComponent } from './result/add/add-result.component';
import { ManageResultsComponent } from './result/manage/manage-results.component';
import { ResultsService } from '../shared/services/result.service';
import { ResultResolver } from './result/results-resolver.service';

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
        component: AddStudentComponent,
        resolve: {
          gender: GenderResolver,
          classe: ClasseResolver,
        }
      },
      {
        path: 'manage-students',
        component: ManageStudentComponent,
        resolve: {
          student: StudentResolver,
          gender: GenderResolver,
          classe: ClasseResolver,
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
          classe: ClasseResolver
        }
      },
      {
        path: 'add-subject',
        component: AddSubjectComponent,
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
        component: AddCombinationComponent,
        resolve: {
          subject: SubjectResolver,
          classe: ClasseResolver,
        }
      },
      {
        path: 'manage-subjects-combination',
        component: ManageCombinationsComponent,
        resolve: {
          combination: CombinationResolver,
          classe: ClasseResolver,
          subject: SubjectResolver,
        }
      },
      {
        path: 'add-result',
        component: AddResultComponent,
        resolve: {
          student: StudentResolver,
          combination: CombinationResolver,
          classe: ClasseResolver,
        }
      },
      {
        path: 'manage-results',
        component: ManageResultsComponent,
        resolve: {
          result: ResultResolver,
          classe: ClasseResolver,
          student: StudentResolver,
        }
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

    // Combinations
    AddCombinationComponent,
    ManageCombinationsComponent,

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
    EditStudentComponent,
    EditCombinationComponent,
  ],
  entryComponents: [
    DeleteDialogComponent,
    EditSubjectComponent,
    EditClassComponent,
    EditStudentComponent,
    EditCombinationComponent
  ],
  providers: [

    // Resolvers
    AdminAuthResolver,
    SubjectResolver,
    ClasseResolver,
    StudentResolver,
    GenderResolver,
    CombinationResolver,
    ResultResolver,

    // Services
    SubjectsService,
    ClassesService,
    StudentsService,
    GendersService,
    CombinationsService,
    ResultsService,
  ]
})
export class AdminModule { }
