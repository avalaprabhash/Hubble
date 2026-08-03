import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Certifications } from './certifications';

// Component test topic: ensure the certifications screen compiles with standalone imports.
describe('Certifications', () => {
  let component: Certifications;
  let fixture: ComponentFixture<Certifications>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Certifications],
    }).compileComponents();

    fixture = TestBed.createComponent(Certifications);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
