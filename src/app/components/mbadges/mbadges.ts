import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface BadgeItem {
  id: number;
  title: string;
  author: string;
  status: 'Assigned' | 'Available' | 'Attempted' | 'Certified';
  questions: number;
  duration: string;
  expiresOn: string;
}

// Component topic: keep the mBadges route connected until page content is built.
@Component({
  selector: 'app-mbadges',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './mbadges.html',
  styleUrls: ['./mbadges.css'],
})
// Placeholder component for the mBadges view.
export class Mbadges {
  searchText = '';
  selectedTab: BadgeItem['status'] = 'Assigned';

  badges: BadgeItem[] = [
    {
      id: 1,
      title: 'Security Awareness Training Assessment - Annual, 2026',
      author: 'vvarupula',
      status: 'Certified',
      questions: 25,
      duration: '30 Minutes',
      expiresOn: 'Apr 7, 2027',
    },
    {
      id: 2,
      title: 'Cloud Governance Essentials',
      author: 'rpatil',
      status: 'Assigned',
      questions: 20,
      duration: '45 Minutes',
      expiresOn: 'Aug 31, 2026',
    },
    {
      id: 3,
      title: 'Data Privacy and Security Fundamentals',
      author: 'sjain',
      status: 'Available',
      questions: 15,
      duration: '25 Minutes',
      expiresOn: 'Sep 15, 2026',
    },
  ];

  filteredBadges: BadgeItem[] = [...this.badges];

  filterBadges() {
    const search = this.searchText.toLowerCase().trim();
    this.filteredBadges = this.badges.filter((badge) => {
      const matchesTab = badge.status === this.selectedTab;
      const matchesSearch =
        search === '' || badge.title.toLowerCase().includes(search);
      return matchesTab && matchesSearch;
    });
  }

  selectTab(tab: BadgeItem['status']) {
    this.selectedTab = tab;
    this.filterBadges();
  }

  resetFilters() {
    this.searchText = '';
    this.selectedTab = 'Assigned';
    this.filteredBadges = [...this.badges].filter((badge) => badge.status === 'Assigned');
  }
}
