import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { AgentListComponent } from './components/agent/agent-list/agent-list.component';
import { AddAgentComponent } from './components/agent/add-agent/add-agent.component';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DirectiveDirective } from './services/directive.directive';
import { AddPolicyPlanComponent } from './components/policy-plan/add-policy-plan/add-policy-plan.component';
import { PolicyPlanListComponent } from './components/policy-plan/policy-plan-list/policy-plan-list.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { AgentService } from './services/agent/agent.service';
import { HttpClientModule } from '@angular/common/http';
import { PolicyPlanService } from './services/policy-plan/policy-plan.service';
import { EditAgentComponent } from './components/agent/edit-agent/edit-agent.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import { EditPolicyPlanComponent } from './components/policy-plan/edit-policy-plan/edit-policy-plan.component';
import { ViewImageComponent } from './components/view-image/view-image/view-image.component';
import { FinancialPeriodListComponent } from './components/financial-period/financial-period-list/financial-period-list.component';
import { AddFinancialPeriodComponent } from './components/financial-period/add-financial-period/add-financial-period.component';
import { EditFinancialPeriodComponent } from './components/financial-period/edit-financial-period/edit-financial-period.component';
import { FinancialPeriodService } from './services/financial-period/financial-period.service';



@NgModule({
  declarations: [
    AgentListComponent,
    AddAgentComponent,
    DirectiveDirective,
    AddPolicyPlanComponent,
    PolicyPlanListComponent,
    AddCustomerComponent,
    CustomerListComponent,
    EditAgentComponent,
    EditPolicyPlanComponent,
    ViewImageComponent,
    FinancialPeriodListComponent,
    AddFinancialPeriodComponent,
    EditFinancialPeriodComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
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
    MatDialogModule


  ],
  providers:[AgentService,PolicyPlanService, FinancialPeriodService]
})
export class MasterModule { }
