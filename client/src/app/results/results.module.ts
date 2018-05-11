import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';

import { PDFExportModule } from '@progress/kendo-angular-pdf-export';

// Components
import { HomeResultsComponent } from './home/home-results.component';
import { DetailResultsComponent } from './detail/detail-results.component';
import { PdfTemplateComponent } from './pdf/template/pdf-template.component';

// Resolvers
import { ClasseResolver } from '../admin/classe/classes-resolver.service';
import { StudentResolver } from '../admin/student/students-resolver.service';
import { SubjectResolver } from '../admin/subject/subjects-resolver.service';

// Modules
import { SharedModule } from '../shared/shared.module';

const resultsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: HomeResultsComponent,
    resolve: {
      classe: ClasseResolver,
    }
  },
  {
    path: 'results',
    component: DetailResultsComponent,
    resolve: {
      student: StudentResolver,
      classe: ClasseResolver,
      subject: SubjectResolver
    }
  }
]);

@NgModule({
  imports: [
    BrowserModule,
    PDFExportModule,
    resultsRouting,
    SharedModule,
  ],
  declarations: [
    HomeResultsComponent,
    DetailResultsComponent,
    PdfTemplateComponent,
  ]
})
export class ResultsModule { }
