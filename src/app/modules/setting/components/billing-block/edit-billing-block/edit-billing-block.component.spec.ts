import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBillingBlockComponent } from './edit-billing-block.component';

describe('EditBillingBlockComponent', () => {
  let component: EditBillingBlockComponent;
  let fixture: ComponentFixture<EditBillingBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditBillingBlockComponent]
    });
    fixture = TestBed.createComponent(EditBillingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
