import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSalesOrgComponent } from './add-sales-org.component';

describe('AddSalesOrgComponent', () => {
  let component: AddSalesOrgComponent;
  let fixture: ComponentFixture<AddSalesOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddSalesOrgComponent]
    });
    fixture = TestBed.createComponent(AddSalesOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
