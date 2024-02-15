import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVehicleRegisteryComponent } from './edit-vehicle-registery.component';

describe('EditVehicleRegisteryComponent', () => {
  let component: EditVehicleRegisteryComponent;
  let fixture: ComponentFixture<EditVehicleRegisteryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVehicleRegisteryComponent]
    });
    fixture = TestBed.createComponent(EditVehicleRegisteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
