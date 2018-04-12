import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Component
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { AdminModule } from '../admin/admin.module';

// Routing
const rootRouting: ModuleWithProviders = RouterModule.forRoot([])

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AdminModule,
    SharedModule,
    BrowserAnimationsModule,
    rootRouting,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
