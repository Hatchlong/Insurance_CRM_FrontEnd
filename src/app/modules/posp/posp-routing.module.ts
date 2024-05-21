import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentReportListComponent } from './components/agent-report/agent-report-list/agent-report-list.component';
import { AddAgentReportComponent } from './components/agent-report/add-agent-report/add-agent-report.component';
import { EditAgentReportComponent } from './components/agent-report/edit-agent-report/edit-agent-report.component';

const routes: Routes = [
  {
    path: 'agent-report-list',
    component: AgentReportListComponent
  },
  {
    path: 'add-agent-report',
    component: AddAgentReportComponent
  },
  {
    path: 'edit-agent-report/:id',
    component: EditAgentReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PospRoutingModule { }
