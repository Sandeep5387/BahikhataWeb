import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient,HttpParams} from'@angular/common/http';
import { Comments } from '../Classes/comments';

@Injectable(
    {
        providedIn:'root'
    }
)
 export  class api
{

    formData: Comments=new Comments();
    constructor(private httpClient:HttpClient){}
    // getComments():Observable<any>
    // {
    //     return this.httpClient.get("https://jsonplaceholder.typicode.com/posts/1/comments")
        
    // }

    // getCommentByParameter():Observable<any>
    // {
    //     let param1= new HttpParams().set('userId','1')

    //     return this.httpClient.get("https://jsonplaceholder.typicode.com/posts",{params:param1})

    // }

    addTransaction(formData:Comments):Observable<any>
    {
        return this.httpClient.post('http://localhost:4200/url',formData)
    }
}