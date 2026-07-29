import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.css']
})
export class Calendar {

  dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  days: any[] = [];
  activeMonth = new Date();
  selectedDate = new Date();
  
  constructor() {
    this.buildCalendar();
  }

  get monthLabel() {
    return this.activeMonth.toLocaleString('default', {
      month: 'long',
      year: 'numeric'
    });
  }

  buildCalendar() {

    const start = new Date(this.activeMonth.getFullYear(),this.activeMonth.getMonth(),1);

    start.setDate(start.getDate() - start.getDay());

    this.days = [];

    for (let i = 0; i < 42; i++) {

      const current = new Date(start);
      current.setDate(start.getDate() + i);

      this.days.push({
        date: current,
        label: current.getDate(),
        otherMonth: current.getMonth() !== this.activeMonth.getMonth(),
        today: this.isSameDay(current, new Date()),
        selected: this.isSameDay(current, this.selectedDate)
      });
    }
  }

  previousMonth() {
    this.activeMonth.setMonth(this.activeMonth.getMonth() - 1);
    this.buildCalendar();
  }

  nextMonth() {
    this.activeMonth.setMonth(this.activeMonth.getMonth() + 1);
    this.buildCalendar();
  }

  resetToToday() {
    this.activeMonth = new Date();
    this.selectedDate = new Date();
    this.buildCalendar();
  }

  isSameDay(a: Date, b: Date) {
    return (
      a.getDate() === b.getDate() &&
      a.getMonth() === b.getMonth() &&
      a.getFullYear() === b.getFullYear()
    );
  }
}