import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SettingsChartComponent } from './settings-chart.component';


describe('PowerSourcePerformanceChartComponent', () => {
  let component: SettingsChartComponent;
  let fixture: ComponentFixture<SettingsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SettingsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
