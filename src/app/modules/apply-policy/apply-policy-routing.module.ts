import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddApplyPolicyComponent } from './components/apply-policy/add-apply-policy/add-apply-policy.component';
import { ApplyPolicyListComponent } from './components/apply-policy/apply-policy-list/apply-policy-list.component';
import { EditApplyPolicyComponent } from './components/apply-policy/edit-apply-policy/edit-apply-policy.component';

const routes: Routes = [
  {
    path:'add-apply-policy',
    component:AddApplyPolicyComponent
  },
  {
    path:'apply-policy-list',
    component:ApplyPolicyListComponent
  },
  {
    path:'edit-apply-policy/:id',
    component:EditApplyPolicyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplyPolicyRoutingModule { }
