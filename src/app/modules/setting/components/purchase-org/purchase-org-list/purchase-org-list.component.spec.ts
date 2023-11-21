import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrgListComponent } from './purchase-org-list.component';

describe('PurchaseOrgListComponent', () => {
  let component: PurchaseOrgListComponent;
  let fixture: ComponentFixture<PurchaseOrgListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrgListComponent]
    });
    fixture = TestBed.createComponent(PurchaseOrgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
