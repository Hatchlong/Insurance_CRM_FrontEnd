import { TestBed } from '@angular/core/testing';

import { IncTermService } from './inc-term.service';

describe('IncTermService', () => {
  let service: IncTermService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IncTermService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
