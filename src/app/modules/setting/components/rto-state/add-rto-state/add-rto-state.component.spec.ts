import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRtoStateComponent } from './add-rto-state.component';

describe('AddRtoStateComponent', () => {
  let component: AddRtoStateComponent;
  let fixture: ComponentFixture<AddRtoStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRtoStateComponent]
    });
    fixture = TestBed.createComponent(AddRtoStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
