import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPurchaseOrgComponent } from './edit-purchase-org.component';

describe('EditPurchaseOrgComponent', () => {
  let component: EditPurchaseOrgComponent;
  let fixture: ComponentFixture<EditPurchaseOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditPurchaseOrgComponent]
    });
    fixture = TestBed.createComponent(EditPurchaseOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
