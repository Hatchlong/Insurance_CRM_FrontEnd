import { TestBed } from '@angular/core/testing';

import { YearOfManufactureService } from './year-of-manufacture.service';

describe('YearOfManufactureService', () => {
  let service: YearOfManufactureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(YearOfManufactureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
