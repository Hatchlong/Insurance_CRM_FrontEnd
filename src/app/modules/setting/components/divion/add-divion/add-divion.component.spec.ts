import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDivionComponent } from './add-divion.component';

describe('AddDivionComponent', () => {
  let component: AddDivionComponent;
  let fixture: ComponentFixture<AddDivionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddDivionComponent]
    });
    fixture = TestBed.createComponent(AddDivionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
