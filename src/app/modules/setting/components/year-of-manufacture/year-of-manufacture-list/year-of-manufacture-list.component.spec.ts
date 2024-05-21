import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YearOfManufactureListComponent } from './year-of-manufacture-list.component';

describe('YearOfManufactureListComponent', () => {
  let component: YearOfManufactureListComponent;
  let fixture: ComponentFixture<YearOfManufactureListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [YearOfManufactureListComponent]
    });
    fixture = TestBed.createComponent(YearOfManufactureListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
