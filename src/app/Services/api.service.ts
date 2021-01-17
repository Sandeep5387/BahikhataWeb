import {Injectable} from '@angular/core';
import {Observable} from 'rxjs'
import {HttpClient,HttpParams} from'@angular/common/http';
import { Comments } from '../Classes/comments';
import { HttpClientService } from '../helper/services/http-client.service';

@Injectable(
    {
        providedIn:'root'
    }
)
 export  class api
{
    
    formData: Comments=new Comments();
    constructor(private httpClient:HttpClientService){}
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
        //return this.httpClient.post("192.168.43.202/44307",)
        return new Observable<any>();
    }

    

}