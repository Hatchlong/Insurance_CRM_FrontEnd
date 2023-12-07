import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddModeOfTransportComponent } from './add-mode-of-transport.component';

describe('AddModeOfTransportComponent', () => {
  let component: AddModeOfTransportComponent;
  let fixture: ComponentFixture<AddModeOfTransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddModeOfTransportComponent]
    });
    fixture = TestBed.createComponent(AddModeOfTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
