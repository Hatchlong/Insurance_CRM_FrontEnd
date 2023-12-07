import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDistributionChannelComponent } from './add-distribution-channel.component';

describe('AddDistributionChannelComponent', () => {
  let component: AddDistributionChannelComponent;
  let fixture: ComponentFixture<AddDistributionChannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDistributionChannelComponent]
    });
    fixture = TestBed.createComponent(AddDistributionChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
