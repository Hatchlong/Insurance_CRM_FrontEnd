import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardListComponent } from './components/dashboard/dashboard-list/dashboard-list.component';

const routes: Routes = [
  {
    path:'dashboard-list',
    component:DashboardListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
