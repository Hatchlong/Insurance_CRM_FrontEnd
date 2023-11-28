import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrorPoTypeComponent } from './error-po-type.component';

describe('ErrorPoTypeComponent', () => {
  let component: ErrorPoTypeComponent;
  let fixture: ComponentFixture<ErrorPoTypeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ErrorPoTypeComponent]
    });
    fixture = TestBed.createComponent(ErrorPoTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
