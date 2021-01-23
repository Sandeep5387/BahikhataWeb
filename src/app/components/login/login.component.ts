import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Alert, MessageType } from 'src/app/interfaces/alert.interface';
import { IUser } from 'src/app/interfaces/user.interface';
import { AlertService } from 'src/app/service/alert.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmpassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  get lf() {
    return this.loginForm.controls;
  }

  submit() {
    this.alertService.clertAlerts();
    let alerts: Alert[] = [];
    console.log(this.lf['username']);
    if (this.lf['username'].invalid) {
      alerts.push({
        type: MessageType.error,
        message: 'Please enter Mobile Number',
      });
    }

    if (this.lf['password'].invalid) {
      alerts.push({
        type: MessageType.error,
        message: 'Please enter Password',
      });
    }


    if (alerts.length == 0) {
      let user: IUser = {
        username: this.lf.username.value,
        password: this.lf.password.value,
      };
      // this.registerService.register(user).subscribe((data) => {
      //   if ((data.metadata.status = 'Success')) {
      //   }
      //   console.log(data);
      // });
    } else this.alertService.showAlert(alerts);
  }

}
