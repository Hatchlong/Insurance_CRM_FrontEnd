import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditModeOfTransportComponent } from './edit-mode-of-transport.component';

describe('EditModeOfTransportComponent', () => {
  let component: EditModeOfTransportComponent;
  let fixture: ComponentFixture<EditModeOfTransportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditModeOfTransportComponent]
    });
    fixture = TestBed.createComponent(EditModeOfTransportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
