import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { Employee, EmployeeService } from '../../employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-search',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './employee-search.html',
  styleUrls: ['./employee-search.css'],
})
export class EmployeeSearch implements OnInit{
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


  emp = "";
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  dept = "";
  loc = "";

  constructor(private empServ : EmployeeService){}

  ngOnInit():void{
    this.loadEmployees();
  }
  get paginatedEmployees(): Employee[] {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    return this.filteredEmployees.slice(start, end);
  }

  filteredResult() {

    const search = this.emp.toLowerCase().trim();

    this.filteredEmployees = this.employees.filter(emp =>{
         const matchesSearch =
      search === "" ||
      emp.employeeId.toString().includes(search) ||
      emp.employeeName.toLowerCase().includes(search) ||
      emp.department.toLowerCase().includes(search) ||
      emp.workLocation.toLowerCase().includes(search);
        
      const matchesDepartment =
      this.dept === "" ||
      emp.department.toLowerCase() === this.dept.toLowerCase();
          
      const matchesLocation =
      this.loc === "" ||
      emp.workLocation.toLowerCase() === this.loc.toLowerCase();

      return matchesDepartment && matchesLocation && matchesSearch;
  });

  }
  loadEmployees(){
    this.empServ.getEmployees().subscribe({
      next: (data) => {
        this.employees = data;
        this.filteredEmployees = data;
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}
