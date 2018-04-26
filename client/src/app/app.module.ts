import { BrowserModule } from '@angular/platform-browser';
import { ModuleWithProviders, NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Component
import { AppComponent } from './app.component';

// Modules
import { SharedModule } from './shared/shared.module';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { ResultsModule } from './results/results.module';

import {
  ApiService,
  JwtService,
  UserService,
  HttpTokenInterceptor,
  AuthGuard
} from './shared';

// Routing
const rootRouting: ModuleWithProviders = RouterModule.forRoot([])

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AuthModule,
    BrowserAnimationsModule,
    AdminModule,
    ResultsModule,
    rootRouting,
    SharedModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true},
    ApiService,
    AuthGuard,
    JwtService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
