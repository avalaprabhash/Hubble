import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class Navbar {

  // Centralize sidebar items so the template only renders the configured links.
  navLinks = [
    { label: 'Appraisal Reviews',  path: '/appraisal-reviews',  icon: '📋' },
    { label: 'Calendar',           path: '/calendar',           icon: '📅' },
    { label: 'Certifications',     path: '/certifications',     icon: '🎓' },
    { label: 'Comp Offs',          path: '/compoff',            icon: '🏖️' },
    { label: 'Dashboard',          path: '/dashboard',          icon: '🏠' },
    { label: 'Employee Search',    path: '/employee-search',    icon: '🔍' },
    { label: 'Hierarchy',          path: '/hierarchy',          icon: '🏢' },
    { label: 'Leaves',             path: '/leaves',             icon: '🍃' },
    { label: 'mBadges',            path: '/badges',             icon: '🏅' },
    { label: 'Payroll',            path: '/payroll',            icon: '💰' },
    { label: 'Timesheets',         path: '/timesheets',         icon: '⏱️' }
  ];

}
