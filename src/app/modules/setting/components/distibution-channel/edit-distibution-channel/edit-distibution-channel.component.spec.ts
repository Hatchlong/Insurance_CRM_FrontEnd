import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDistibutionChannelComponent } from './edit-distibution-channel.component';

describe('EditDistibutionChannelComponent', () => {
  let component: EditDistibutionChannelComponent;
  let fixture: ComponentFixture<EditDistibutionChannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDistibutionChannelComponent]
    });
    fixture = TestBed.createComponent(EditDistibutionChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
