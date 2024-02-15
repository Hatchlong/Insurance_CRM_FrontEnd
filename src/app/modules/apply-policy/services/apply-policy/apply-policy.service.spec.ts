import { TestBed } from '@angular/core/testing';

import { ApplyPolicyService } from './apply-policy.service';

describe('ApplyPolicyService', () => {
  let service: ApplyPolicyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApplyPolicyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
