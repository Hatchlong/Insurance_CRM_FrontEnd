import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPlantDataComponent } from './edit-plant-data.component';

describe('EditPlantDataComponent', () => {
  let component: EditPlantDataComponent;
  let fixture: ComponentFixture<EditPlantDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPlantDataComponent]
    });
    fixture = TestBed.createComponent(EditPlantDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
