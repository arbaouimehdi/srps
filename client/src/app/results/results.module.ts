import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { HomeResultsComponent } from './home/home-results.component';
import { DetailResultsComponent } from './detail/detail-results.component';

// Resolvers
import { ClasseResolver } from '../admin/classe/classes-resolver.service';

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
  }
]);

@NgModule({
  imports: [
    resultsRouting,
    SharedModule,
  ],
  declarations: [
    HomeResultsComponent,
    DetailResultsComponent
  ]
})
export class ResultsModule { }
