import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompOffs } from './comp-offs';

// Component test topic: verify the comp-offs placeholder compiles without dependencies.
describe('CompOffs', () => {
  let component: CompOffs;
  let fixture: ComponentFixture<CompOffs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompOffs],
    }).compileComponents();

    fixture = TestBed.createComponent(CompOffs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
