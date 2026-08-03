import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Dashboard topic: expose static widget data for the home screen sections.
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
})
export class Dashboard {

  // Sample dashboard widgets are currently backed by static data.
  timezones = [
    { location: 'India (IST)', time: '10:30 AM' },
    { location: 'New York (EST)', time: '01:00 AM' },
    { location: 'London (GMT)', time: '06:00 AM' },
    
  ];

  helpdesk = [
    { issue: 'Laptop Request', status: 'Open' },
    { issue: 'VPN Access', status: 'In Progress' },
    { issue: 'Printer Issue', status: 'Closed' },
    { issue: 'Software Installation', status: 'Open' }
  ];

  events = [
    { date: 'Jul 31', event: 'Angular Workshop' },
    { date: 'Aug 02', event: 'Team Meeting' },
    { date: 'Aug 05', event: 'AI Training' },
    { date: 'Aug 10', event: 'Hackathon' }
  ];

  // List topic: these artifact names are rendered with `*ngFor` in the template.
  artifacts = [
    { file: 'Angular Guide.pdf' },
    { file: 'Employee Handbook.pdf' },
    { file: 'Project Architecture.pptx' },
  
  ];

  // Card topic: gallery labels are mapped into simple visual tiles.
  gallery = [
    'Annual Meet',
    'Hackathon',
    'Training Session',
    'Team Outing'
  ];

}
