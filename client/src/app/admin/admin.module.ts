import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { AdminComponent } from './admin.component';
import { HeaderComponent, FooterComponent, SidebarComponent } from '../shared';

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
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class AdminModule { }
