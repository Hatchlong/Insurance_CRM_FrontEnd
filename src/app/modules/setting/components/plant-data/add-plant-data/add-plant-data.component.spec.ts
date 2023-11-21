import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlantDataComponent } from './add-plant-data.component';

describe('AddPlantDataComponent', () => {
  let component: AddPlantDataComponent;
  let fixture: ComponentFixture<AddPlantDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlantDataComponent]
    });
    fixture = TestBed.createComponent(AddPlantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
