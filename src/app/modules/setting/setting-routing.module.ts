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
import { AddInsuranceTypeComponent } from './components/insurance-type/add-insurance-type/add-insurance-type.component';
import { InsuranceTypeListComponent } from './components/insurance-type/insurance-type-list/insurance-type-list.component';
import { EditInsuranceTypeComponent } from './components/insurance-type/edit-insurance-type/edit-insurance-type.component';
import { MakeListComponent } from './components/make/make-list/make-list.component';
import { AddMakeComponent } from './components/make/add-make/add-make.component';
import { EditMakeComponent } from './components/make/edit-make/edit-make.component';
import { ModelListComponent } from './components/model/model-list/model-list.component';
import { AddModelComponent } from './components/model/add-model/add-model.component';
import { EditModelComponent } from './components/model/edit-model/edit-model.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { PolicyTypeListComponent } from './components/policy-type/policy-type-list/policy-type-list.component';
import { AddPolicyTypeComponent } from './components/policy-type/add-policy-type/add-policy-type.component';
import { EditPolicyTypeComponent } from './components/policy-type/edit-policy-type/edit-policy-type.component';
import { YearOfManufactureListComponent } from './components/year-of-manufacture/year-of-manufacture-list/year-of-manufacture-list.component';
import { AddYearOfManufactureComponent } from './components/year-of-manufacture/add-year-of-manufacture/add-year-of-manufacture.component';
import { EditYearOfManufactureComponent } from './components/year-of-manufacture/edit-year-of-manufacture/edit-year-of-manufacture.component';
import { RoleListComponent } from './components/role/role-list/role-list.component';
import { AddRoleComponent } from './components/role/add-role/add-role.component';
import { EdtRoleComponent } from './components/role/edt-role/edt-role.component';

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
    path: 'add-rto-state',
    component: AddRtoStateComponent
  },
  {
    path: 'rto-state-list',
    component: RtoStateListComponent
  },
  {
    path: 'edit-rto-state/:id',
    component: EditRtoStateComponent
  },
  {
    path: 'add-insurance-type',
    component: AddInsuranceTypeComponent
  },
  {
    path: 'insurance-type-list',
    component: InsuranceTypeListComponent
  },
  {
    path: 'edit-insurance-type/:id',
    component: EditInsuranceTypeComponent
  },
  {
    path: 'make-list',
    component: MakeListComponent
  },
  {
    path: 'add-make',
    component: AddMakeComponent
  },
  {
    path: 'edit-make/:id',
    component: EditMakeComponent
  },
  {
    path: 'model-list',
    component: ModelListComponent
  },
  {
    path: 'add-model',
    component: AddModelComponent
  },
  {
    path: 'edit-model/:id',
    component: EditModelComponent
  },
  {
    path: 'category-list',
    component: CategoryListComponent
  },
  {
    path: 'add-category',
    component: AddCategoryComponent
  },
  {
    path: 'edit-category/:id',
    component: EditCategoryComponent
  },
  {
    path: 'policy-type-list',
    component: PolicyTypeListComponent
  },
  {
    path: 'add-policy-type',
    component: AddPolicyTypeComponent
  },
  {
    path: 'edit-policy-type/:id',
    component: EditPolicyTypeComponent
  },
  {
    path: 'year-of-manufacture-list',
    component: YearOfManufactureListComponent
  },
  {
    path: 'add-year-of-manufacture',
    component: AddYearOfManufactureComponent
  },
  {
    path: 'edit-year-of-manufacture/:id',
    component: EditYearOfManufactureComponent
  },
  {
    path: 'roles-list',
    component: RoleListComponent
  },
  {
    path: 'add-roles',
    component: AddRoleComponent
  },
  {
    path: 'edit-roles/:id',
    component: EdtRoleComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
