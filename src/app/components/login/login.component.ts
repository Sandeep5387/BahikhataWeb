import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Constants from 'src/app/helper/constants';
import { Alert, MessageType } from 'src/app/interfaces/alert.interface';
import { TokenSingleton } from 'src/app/config/token-singleton';
import { IUser, IUserDetails } from 'src/app/interfaces/user.interface';
import { AlertService } from 'src/app/service/alert.service';
import { AuthService } from 'src/app/service/auth.service';
import { RegisterService } from 'src/app/service/register.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  instance = TokenSingleton.getInstance();

  constructor(
    private registerService: RegisterService,
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      password: ['', [Validators.required, Validators.minLength(8)]],
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
      let user: IUserDetails = {
        username: this.lf.username.value,
        password: this.lf.password.value,
        id: '',
        createdAt: '',
        lastModified: '',
        lastLoginTime: '',
        loginDeviceType: '',
      };
      this.registerService.login(user).subscribe((data) => {
        if (data.metadata.status == 'SUCCESS' && data.error == null) {
          this.instance.setToken(data.payload.token);
          this.instance.setUserName(data.payload.userDetails.username);
          this.instance.setUserId(data.payload.userDetails.id);
          localStorage.setItem(
            Constants.activeTokenNumber_lsKey,
            data.payload.token
          );
          localStorage.setItem(
            Constants.username,
            data.payload.userDetails.username
          );
          localStorage.setItem(Constants.userId, data.payload.userDetails.id);
          this.authService.updateAuthStatus(true);
          this.router.navigate(['home']);
        } else {
          data.error.forEach((o) =>
            alerts.push({
              type: MessageType.error,
              message: o.message,
            })
          );
        }
        this.alertService.showAlert(alerts);
      });
    } else this.alertService.showAlert(alerts);
  }
}
