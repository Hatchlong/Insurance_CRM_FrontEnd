import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCompanyCodeComponent } from './components/company-code/add-company-code/add-company-code.component';
import { CompanyCodeListComponent } from './components/company-code/company-code-list/company-code-list.component';
import { AddVehicleRegisteryComponent } from './components/vehicle-registory/add-vehicle-registery/add-vehicle-registery.component';
import { VehicleRegisteryListComponent } from './components/vehicle-registory/vehicle-registery-list/vehicle-registery-list.component';
import { EditCompanyCodeComponent } from './components/company-code/edit-company-code/edit-company-code.component';
import { EditVehicleRegisteryComponent } from './components/vehicle-registory/edit-vehicle-registery/edit-vehicle-registery.component';
import { AddRtoStateComponent } from './components/rto-state/add-rto-state/add-rto-state.component';
import { RtoStateListComponent } from './components/rto-state/rto-state-list/rto-state-list.component';
import { EditRtoStateComponent } from './components/rto-state/edit-rto-state/edit-rto-state.component';

const routes: Routes = [
  {
    path: 'add-company-code',
    component: AddCompanyCodeComponent
  },
  {
    path: 'company-code-list',
    component: CompanyCodeListComponent
  },
  {
    path: 'edit-company-code/:id',
    component: EditCompanyCodeComponent
  },
  {
    path: 'add-vehicle-category',
    component: AddVehicleRegisteryComponent
  },
  {
    path: 'vehicle-category-list',
    component: VehicleRegisteryListComponent
  },
  {
    path: 'edit-vehicle-category/:id',
    component: EditVehicleRegisteryComponent
  },
  {
    path:'add-rto-state',
    component:AddRtoStateComponent
  },
  {
    path:'rto-state-list',
    component:RtoStateListComponent
  },
  {
    path:'edit-rto-state/:id',
    component:EditRtoStateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
