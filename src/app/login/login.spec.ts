import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';

import { Login } from './login';
import { Auth } from '../services/auth';

// Component test topic: instantiate the login screen with router support for navigation calls.
describe('Login', () => {
  let component: Login;
  let fixture: ComponentFixture<Login>;
  let authSpy: jasmine.SpyObj<Auth>;
  let router: Router;

  beforeEach(async () => {
    authSpy = jasmine.createSpyObj<Auth>('Auth', ['login', 'logout']);
    authSpy.login.and.returnValue(of(true));

    await TestBed.configureTestingModule({
      imports: [Login],
      providers: [
        provideRouter([]),
        { provide: Auth, useValue: authSpy },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(Login);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should mark fields as touched instead of submitting an invalid form', () => {
    component.login();

    expect(authSpy.login).not.toHaveBeenCalled();
    expect(component.loginForm.get('username')?.touched).toBeTrue();
    expect(component.loginForm.get('password')?.touched).toBeTrue();
  });

  it('should navigate to the dashboard when login succeeds', () => {
    spyOn(router, 'navigate');
    component.loginForm.setValue({ username: 'admin', password: 'admin123' });

    component.login();

    expect(authSpy.login).toHaveBeenCalledWith('admin', 'admin123');
    expect(router.navigate).toHaveBeenCalledWith(['/dashboard']);
  });

  it('should show an error message when login fails', () => {
    authSpy.login.and.returnValue(of(false));
    component.loginForm.setValue({ username: 'admin', password: 'bad-pass' });

    component.login();

    expect(component.errorMessage).toBe('Invalid Credentials');
  });
});
