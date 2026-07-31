import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Auth } from '../services/auth';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrls: ['./header.css'],
})
export class Header {
  img = "https://hubble.miraclesoft.com/assets/miracle-logo-dark.png";
  
  @Output() navbarToggle = new EventEmitter<void>();

  constructor(private auth: Auth, private router: Router) {}

  toggleNavBar(){
    // Bubble the toggle event up to the shell so it owns layout state.
    this.navbarToggle.emit();
  }

  logout() {
    this.auth.logout();
    // Return to the login screen immediately after clearing the session.
    this.router.navigate(['/login']);
  }
}
