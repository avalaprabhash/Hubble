import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface LeaveRequest {
  id: number;
  type: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  startDate: string;
  endDate: string;
  appliedOn: string;
  days: number;
  reason: string;
}

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './leaves.html',
  styleUrls: ['./leaves.css'],
})
export class Leaves {
  selectedStatus = '';
  startDate = '';
  endDate = '';

  statuses = ['Pending', 'Approved', 'Rejected'];

  leaveRequests: LeaveRequest[] = [
    {
      id: 1,
      type: 'Annual Leave',
      status: 'Pending',
      startDate: '2026-08-10',
      endDate: '2026-08-14',
      appliedOn: '2026-07-30',
      days: 5,
      reason: 'Family vacation',
    },
    {
      id: 2,
      type: 'Sick Leave',
      status: 'Approved',
      startDate: '2026-07-20',
      endDate: '2026-07-21',
      appliedOn: '2026-07-18',
      days: 2,
      reason: 'Medical appointment',
    },
    {
      id: 3,
      type: 'Comp Off',
      status: 'Rejected',
      startDate: '2026-07-25',
      endDate: '2026-07-25',
      appliedOn: '2026-07-22',
      days: 1,
      reason: 'Project release support',
    },
  ];

  filteredLeaves: LeaveRequest[] = [...this.leaveRequests];

  filterLeaves() {
    const start = this.startDate ? new Date(this.startDate) : null;
    const end = this.endDate ? new Date(this.endDate) : null;

    this.filteredLeaves = this.leaveRequests.filter((request) => {
      const statusMatch =
        this.selectedStatus === '' || request.status === this.selectedStatus;

      const requestStart = new Date(request.startDate);
      const requestEnd = new Date(request.endDate);

      const startMatch = !start || requestEnd >= start;
      const endMatch = !end || requestStart <= end;

      return statusMatch && startMatch && endMatch;
    });
  }

  resetFilters() {
    this.selectedStatus = '';
    this.startDate = '';
    this.endDate = '';
    this.filteredLeaves = [...this.leaveRequests];
  }
}
