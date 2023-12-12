import { TestBed } from '@angular/core/testing';

import { NinserviceService } from './ninservice.service';

describe('NinserviceService', () => {
  let service: NinserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NinserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
