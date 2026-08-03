import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppraisalReviews } from './appraisal-reviews';

// Component test topic: verify the appraisal reviews placeholder can be created.
describe('AppraisalReviews', () => {
  let component: AppraisalReviews;
  let fixture: ComponentFixture<AppraisalReviews>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppraisalReviews],
    }).compileComponents();

    fixture = TestBed.createComponent(AppraisalReviews);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
