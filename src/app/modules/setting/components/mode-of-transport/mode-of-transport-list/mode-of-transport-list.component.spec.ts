import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModeOfTransportListComponent } from './mode-of-transport-list.component';

describe('ModeOfTransportListComponent', () => {
  let component: ModeOfTransportListComponent;
  let fixture: ComponentFixture<ModeOfTransportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModeOfTransportListComponent]
    });
    fixture = TestBed.createComponent(ModeOfTransportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
