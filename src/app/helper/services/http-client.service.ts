import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/internal/operators/catchError';
import { environment } from 'src/environments/environment';
import {
  ResponseModel,
  RootObject,
} from 'src/app/interfaces/payload.interface';
import Constants from '../constants';

@Injectable({
  providedIn: 'root',
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  get(resource: string, headersList?: any): Observable<any> {
    return this.httpClient.get(`${environment.apiurl}/${resource}`).pipe(
      map((response: any) => {
        console.log('response');
        console.log(response);
        return this.constructResponse(response);
      }),
      catchError((error: Response) => {
        console.log('error');
        return this.sendInvalidResponse(null, error.status, error.statusText);
      })
    );
  }

  post(resource: string, data: RootObject): Observable<any> {
    return this.httpClient.post(`${environment.apiurl}/${resource}`, data).pipe(
      map((response: any) => {
        console.log('response');
        console.log(response);
        if (response == null) {
          console.log('Resoponse is null');
        }
        return this.constructResponse(response);
      }),
      catchError((error: Response) => {
        console.log('error');
        return this.sendInvalidResponse(null, error.status, error.statusText);
      })
    );
  }

  constructResponse(response: any): any {
    if (response != null) {
      let responseModel: ResponseModel = {
        error: response.error ? response.error : null,
        payload: response.payload ? response.payload : null,
        metadata: response.metadata ? response.metadata : '',
      };
      return responseModel;
    }
  }

  sendInvalidResponse(
    result: any,
    statusCode: number,
    statusMessage: string
  ): Observable<ResponseModel> {
    let errormessage: string;
    // write switch case to render correct and proper response
    switch (statusCode) {
      case 400:
        errormessage = Constants.badRequestExceptionMessage;
        break;
      case 401:
        errormessage = Constants.unauthorizedExceptionMessage;
        break;
      case 403:
        errormessage = Constants.forbiddenExceptionMessage;
        break;
      case 404:
        errormessage = Constants.notFoundExceptionMessage;
        break;
      case 412:
        errormessage = Constants.preconditionFailedExceptionMessage;
        break;
      case 500:
        errormessage = Constants.internalServerExceptionMessage;
        break;
      default:
        errormessage = Constants.defaultExceptionMessage;
        break;
    }
    let responseModel: ResponseModel = {
      error: [{ code: statusCode.toString(), message: errormessage }],
      payload: null,
      metadata: { module: '', status: '' },
    };
    return of(responseModel);
  }
}
