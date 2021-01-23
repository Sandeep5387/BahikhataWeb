import { Injectable } from '@angular/core';
import { HttpClientService } from '../helper/services/http-client.service';
import { Payload, RootObject } from '../interfaces/payload.interface';
import { IUser } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private httpClientService: HttpClientService) {}

  register(user: IUser) {
    let rootObject: RootObject = { payload: user };
    return this.httpClientService.post('Auth/register', rootObject);
  }
}
