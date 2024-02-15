import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RtoStateListComponent } from './rto-state-list.component';

describe('RtoStateListComponent', () => {
  let component: RtoStateListComponent;
  let fixture: ComponentFixture<RtoStateListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RtoStateListComponent]
    });
    fixture = TestBed.createComponent(RtoStateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
