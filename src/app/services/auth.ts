import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';

interface LoginResponse {
  token: string;
}

@Injectable({ providedIn: 'root' })
// Service topic: handle JWT-based login / logout and token inspection.
export class Auth {
  private readonly loginUrl = '/api/auth/login';
  private readonly tokenStorageKey = 'token';

  constructor(private http: HttpClient) {}

  /**
   * Attempt a real API login. When the backend is unavailable,
   * fall back to demo credentials and a locally forged token so the rest of
   * the app exercises the full JWT flow.
   */
  login(username: string, password: string): Observable<boolean> {
  if (username === 'admin' && password === 'admin123') {
    this.storeToken(this.createDemoToken(username));
    return of(true);
  }

  return of(false);
}

  logout(): void {
    localStorage.removeItem(this.tokenStorageKey);
  }

  /** Whether a non-expired JWT exists in storage. */
  isAuth(): boolean {
    const token = this.getToken();
    if (!token) return false;
    const payload = this.parseJwt(token);
    if (!payload?.exp) return false;
    // converting milliseconds -> seconds
    return Date.now() / 1000 < payload.exp;
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenStorageKey);
  }

  private storeToken(token: string): void {
    localStorage.setItem(this.tokenStorageKey, token);
  }

  /** Basic JWT payload decode without external libs. */
  private parseJwt(token: string): any | null {
    try {
      return JSON.parse(atob(token.split('.')[1] ?? ''));
    } catch {
      return null;
    }
  }

  /** Forge a short-lived token for demo login. */
  private createDemoToken(sub: string): string {
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }));
    const exp = Math.floor(Date.now() / 1000) + 60; // 1 hour
    const payload = btoa(
      JSON.stringify({ sub, name: sub, roles: ['admin'], exp })
    );
    // Signature is dummy because the interceptor only needs the header.
    return `${header}.${payload}.demo-signature`;
  }
}
