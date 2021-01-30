import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpHeaders,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { TokenSingleton } from '../config/token-singleton';

@Injectable()
export class ApplicationHttpInterceptor implements HttpInterceptor {

  instance = TokenSingleton.getInstance();
  constructor(private authService: AuthService) {}
  
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    let authReq = httpRequest.clone({
      headers: new HttpHeaders({
        device: '1',
      }),
    });
    if (this.authService.authStatus) {
      const token = (authReq = httpRequest.clone({
        headers: new HttpHeaders({
          Authorization: `Bearer ${this.instance.getToken()}`,
          device: '1',
        }),
      }));
    }

    return next.handle(authReq);
  }
}
