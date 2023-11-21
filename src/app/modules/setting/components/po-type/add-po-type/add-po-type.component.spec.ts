import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPoTypeComponent } from './add-po-type.component';

describe('AddPoTypeComponent', () => {
  let component: AddPoTypeComponent;
  let fixture: ComponentFixture<AddPoTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddPoTypeComponent]
    });
    fixture = TestBed.createComponent(AddPoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
