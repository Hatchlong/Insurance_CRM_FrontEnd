import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdtRoleComponent } from './edt-role.component';

describe('EdtRoleComponent', () => {
  let component: EdtRoleComponent;
  let fixture: ComponentFixture<EdtRoleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdtRoleComponent]
    });
    fixture = TestBed.createComponent(EdtRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
