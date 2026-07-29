import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Certification {
  id: number;
  title: string;
  code: string;
  partner: string;
  practice: string;
  date: string;
}

@Component({
  selector: 'app-certification',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './certifications.html',
  styleUrls: ['./certifications.css']
})
export class Certifications {
  searchText = '';
  selectedPartner = '';
  selectedPractice = '';

  certifications: Certification[] = [
    {
      id: 1,
      title: 'AWS Certified Generative AI Developer - Professional',
      code: 'AIP-C01',
      partner: 'AWS',
      practice: 'Generative AI',
      date: 'May 30, 2026'
    },

    {
      id: 2,
      title: 'UiPath Professional Agentic Automation Associate',
      code: 'UIAAA',
      partner: 'UiPath',
      practice: 'RPA',
      date: 'Jul 31, 2026'
    },

    {
      id: 3,
      title: 'watsonx Orchestrate Technical Sales Intermediate',
      code: 'IBMIN1942',
      partner: 'IBM',
      practice: 'Intelligent Process Automation',
      date: 'Jul 25, 2026'
    },

    {
      id: 4,
      title: 'watsonx Orchestrate Sales Foundation',
      code: 'IBMIN4034',
      partner: 'IBM',
      practice: 'Intelligent Process Automation',
      date: 'Jul 25, 2026'
    },

    {
      id: 5,
      title: 'Guardium Data Security Center Technical Sales',
      code: 'IBMIN7620',
      partner: 'IBM',
      practice: 'Infra Management and Automation',
      date: 'Jul 18, 2026'
    },

    {
      id: 6,
      title: 'Guardium Data Security Center Sales Foundation',
      code: 'IBMIN3441',
      partner: 'IBM',
      practice: 'Infra Management and Automation',
      date: 'Jul 17, 2026'
    }

  ];

  filteredCertifications: Certification[] = [...this.certifications];

  partners = [
    'AWS',
    'IBM',
    'UiPath'
  ];

  practices = [
    'Generative AI',
    'RPA',
    'Intelligent Process Automation',
    'Infra Management and Automation'
  ];

  filterCertifications() {

    const search = this.searchText.toLowerCase().trim();

    this.filteredCertifications = this.certifications.filter(cert => {

      const matchesTitle =
        search === '' ||
        cert.title.toLowerCase().includes(search);

      const matchesPartner =
        this.selectedPartner === '' ||
        cert.partner === this.selectedPartner;

      const matchesPractice =
        this.selectedPractice === '' ||
        cert.practice === this.selectedPractice;

      return (
        matchesTitle &&
        matchesPartner &&
        matchesPractice
      );

    });

  }

  resetFilters() {
    this.searchText = '';
    this.selectedPartner = '';
    this.selectedPractice = '';

    this.filteredCertifications = [...this.certifications];

  }

}