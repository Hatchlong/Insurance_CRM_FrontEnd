import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditYearOfManufactureComponent } from './edit-year-of-manufacture.component';

describe('EditYearOfManufactureComponent', () => {
  let component: EditYearOfManufactureComponent;
  let fixture: ComponentFixture<EditYearOfManufactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditYearOfManufactureComponent]
    });
    fixture = TestBed.createComponent(EditYearOfManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
