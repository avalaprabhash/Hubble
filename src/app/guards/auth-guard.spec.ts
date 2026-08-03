import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { authGuard } from './auth-guard';
import { Auth } from '../services/auth';

// Guard test topic: execute the function guard inside Angular's injection context.
describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  let authSpy: jasmine.SpyObj<Auth>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    authSpy = jasmine.createSpyObj<Auth>('Auth', ['isAuth']);
    routerSpy = jasmine.createSpyObj<Router>('Router', ['createUrlTree']);
    routerSpy.createUrlTree.and.returnValue({} as any);

    TestBed.configureTestingModule({
      providers: [
        { provide: Auth, useValue: authSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation when a valid JWT is present', () => {
    authSpy.isAuth.and.returnValue(true);

    expect(executeGuard({} as any, {} as any)).toBeTrue();
  });

  it('should redirect to login when the JWT is missing or expired', () => {
    authSpy.isAuth.and.returnValue(false);

    executeGuard({} as any, {} as any);

    expect(routerSpy.createUrlTree).toHaveBeenCalledWith(['/login']);
  });
});
