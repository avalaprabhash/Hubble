import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withHashLocation } from '@angular/router';

import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

// Provider configuration topic: register routing, HTTP, and global app services in one place.
export const appConfig: ApplicationConfig = {
  providers: [
    // Surface uncaught browser errors through Angular's global handlers.
    provideBrowserGlobalErrorListeners(),
    // Register the application routes for standalone bootstrapping.
    provideRouter(routes, withHashLocation()),
    // Make HttpClient available app-wide and include DI-provided interceptors.
    provideHttpClient(withInterceptorsFromDi()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoggingInterceptor,
      multi: true,
    },
  ],
};
