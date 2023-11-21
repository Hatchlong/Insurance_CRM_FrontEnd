import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseOrgComponent } from './add-purchase-org.component';

describe('AddPurchaseOrgComponent', () => {
  let component: AddPurchaseOrgComponent;
  let fixture: ComponentFixture<AddPurchaseOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPurchaseOrgComponent]
    });
    fixture = TestBed.createComponent(AddPurchaseOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
