import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private readonly apiUrl = '/api/employees';
  private readonly fallbackUrl = '/mock-data/employees.json';

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.apiUrl).pipe(
      catchError(() => this.getFallbackEmployees())
    );
  }

  private getFallbackEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.fallbackUrl).pipe(
      catchError(() => of([]))
    );
  }
}
