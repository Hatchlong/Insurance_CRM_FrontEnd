import { TestBed } from '@angular/core/testing';

import { PolictTypeService } from './polict-type.service';

describe('PolictTypeService', () => {
  let service: PolictTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolictTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
