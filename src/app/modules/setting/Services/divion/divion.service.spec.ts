import { TestBed } from '@angular/core/testing';

import { DivionService } from './divion.service';

describe('DivionService', () => {
  let service: DivionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DivionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
