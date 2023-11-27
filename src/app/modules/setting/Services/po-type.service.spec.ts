import { TestBed } from '@angular/core/testing';

import { PoTypeService } from './po-type.service';

describe('PoTypeService', () => {
  let service: PoTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PoTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
