import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePoTypeComponent } from './update-po-type.component';

describe('UpdatePoTypeComponent', () => {
  let component: UpdatePoTypeComponent;
  let fixture: ComponentFixture<UpdatePoTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdatePoTypeComponent]
    });
    fixture = TestBed.createComponent(UpdatePoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
