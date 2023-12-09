import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddIncoTermComponent } from './add-inco-term.component';

describe('AddIncoTermComponent', () => {
  let component: AddIncoTermComponent;
  let fixture: ComponentFixture<AddIncoTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddIncoTermComponent]
    });
    fixture = TestBed.createComponent(AddIncoTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
