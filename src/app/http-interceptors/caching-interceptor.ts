import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { CacheMapService } from '../services/cache-map';

const CACHABLE_URL = 'wp-json/wp/v2/';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
    constructor(private cache: CacheMapService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
      if (!this.isRequestCachable(req)) {
         console.log('!this.isRequestCachable(req): ');
         return next.handle(req);
      }
      console.log('req:', req);
      const cachedResponse = this.cache.get(req);
      if (cachedResponse !== null) {
         console.log('Getting cached data!');
         return of(cachedResponse);
      }
      console.log('req = ', req);
      console.log('this.cache = ', this.cache);
      return next.handle(req).pipe(
         tap(event => {
            if (event instanceof HttpResponse) {
               this.cache.put(req, event);
            }
         })
      );
    }
    private isRequestCachable(req: HttpRequest<any>) {
      return (req.method === 'GET') && (req.url.indexOf(CACHABLE_URL) > -1);
    }
}
