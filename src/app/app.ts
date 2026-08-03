import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Root component topic: delegate page rendering to Angular's router outlet.
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {}
