import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartiComponent } from './charti.component';

describe('ChartiComponent', () => {
  let component: ChartiComponent;
  let fixture: ComponentFixture<ChartiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
