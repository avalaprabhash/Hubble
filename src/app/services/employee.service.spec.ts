import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { EmployeeService } from './employee.service';

// HTTP testing topic: simulate API success, fallback loading, and total failure paths.
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

  it('should return employees from the API when the request succeeds', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0].employeeName).toBe('John Doe');
    });

    const req = httpMock.expectOne('/api/employees');
    expect(req.request.method).toBe('GET');
    req.flush([
      {
        employeeId: 1001,
        employeeName: 'John Doe',
        department: 'Software Services',
        workLocation: 'Miracle City'
      }
    ]);
  });

  it('should load fallback employees when the API fails', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees.length).toBe(1);
      expect(employees[0].employeeId).toBe(2001);
    });

    const apiReq = httpMock.expectOne('/api/employees');
    apiReq.flush('Server error', { status: 500, statusText: 'Server Error' });

    const fallbackReq = httpMock.expectOne('/mock-data/employees.json');
    expect(fallbackReq.request.method).toBe('GET');
    fallbackReq.flush([
      {
        employeeId: 2001,
        employeeName: 'Fallback Employee',
        department: 'Support',
        workLocation: 'Work From Home'
      }
    ]);
  });

  it('should return an empty list when both API and fallback fail', () => {
    service.getEmployees().subscribe((employees) => {
      expect(employees).toEqual([]);
    });

    const apiReq = httpMock.expectOne('/api/employees');
    apiReq.flush('Server error', { status: 500, statusText: 'Server Error' });

    const fallbackReq = httpMock.expectOne('/mock-data/employees.json');
    fallbackReq.flush('Missing file', { status: 404, statusText: 'Not Found' });
  });
});
