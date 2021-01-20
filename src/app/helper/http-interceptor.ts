import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationHttpInterceptor implements HttpInterceptor {
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authReq = httpRequest.clone({
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjkxNzkxNDk4OTciLCJuYW1laWQiOiI2MDA0MmFmZDQxMWQ5ZWMzYWE3NzU1MjYiLCJuYmYiOjE2MTExNzAwNTUsImV4cCI6MTYxMTE3MzY1NSwiaWF0IjoxNjExMTcwMDU1fQ.iui5KbTXGRpU6JyXsqkgAs9sz39aKnCbpAc1MVdWXaA',
          'device':'1'
          
        })
      });
      console.log('Intercepted HTTP call', authReq);
      return next.handle(authReq);
  }
}