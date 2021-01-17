import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationHttpInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = httpRequest.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjkxNzkxNDk4OTciLCJuYW1laWQiOiI2MDA0MmFmZDQxMWQ5ZWMzYWE3NzU1MjYiLCJuYmYiOjE2MTA4ODU5MTEsImV4cCI6MTYxMDg4OTUxMSwiaWF0IjoxNjEwODg1OTExfQ.fj2jmFw2rdjwPaKu-vzDVvav4r3TiFwXhJyBEjUyBCg',
          'device':'1'
        })
      });
      console.log('Intercepted HTTP call', authReq);
      return next.handle(authReq);
  }
}