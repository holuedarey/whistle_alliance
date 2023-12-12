import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartiiComponent } from './chartii.component';

describe('ChartiiComponent', () => {
  let component: ChartiiComponent;
  let fixture: ComponentFixture<ChartiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartiiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
