import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFinancialPeriodComponent } from './edit-financial-period.component';

describe('EditFinancialPeriodComponent', () => {
  let component: EditFinancialPeriodComponent;
  let fixture: ComponentFixture<EditFinancialPeriodComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFinancialPeriodComponent]
    });
    fixture = TestBed.createComponent(EditFinancialPeriodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
