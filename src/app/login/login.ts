import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { finalize } from 'rxjs';

// Reactive forms topic: capture credentials, validate input, and route on successful login.
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  // Reactive form validation keeps invalid credentials from being submitted empty.
  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  
  errorMessage = "";
  isSubmitting = false;
  constructor(private auth: Auth, private router : Router){}
  
  login(){
    if (this.loginForm.invalid || this.isSubmitting) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;
    this.errorMessage = "";
    this.isSubmitting = true;

    // Delegate the credential check to the auth service before routing.
    this.auth
      .login(username, password)
      .pipe(finalize(() => (this.isSubmitting = false)))
      .subscribe((isAuthenticated) => {
        if (isAuthenticated) {
          this.router.navigate(['/dashboard']);
          return;
        }

        this.errorMessage = "Invalid Credentials";
      });
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
