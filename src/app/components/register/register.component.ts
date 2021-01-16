import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IUser } from 'src/app/interfaces/user.interface';
import { RegisterService } from 'src/app/service/register.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  loginForm!: FormGroup;

  constructor( private registerService:RegisterService, private formBuilder:FormBuilder,public snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      "username": ['', [Validators.required, Validators.minLength(4)]],
      "password": ['', [Validators.required, Validators.minLength(8), Validators.max(12)]],
      "confirmpassword": ['', [Validators.required, Validators.minLength(8), Validators.max(12)]]
    });
  }

  get lf() { return this.loginForm.controls; }

  submit()
  {
    let user:IUser={username: this.lf.username.value,password:this.lf.password.value}
    this.registerService.register(user).subscribe(
      data=>
      {
        console.log(data)
      });

    // this.openSnackBar("Hello Message","Register");

  }

  openSnackBar(message: string, panelClass: string) {
    this.snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      panelClass: panelClass,
      duration: 10000
    });
}
}
