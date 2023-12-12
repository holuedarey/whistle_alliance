import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinFormComponent } from './nin-form.component';

describe('NinFormComponent', () => {
  let component: NinFormComponent;
  let fixture: ComponentFixture<NinFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NinFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NinFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
