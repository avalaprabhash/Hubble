import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeSearch } from './employee-search';

// Component test topic: create the employee search screen in a standalone test host.
describe('EmployeeSearch', () => {
  let component: EmployeeSearch;
  let fixture: ComponentFixture<EmployeeSearch>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmployeeSearch],
    }).compileComponents();

    fixture = TestBed.createComponent(EmployeeSearch);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
