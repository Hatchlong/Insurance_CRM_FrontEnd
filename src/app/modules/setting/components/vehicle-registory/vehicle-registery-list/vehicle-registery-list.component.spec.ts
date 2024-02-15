import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleRegisteryListComponent } from './vehicle-registery-list.component';

describe('VehicleRegisteryListComponent', () => {
  let component: VehicleRegisteryListComponent;
  let fixture: ComponentFixture<VehicleRegisteryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleRegisteryListComponent]
    });
    fixture = TestBed.createComponent(VehicleRegisteryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
