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
import { api } from './Services/api.service';
import {HttpClientService} from './helper/services/http-client.service'
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
//import { form } from 'rxjs';

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
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularMaterialModule,
    ReactiveFormsModule
    ],
  providers: [ { provide: HTTP_INTERCEPTORS, useClass: ApplicationHttpInterceptor, multi: true },api,MatDatepickerModule,HttpClientService],
bootstrap:[AppComponent]
})
export class AppModule {}
