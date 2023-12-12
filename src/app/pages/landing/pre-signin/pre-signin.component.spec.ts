import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreSigninComponent } from './pre-signin.component';

describe('PreSigninComponent', () => {
  let component: PreSigninComponent;
  let fixture: ComponentFixture<PreSigninComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreSigninComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PreSigninComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
