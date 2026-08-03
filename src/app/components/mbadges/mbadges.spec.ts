import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mbadges } from './mbadges';

// Component test topic: verify the mBadges placeholder component initializes.
describe('Mbadges', () => {
  let component: Mbadges;
  let fixture: ComponentFixture<Mbadges>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mbadges],
    }).compileComponents();

    fixture = TestBed.createComponent(Mbadges);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
