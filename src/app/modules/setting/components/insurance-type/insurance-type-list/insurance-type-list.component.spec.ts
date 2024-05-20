import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsuranceTypeListComponent } from './insurance-type-list.component';

describe('InsuranceTypeListComponent', () => {
  let component: InsuranceTypeListComponent;
  let fixture: ComponentFixture<InsuranceTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsuranceTypeListComponent]
    });
    fixture = TestBed.createComponent(InsuranceTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
