import { Routes } from '@angular/router';
import { AppraisalReviews } from './components/appraisal-reviews/appraisal-reviews';
import { Calendar } from './components/calendar/calendar';
import { Certifications } from './components/certifications/certifications';
import { CompOffs } from './components/comp-offs/comp-offs';
import { Dashboard } from './components/dashboard/dashboard';
import { EmployeeSearch } from './components/employee-search/employee-search';
import { Hierarchy } from './components/hierarchy/hierarchy';
import { Leaves } from './components/leaves/leaves';
import { Mbadges } from './components/mbadges/mbadges';
import { Payments } from './components/payments/payments';
import { Payroll } from './components/payroll/payroll';
import { Timesheets } from './components/timesheets/timesheets';
import { Login } from './login/login';
import { authGuard } from './guards/auth-guard';
import { Shell } from './shell/shell';

export const routes: Routes = [
  { path: 'login', component: Login },
  {
    path: '',
    component: Shell,
    canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: Dashboard },
      { path: 'calendar', component: Calendar },
      { path: 'payments', component: Payments },
      { path: 'payroll', component: Payroll },
      { path: 'leaves', component: Leaves },
      { path: 'hierarchy', component: Hierarchy },
      { path: 'employee-search', component: EmployeeSearch },
      { path: 'appraisal-reviews', component: AppraisalReviews },
      { path: 'timesheets', component: Timesheets },
      { path: 'badges', component: Mbadges },
      { path: 'certifications', component: Certifications },
      { path: 'compoff', component: CompOffs }
    ]
  },
  { path: '**', redirectTo: 'login' }
];
