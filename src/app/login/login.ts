import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '../services/auth';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login {

  loginForm = new FormGroup({
    username: new FormControl('',[Validators.required, Validators.minLength(3)]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)])
  });
  
  errorMessage = "";
  constructor(private auth: Auth, private router : Router){}
  
  login(){
    const username = this.loginForm.value.username!;
    const password = this.loginForm.value.password!;
    if(this.auth.login(username,password)){
      this.router.navigate(['/dashboard']);
    }
    else{
      this.errorMessage = "Invalid Credentials";
    }
  }
  logout(){
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
