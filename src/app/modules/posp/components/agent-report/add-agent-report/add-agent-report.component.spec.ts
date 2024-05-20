import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAgentReportComponent } from './add-agent-report.component';

describe('AddAgentReportComponent', () => {
  let component: AddAgentReportComponent;
  let fixture: ComponentFixture<AddAgentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddAgentReportComponent]
    });
    fixture = TestBed.createComponent(AddAgentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
