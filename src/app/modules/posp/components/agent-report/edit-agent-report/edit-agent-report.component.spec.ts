import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAgentReportComponent } from './edit-agent-report.component';

describe('EditAgentReportComponent', () => {
  let component: EditAgentReportComponent;
  let fixture: ComponentFixture<EditAgentReportComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAgentReportComponent]
    });
    fixture = TestBed.createComponent(EditAgentReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
