import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBillingBlockComponent } from './add-billing-block.component';

describe('AddBillingBlockComponent', () => {
  let component: AddBillingBlockComponent;
  let fixture: ComponentFixture<AddBillingBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddBillingBlockComponent]
    });
    fixture = TestBed.createComponent(AddBillingBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
