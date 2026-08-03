import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';

/**
 * Interceptor topic: inspect every HTTP request/response pair in one central place.
 * The interceptor logs request metadata, response timing, and failures for debugging.
 *
 * NOTE: This interceptor is registered globally in {@link appConfig}. It is
 * intended for development / debugging use. Remove or adapt the console calls
 * as appropriate for production builds.
 */
@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const started = Date.now();

    // Clone the request to ensure immutability and allow for safe logging.
    const requestClone = req.clone();

    console.log('[HTTP] Request', {
      method: requestClone.method,
      url: requestClone.urlWithParams,
      headers: requestClone.headers,
      body: requestClone.body,
    });

    return next.handle(requestClone).pipe(
      tap({
        next: (event: HttpEvent<unknown>) => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            console.log('[HTTP] Response', {
              method: requestClone.method,
              url: requestClone.urlWithParams,
              status: event.status,
              elapsed: `${elapsed} ms`,
              body: event.body,
            });
          }
        },
        error: (error: HttpErrorResponse) => {
          const elapsed = Date.now() - started;
          console.error('[HTTP] Error', {
            method: requestClone.method,
            url: requestClone.urlWithParams,
            status: error.status,
            elapsed: `${elapsed} ms`,
            message: error.message,
            error,
          });
        },
      }),
    );
  }
}
