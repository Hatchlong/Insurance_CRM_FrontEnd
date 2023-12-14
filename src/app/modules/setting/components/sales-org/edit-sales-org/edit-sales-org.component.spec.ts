import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSalesOrgComponent } from './edit-sales-org.component';

describe('EditSalesOrgComponent', () => {
  let component: EditSalesOrgComponent;
  let fixture: ComponentFixture<EditSalesOrgComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditSalesOrgComponent]
    });
    fixture = TestBed.createComponent(EditSalesOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
