import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditIncoTermComponent } from './edit-inco-term.component';

describe('EditIncoTermComponent', () => {
  let component: EditIncoTermComponent;
  let fixture: ComponentFixture<EditIncoTermComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditIncoTermComponent]
    });
    fixture = TestBed.createComponent(EditIncoTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
