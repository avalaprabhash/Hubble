import { Injectable } from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';

import { Auth } from '../services/auth';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private auth: Auth) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this.auth.getToken();
    const authReq = token
      ? req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`,
          },
        })
      : req;
    
    // next.handle(req) forwards the HTTP request to the next interceptor in the chain.
    //If there are no more interceptors, Angular sends the request to the backend server.
    //It returns an Observable that emits the HTTP events(response).
    return next.handle(authReq).pipe(
      
      //pipe() is used to combine one or more RxJS operators to transform, filter,
      //or perform side effects on the data emitted by an Observable before it reaches the subscriber.
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.auth.logout();
        }

        return throwError(() => error);
      })
    );
  }
}
