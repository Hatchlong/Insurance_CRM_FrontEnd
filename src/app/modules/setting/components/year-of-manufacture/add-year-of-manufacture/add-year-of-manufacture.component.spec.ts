import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddYearOfManufactureComponent } from './add-year-of-manufacture.component';

describe('AddYearOfManufactureComponent', () => {
  let component: AddYearOfManufactureComponent;
  let fixture: ComponentFixture<AddYearOfManufactureComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddYearOfManufactureComponent]
    });
    fixture = TestBed.createComponent(AddYearOfManufactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
