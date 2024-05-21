import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyTypeListComponent } from './policy-type-list.component';

describe('PolicyTypeListComponent', () => {
  let component: PolicyTypeListComponent;
  let fixture: ComponentFixture<PolicyTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PolicyTypeListComponent]
    });
    fixture = TestBed.createComponent(PolicyTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
