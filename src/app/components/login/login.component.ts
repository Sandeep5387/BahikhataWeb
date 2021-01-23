import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Constants from 'src/app/helper/constants';
import { Alert, MessageType } from 'src/app/interfaces/alert.interface';
import { TokenSingleTone } from 'src/app/interfaces/token-single-tone';
import { IUser, IUserDetails } from 'src/app/interfaces/user.interface';
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
      username: ['7987086837', [Validators.required, Validators.minLength(10)]],
      password: ['5678@Kush', [Validators.required, Validators.minLength(8)]],
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
        id:"",
        createdAt:"",
        lastModified: "",
        lastLoginTime:"",
        loginDeviceType: "",
      };
      this.registerService.login(user).subscribe((data) => {
        if ((data.metadata.status == 'SUCCESS' && data.error ==null)) {
          TokenSingleTone.getInstance().setToken(data.payload.token);
          TokenSingleTone.getInstance().setUserName(data.payload.userDetails.username);
          TokenSingleTone.getInstance().setUserId(data.payload.userDetails.id);
          localStorage.setItem(Constants.activeTokenNumber_lsKey, data.payload.token);
          localStorage.setItem(Constants.username, data.payload.userDetails.username);
          localStorage.setItem(Constants.userId, data.payload.userDetails.id);
          alerts.push({
            type: MessageType.success,
            message: "User created successfully.",
          });
        }
        else{
          data.error.forEach(o=>alerts.push({
            type: MessageType.error,
            message: o.message,
          }));
        }
        this.alertService.showAlert(alerts);
      });
    } else this.alertService.showAlert(alerts);
  }

}
