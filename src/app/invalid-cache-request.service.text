import { Injectable } from '@angular/core';
import { HttpResponse, HttpRequest } from '@angular/common/http';
// import { mapToExpression } from '@angular/compiler/src/render3/view/util';

const maxAge = 100000;

@Injectable()
export class CacheRequestService {

  private cache = JSON.parse(localStorage.getItem('cachedItems'));

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    let cached;
    this.cache.forEach((item) => {
      if ( item.url === req.url) {
        cached = item;
      }
    });

    if (!cached) {
      console.log('not-found');
      return undefined;
    }else {
      console.log('found');
      const isExpired = cached.lastRead < (Date.now() - maxAge);
      const expired = isExpired ? 'expired ' : '';
      cached.response.text = 'client cached response';
      return cached.response;
    }
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.push(entry);
    localStorage.setItem('cachedItems', JSON.stringify(this.cache));

    const expired = Date.now() - maxAge;
    this.cache.forEach(item => {
      if (item.lastRead < expired) {
        this.cache.splice( item, 1 );
      }
    });
  }
}
