import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PowerSourcePerformanceCardComponent } from './power-source-performance-card.component';

describe('PowerSourcePerformanceCardComponent', () => {
  let component: PowerSourcePerformanceCardComponent;
  let fixture: ComponentFixture<PowerSourcePerformanceCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PowerSourcePerformanceCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PowerSourcePerformanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
