import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';

// Modules
import { SharedModule } from '../shared/shared.module';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    component: AdminComponent
    // children: [
    //   {
    //     path: 'home',
    //     component: HomeComponent
    //   }
    // ]
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
  ]
})
export class AdminModule { }
