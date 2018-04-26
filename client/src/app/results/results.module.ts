import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ResultsComponent } from './results.component';

const resultsRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: '',
    component: ResultsComponent,
  }
]);

@NgModule({
  imports: [
    resultsRouting
  ],
  declarations: [
    ResultsComponent
  ]
})
export class ResultsModule { }
