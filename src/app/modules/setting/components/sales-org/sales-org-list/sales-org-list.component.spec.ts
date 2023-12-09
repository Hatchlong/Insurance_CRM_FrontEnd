import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrgListComponent } from './sales-org-list.component';

describe('SalesOrgListComponent', () => {
  let component: SalesOrgListComponent;
  let fixture: ComponentFixture<SalesOrgListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesOrgListComponent]
    });
    fixture = TestBed.createComponent(SalesOrgListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
