import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DivionListComponent } from './divion-list.component';

describe('DivionListComponent', () => {
  let component: DivionListComponent;
  let fixture: ComponentFixture<DivionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DivionListComponent]
    });
    fixture = TestBed.createComponent(DivionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
