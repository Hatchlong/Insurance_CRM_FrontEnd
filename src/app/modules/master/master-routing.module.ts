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
import { AddVendorComponent } from './components/vendor/add-vendor/add-vendor.component';
import { VendorListComponent } from './components/vendor/vendor-list/vendor-list.component';
import { EditVendorComponent } from './components/vendor/edit-vendor/edit-vendor.component';

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
