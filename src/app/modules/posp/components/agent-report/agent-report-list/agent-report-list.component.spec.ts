import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentReportListComponent } from './agent-report-list.component';

describe('AgentReportListComponent', () => {
  let component: AgentReportListComponent;
  let fixture: ComponentFixture<AgentReportListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentReportListComponent]
    });
    fixture = TestBed.createComponent(AgentReportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
