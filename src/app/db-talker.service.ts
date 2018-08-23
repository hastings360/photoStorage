
import {catchError, map} from 'rxjs/operators';
import { Http,Response,RequestOptions,URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

throwError

@Injectable({
  providedIn: 'root'
})
export class DbTalkerService {

  constructor(public http:Http) { }

  loadRecent30(): any{
    return this.http.get('/api/latest-photos').pipe(
      map(res => res.json()),
      catchError(error => {console.log(error); return throwError(error)}));
  }

  loadSearch30(query:string): any{
    
    let params: URLSearchParams = new URLSearchParams();
      params.set('searchText', query);
    let requestOptions = new RequestOptions();
      requestOptions.search = params;
      
    return this.http.get('/api/photo-search30', requestOptions).pipe(
      map(res => res.json()),
      catchError(error => {console.log(error); return throwError(error)}));
  }

  //Submit dataObject to API
  submitPhotoToDb(objectToSend: object):Promise<any>{
    return this.http.post('/api/submit-pic', objectToSend).toPromise();
  }

  //Submit login request
  loginSubmit(loginData: object):Promise<Response>{
    return this.http.post('/api/login-submit', loginData).toPromise();
  }

  //Verify token and return true or false
  tokenVerify(x:string):Promise<any>{
    let data = {token:x};
        
    return this.http.post('/api/token-verify', data).toPromise()
      .then(results => {
        let body = results.json();

        if(body.answer === 'yes'){
          console.log("Token verification Successful");
          return body;
        };
        if(body.answer === 'no'){
          console.log("Token verification: out of time")
          return body;
        };
      })
      .catch(error => {
        console.log(error + " -No token: tokenVerify() on dbTalker");
        return false;
      });
  }

}