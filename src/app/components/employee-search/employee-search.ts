import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employee-search',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './employee-search.html',
  styleUrls: ['./employee-search.css'],
})
export class EmployeeSearch implements OnInit {
  // Reuse the known office list for the location filter dropdown.
  workLocations = [
    'Atlanta',
    'Bentonville',
    'HQ (Novi)',
    'India - Other',
    'LB Colony',
    'Miracle City',
    'Miracle Heights',
    'Miracle Valley',
    'US - Other',
    'Work From Home'
  ];

  currentPage = 1;
  pageSize = 8;

  emp = '';
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  dept = '';
  loc = '';
  errorMessage = '';

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  get paginatedEmployees(): Employee[] {
    // Slice the filtered list so the template only renders the active page.
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEmployees.slice(start, end);
  }

  filteredResult() {
    const search = this.emp.toLowerCase().trim();

    this.filteredEmployees = this.employees.filter((employee) => {
      // Match the free-text search against the most useful employee fields.
      const matchesSearch =
        search === '' ||
        employee.employeeId.toString().includes(search) ||
        employee.employeeName.toLowerCase().includes(search) ||
        employee.department.toLowerCase().includes(search) ||
        employee.workLocation.toLowerCase().includes(search);

      const matchesDepartment =
        this.dept === '' ||
        employee.department.toLowerCase() === this.dept.toLowerCase();

      const matchesLocation =
        this.loc === '' ||
        employee.workLocation.toLowerCase() === this.loc.toLowerCase();

      return matchesDepartment && matchesLocation && matchesSearch;
    });

    this.currentPage = 1;
  }

  loadEmployees() {
    this.errorMessage = '';

    this.employeeService.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;

        if (data.length === 0) {
          this.errorMessage = 'No employee data is available right now.';
        }
      },
      error: () => {
        this.employees = [];
        this.filteredEmployees = [];
        this.errorMessage = 'Unable to load employees from the API or fallback data.';
      }
    });
  }
}
