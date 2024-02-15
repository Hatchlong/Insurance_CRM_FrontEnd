import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehicleRegisteryComponent } from './add-vehicle-registery.component';

describe('AddVehicleRegisteryComponent', () => {
  let component: AddVehicleRegisteryComponent;
  let fixture: ComponentFixture<AddVehicleRegisteryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVehicleRegisteryComponent]
    });
    fixture = TestBed.createComponent(AddVehicleRegisteryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
