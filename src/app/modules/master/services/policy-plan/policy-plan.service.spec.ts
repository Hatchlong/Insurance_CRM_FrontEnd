import { TestBed } from '@angular/core/testing';

import { PolicyPlanService } from './policy-plan.service';

describe('PolicyPlanService', () => {
  let service: PolicyPlanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolicyPlanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
