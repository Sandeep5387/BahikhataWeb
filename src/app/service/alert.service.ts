import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alert, MessageType } from '../interfaces/alert.interface';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertSubject: BehaviorSubject<Alert[]>;
  private alert: Observable<Alert[]>;
  
  constructor() { 
    this.alertSubject = new BehaviorSubject<Alert[]>([]);
    this.alert = this.alertSubject.asObservable();
  }

  public getAlerts(): Observable<Alert[]> {
    return  this.alert;
  }

  public showAlert(alerts:Alert[])
  {
    this.alertSubject.next(alerts);
  }

  public clertAlerts()
  {
    this.alertSubject.next([]);
  }
}
