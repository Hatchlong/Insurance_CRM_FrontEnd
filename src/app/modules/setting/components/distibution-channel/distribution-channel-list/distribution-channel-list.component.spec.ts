import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionChannelListComponent } from './distribution-channel-list.component';

describe('DistributionChannelListComponent', () => {
  let component: DistributionChannelListComponent;
  let fixture: ComponentFixture<DistributionChannelListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionChannelListComponent]
    });
    fixture = TestBed.createComponent(DistributionChannelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
