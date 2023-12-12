import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDivionComponent } from './edit-divion.component';

describe('EditDivionComponent', () => {
  let component: EditDivionComponent;
  let fixture: ComponentFixture<EditDivionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDivionComponent]
    });
    fixture = TestBed.createComponent(EditDivionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
