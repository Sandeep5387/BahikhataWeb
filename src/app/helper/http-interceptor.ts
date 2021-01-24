import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpResponse,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ApplicationHttpInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const authReq = httpRequest.clone({
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IjkxNzkxNDk4OTciLCJuYW1laWQiOiI2MDA0MmFmZDQxMWQ5ZWMzYWE3NzU1MjYiLCJuYmYiOjE2MTE0ODIxMjYsImV4cCI6MTYxMTQ4NTcyNiwiaWF0IjoxNjExNDgyMTI2fQ.-1O3pekiWTY7u15Rgk9k9_-Hotk77w4f0O-mgXvKAYg',
        device: '1',
      }),
    });
    console.log('Intercepted HTTP call', authReq);

    return next.handle(authReq);
  }
}
