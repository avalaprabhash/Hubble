import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
// Data service topic: fetch employees from the API and fall back to mock data when needed.
export class EmployeeService {
  private readonly apiUrl = 'https://hubble-tz6n.onrender.com/employees';
  private readonly fallbackUrl = '/mock-data/employees.json';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    // RxJS topic: recover from a failed primary request by switching to fallback data.
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      catchError(() => this.getFallbackEmployees())
    );
  }

  // The of() operator is an RxJS creation operator. 
  // It creates an Observable that emits the value(s) you provide and then immediately completes.

  private getFallbackEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.fallbackUrl).pipe(
      catchError(() => of([]))
    );
  }
}
