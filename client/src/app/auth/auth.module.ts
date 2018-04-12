import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

// Components
import { AuthComponent } from './auth.component';

// Modules
import { SharedModule } from '../shared/shared.module';

const authRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'login',
    component: AuthComponent
  }
]);

@NgModule({
  imports: [
    authRouting,
    SharedModule,
  ],
  declarations: [
    AuthComponent
  ]
})
export class AuthModule { }
