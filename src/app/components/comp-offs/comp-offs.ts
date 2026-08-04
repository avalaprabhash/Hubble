import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface CompOffRequest {
  id: number;
  employee: string;
  status: string;
  appliedOn: string;
  compOffDate: string;
  reason: string;
}

@Component({
  selector: 'app-comp-offs',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './comp-offs.html',
  styleUrls: ['./comp-offs.css'],
})
export class CompOffs {
  selectedStatus = '';
  fromDate = '';
  toDate = '';

  statuses = ['Pending', 'Approved', 'Rejected'];

  compOffs: CompOffRequest[] = [
    {
      id: 1,
      employee: 'Prabhash Avala',
      status: 'Pending',
      appliedOn: '2026-07-01',
      compOffDate: '2026-07-05',
      reason: 'Client site weekend support',
    },
    {
      id: 2,
      employee: 'Ananya Sharma',
      status: 'Approved',
      appliedOn: '2026-06-22',
      compOffDate: '2026-06-28',
      reason: 'Project delivery support',
    },
    {
      id: 3,
      employee: 'Rohit Mehta',
      status: 'Rejected',
      appliedOn: '2026-07-02',
      compOffDate: '2026-07-09',
      reason: 'Emergency maintenance release',
    },
  ];

  filteredCompOffs: CompOffRequest[] = [...this.compOffs];

  filterCompOffs() {
    const from = this.fromDate ? new Date(this.fromDate) : null;
    const to = this.toDate ? new Date(this.toDate) : null;

    this.filteredCompOffs = this.compOffs.filter((request) => {
      const statusMatch =
        this.selectedStatus === '' || request.status === this.selectedStatus;

      const appliedDate = new Date(request.appliedOn);
      const fromMatch = !from || appliedDate >= from;
      const toMatch = !to || appliedDate <= to;

      return statusMatch && fromMatch && toMatch;
    });
  }

  resetFilters() {
    this.selectedStatus = '';
    this.fromDate = '';
    this.toDate = '';
    this.filteredCompOffs = [...this.compOffs];
  }

  statusClass(status: string) {
    return {
      'status-pending': status === 'Pending',
      'status-approved': status === 'Approved',
      'status-rejected': status === 'Rejected',
    };
  }
}
