import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlantDataListComponent } from './plant-data-list.component';

describe('PlantDataListComponent', () => {
  let component: PlantDataListComponent;
  let fixture: ComponentFixture<PlantDataListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlantDataListComponent]
    });
    fixture = TestBed.createComponent(PlantDataListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
