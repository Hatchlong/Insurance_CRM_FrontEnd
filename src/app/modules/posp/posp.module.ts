import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PospRoutingModule } from './posp-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { HttpClientModule } from '@angular/common/http';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AgentReportListComponent } from './components/agent-report/agent-report-list/agent-report-list.component';
import { AddAgentReportComponent } from './components/agent-report/add-agent-report/add-agent-report.component';


@NgModule({
  declarations: [
    AgentReportListComponent,
    AddAgentReportComponent
  ],
  imports: [
    CommonModule,
    PospRoutingModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TypeaheadModule.forRoot()
  ]
})
export class PospModule { }
