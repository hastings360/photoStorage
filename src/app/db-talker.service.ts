
import {catchError} from 'rxjs/operators';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError } from 'rxjs';

@Injectable()
export class DbTalkerService {

  constructor(private http: HttpClient) { }

  loadRecent30(): any {
    return this.http.get('/api/latest-photos').pipe(
      catchError(error => {console.log(error); return throwError(error); }));
  }

  loadSearch30(query: string): any {
    const params = new HttpParams().set('searchText', query);

    return this.http.get('/api/photo-search30', {params}).pipe(
      catchError(error => {console.log(error); return throwError(error); }));
  }

  // Submit dataObject to API
  submitPhotoToDb(objectToSend: object): Promise<any> {
    return this.http.post('/api/submit-pic', objectToSend).toPromise();
  }

  // Submit login request
  loginSubmit(loginData: object): Promise<string> {
    return this.http.post('/api/login-submit', loginData, {responseType: 'text'}).toPromise();
  }

  // Verify token and return true or false
  tokenVerify(x: string): Promise<any> {
    const data = {token: x};

    return this.http.post('/api/token-verify', data).toPromise()
      .then(results => {
        const returnObject = JSON.parse(JSON.stringify(results));
        if (returnObject.answer === 'yes') {
          console.log('Token verification Successful');
          return returnObject;
        }
        if (returnObject.answer === 'no') {
          console.log('Token verification: out of time');
          return returnObject;
        }
      })
      .catch(error => {
        console.log(error + ' No token: tokenVerify() on dbTalker');
        return false;
      });
  }

}
