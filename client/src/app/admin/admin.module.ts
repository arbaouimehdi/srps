import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Components
import { HomeComponent } from './home/home.component';
import { HeaderComponent, FooterComponent, SidebarComponent } from '../shared';

// Modules
import { SharedModule } from '../shared/shared.module';

const adminRouting: ModuleWithProviders = RouterModule.forChild([
  {
    path: 'admin',
    children: [
      {
        path: 'home',
        component: HomeComponent
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
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ]
})
export class AdminModule { }
