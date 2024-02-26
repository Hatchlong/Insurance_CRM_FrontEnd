import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAgentComponent } from './components/agent/add-agent/add-agent.component';
import { AgentListComponent } from './components/agent/agent-list/agent-list.component';
import { AddCustomerComponent } from './components/customer/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer/customer-list/customer-list.component';
import { AddPolicyPlanComponent } from './components/policy-plan/add-policy-plan/add-policy-plan.component';
import { PolicyPlanListComponent } from './components/policy-plan/policy-plan-list/policy-plan-list.component';
import { EditAgentComponent } from './components/agent/edit-agent/edit-agent.component';
import { EditPolicyPlanComponent } from './components/policy-plan/edit-policy-plan/edit-policy-plan.component';
import { AddFinancialPeriodComponent } from './components/financial-period/add-financial-period/add-financial-period.component';
import { FinancialPeriodListComponent } from './components/financial-period/financial-period-list/financial-period-list.component';
import { EditFinancialPeriodComponent } from './components/financial-period/edit-financial-period/edit-financial-period.component';
import { AddVendorComponent } from './components/vendor/add-vendor/add-vendor.component';
import { VendorListComponent } from './components/vendor/vendor-list/vendor-list.component';
import { EditVendorComponent } from './components/vendor/edit-vendor/edit-vendor.component';
import { EditCustomerComponent } from './components/customer/edit-customer/edit-customer.component';

const routes: Routes = [
  {
    path: '',
    redirectTo:'add-agent',
    pathMatch: 'full'
  },
  {
    path:'add-agent',
    component:AddAgentComponent
  },
  {
    path:'agent-list',
    component:AgentListComponent
  },
  
  {
    path:'edit-agent/:id',
    component:EditAgentComponent
  },
  {
    path:'add-customer',
    component:AddCustomerComponent
  },
  {
    path:'edit-customer/:id',
    component:EditCustomerComponent
  },
  {
    path:'customer-list',
    component:CustomerListComponent
  },
  {
    path:'add-policy-plan',
    component:AddPolicyPlanComponent
  },
  {
    path:'policy-plan-list',
    component:PolicyPlanListComponent
  },
  {
    path:'edit-policy-plan/:id',
    component:EditPolicyPlanComponent
  },
  {
    path:'add-financial-period',
    component:AddFinancialPeriodComponent
  },
  {
    path:'financial-period-list',
    component:FinancialPeriodListComponent
  },
  {
    path:'edit-financial-period/:id',
    component:EditFinancialPeriodComponent
  },{
    path:'add-vendor',
    component:AddVendorComponent
  },
  {
    path:'vendor-list',
    component:VendorListComponent
  },
  {
    path:'edit-vendor/:id',
    component:EditVendorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
