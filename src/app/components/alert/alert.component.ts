import { coerceStringArray } from '@angular/cdk/coercion';
import { Component, OnInit } from '@angular/core';
import { Alert ,MessageType} from 'src/app/interfaces/alert.interface';
import { AlertService } from 'src/app/service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  errorClass:string='error';
  items!: Alert[];

  constructor(private alertService:AlertService) { 
  }
  ngOnInit(): void {
    this.showAlert();
  }

  showAlert()
  {
    this.alertService.getAlerts().subscribe(data=>{
      this.items=data;
      console.log(data);
     })
  }
}
