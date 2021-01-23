import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientService } from '../helper/services/http-client.service';
import { Payload, Response, Request } from '../interfaces/payload.interface';
import { IUser, IUserDetails } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClientService: HttpClientService) {}

  register(user: IUserDetails): Observable<Response<IUser>>{
    let rootObject: Request<IUserDetails> = { payload: user };
    return this.httpClientService.post('Auth/register', rootObject);
  }

  login(user: IUserDetails): Observable<Response<IUser>>{
    let rootObject: Request<IUserDetails> = { payload: user };
    return this.httpClientService.post('Auth/login', rootObject);
  }
}
