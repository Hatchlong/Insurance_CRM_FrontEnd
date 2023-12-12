import { TestBed } from '@angular/core/testing';

import { DistibutionChannelService } from './distibution-channel.service';

describe('DistibutionChannelService', () => {
  let service: DistibutionChannelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DistibutionChannelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
