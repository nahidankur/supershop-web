import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Constants } from '../constants/constant';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem(Constants.AUTH_STORE_KEY);
    const parsed_token = JSON.parse(token || '{}');
    if (parsed_token) {
      // Clone the request and add the authorization header
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${parsed_token.access_token}`
        }
      });
    }
    return next.handle(request);
  }
}
