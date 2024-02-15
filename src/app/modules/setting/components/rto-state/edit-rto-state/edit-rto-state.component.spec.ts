import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRtoStateComponent } from './edit-rto-state.component';

describe('EditRtoStateComponent', () => {
  let component: EditRtoStateComponent;
  let fixture: ComponentFixture<EditRtoStateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditRtoStateComponent]
    });
    fixture = TestBed.createComponent(EditRtoStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
