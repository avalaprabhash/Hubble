import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Auth } from './auth';

// Service test topic: resolve the auth service from Angular's dependency injector.
describe('Auth', () => {
  let service: Auth;
  let httpMock: HttpTestingController;

  const createToken = (expOffsetSeconds: number) => {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const payload = btoa(
      JSON.stringify({ sub: 'admin', exp: Math.floor(Date.now() / 1000) + expOffsetSeconds })
    );
    return `${header}.${payload}.signature`;
  };

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(Auth);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store the JWT token after a successful login response', () => {
    service.login('admin', 'admin123').subscribe((result) => {
      expect(result).toBeTrue();
      expect(service.getToken()).toBe('server-token');
    });

    const req = httpMock.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush({ token: 'server-token' });
  });

  it('should fall back to a demo JWT when the login API is unavailable', () => {
    service.login('admin', 'admin123').subscribe((result) => {
      expect(result).toBeTrue();
      expect(service.getToken()).toContain('.');
      expect(service.isAuth()).toBeTrue();
    });

    const req = httpMock.expectOne('/api/auth/login');
    req.flush('offline', { status: 500, statusText: 'Server Error' });
  });

  it('should reject invalid credentials when the API login fails', () => {
    service.login('wrong', 'credentials').subscribe((result) => {
      expect(result).toBeFalse();
      expect(service.getToken()).toBeNull();
    });

    const req = httpMock.expectOne('/api/auth/login');
    req.flush('unauthorized', { status: 401, statusText: 'Unauthorized' });
  });

  it('should treat expired JWTs as unauthenticated', () => {
    localStorage.setItem('token', createToken(-60));

    expect(service.isAuth()).toBeFalse();
  });
});
