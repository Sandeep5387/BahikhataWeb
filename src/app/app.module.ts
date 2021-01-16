import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { RegisterComponent } from './../app/components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SnackbarComponent } from './components/snackbar/snackbar.component';
import { ApplicationHttpInterceptor } from './helper/http-interceptor';

@NgModule({
  declarations: 
  [AppComponent, 
    RegisterComponent,
    LoginComponent,
    SnackbarComponent]
    ,
  imports: 
  [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    AngularMaterialModule,
    HttpClientModule
    ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ApplicationHttpInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
