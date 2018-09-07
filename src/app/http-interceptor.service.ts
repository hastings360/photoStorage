import { Injectable } from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler} from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { CacheRequestService } from './cache-request.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

  constructor(public cache: CacheRequestService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    this.cache.get(req);

    return next.handle(req).pipe(
      tap(event => {
        console.log('hell' + event);
        if (event instanceof HttpResponse) {
          this.cache.put(req, event);
        }
      }, error => console.log(error))
    );
  }
}
