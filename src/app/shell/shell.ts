import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from '../header/header';
import { Navbar } from '../navbar/navbar';

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [CommonModule, Header, Navbar, RouterOutlet],
  templateUrl: './shell.html',
  styleUrl: './shell.css',
})
export class Shell {
  protected showNavbar = true;

  protected toggleNavbar() {
    this.showNavbar = !this.showNavbar;
  }
}
