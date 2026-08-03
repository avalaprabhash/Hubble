import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Hierarchy } from './hierarchy';

// Component test topic: verify the hierarchy placeholder can be constructed.
describe('Hierarchy', () => {
  let component: Hierarchy;
  let fixture: ComponentFixture<Hierarchy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Hierarchy],
    }).compileComponents();

    fixture = TestBed.createComponent(Hierarchy);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
