import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoTypeListComponent } from './po-type-list.component';

describe('PoTypeListComponent', () => {
  let component: PoTypeListComponent;
  let fixture: ComponentFixture<PoTypeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PoTypeListComponent]
    });
    fixture = TestBed.createComponent(PoTypeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
