import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee';

describe('EmployeeService', () => {
  let service: EmployeeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(EmployeeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should normalize wrapped employee responses from the API', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0].employeeName).toBe('John Doe');
    });

    const req = httpMock.expectOne('/api/employees');
    expect(req.request.method).toBe('GET');
    req.flush({ employees: [{ employeeId: 1001, employeeName: 'John Doe', department: 'Software Services', workLocation: 'Miracle City' }] });
  });
});
