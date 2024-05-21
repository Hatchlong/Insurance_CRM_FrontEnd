import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MasterRoutingModule } from '../master/master-routing.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { AddCompanyCodeComponent } from './components/company-code/add-company-code/add-company-code.component';
import { CompanyCodeListComponent } from './components/company-code/company-code-list/company-code-list.component';
import { VehicleRegisteryListComponent } from './components/vehicle-registory/vehicle-registery-list/vehicle-registery-list.component';
import { AddVehicleRegisteryComponent } from './components/vehicle-registory/add-vehicle-registery/add-vehicle-registery.component';
import { EditCompanyCodeComponent } from './components/company-code/edit-company-code/edit-company-code.component';
import { AddRtoStateComponent } from './components/rto-state/add-rto-state/add-rto-state.component';
import { EditRtoStateComponent } from './components/rto-state/edit-rto-state/edit-rto-state.component';
import { RtoStateListComponent } from './components/rto-state/rto-state-list/rto-state-list.component';
import { EditVehicleRegisteryComponent } from './components/vehicle-registory/edit-vehicle-registery/edit-vehicle-registery.component';
import { CompanyCodeService } from './services/company-code/company-code.service';
import { VehicleCategoryService } from './services/vehicle-category/vehicle-category.service';
import { RtoStateService } from './services/rto-state/rto-state.service';
import { HttpClientModule } from '@angular/common/http';
import { PandirectiveDirective } from './services/directive/pandirective.directive';
import { CodeDirectiveDirective } from './services/directive/codedirective/code-directive.directive';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { AddInsuranceTypeComponent } from './components/insurance-type/add-insurance-type/add-insurance-type.component';
import { EditInsuranceTypeComponent } from './components/insurance-type/edit-insurance-type/edit-insurance-type.component';
import { InsuranceTypeListComponent } from './components/insurance-type/insurance-type-list/insurance-type-list.component';
import { InsuranceTypeService } from './services/insurance-type/insurance-type.service';
import { MakeListComponent } from './components/make/make-list/make-list.component';
import { AddMakeComponent } from './components/make/add-make/add-make.component';
import { EditMakeComponent } from './components/make/edit-make/edit-make.component';
import { ModelListComponent } from './components/model/model-list/model-list.component';
import { AddModelComponent } from './components/model/add-model/add-model.component';
import { EditModelComponent } from './components/model/edit-model/edit-model.component';
import { CategoryListComponent } from './components/category/category-list/category-list.component';
import { AddCategoryComponent } from './components/category/add-category/add-category.component';
import { EditCategoryComponent } from './components/category/edit-category/edit-category.component';
import { YearOfManufactureListComponent } from './components/year-of-manufacture/year-of-manufacture-list/year-of-manufacture-list.component';
import { AddYearOfManufactureComponent } from './components/year-of-manufacture/add-year-of-manufacture/add-year-of-manufacture.component';
import { EditYearOfManufactureComponent } from './components/year-of-manufacture/edit-year-of-manufacture/edit-year-of-manufacture.component';
import { PolicyTypeListComponent } from './components/policy-type/policy-type-list/policy-type-list.component';
import { AddPolicyTypeComponent } from './components/policy-type/add-policy-type/add-policy-type.component';
import { EditPolicyTypeComponent } from './components/policy-type/edit-policy-type/edit-policy-type.component';
import { CategoryService } from './services/category/category.service';
import { MakeService } from './services/make/make.service';
import { ModelService } from './services/model/model.service';
import { PolictTypeService } from './services/policy-type/polict-type.service';
import { YearOfManufactureService } from './services/year-of-manufacture/year-of-manufacture.service';


@NgModule({
  declarations: [
    AddCompanyCodeComponent,
    CompanyCodeListComponent,
    VehicleRegisteryListComponent,
    AddVehicleRegisteryComponent,
    EditCompanyCodeComponent,
    AddRtoStateComponent,
    EditRtoStateComponent,
    RtoStateListComponent,
    EditVehicleRegisteryComponent,
    PandirectiveDirective,
    CodeDirectiveDirective,
    AddInsuranceTypeComponent,
    EditInsuranceTypeComponent,
    InsuranceTypeListComponent,
    MakeListComponent,
    AddMakeComponent,
    EditMakeComponent,
    ModelListComponent,
    AddModelComponent,
    EditModelComponent,
    CategoryListComponent,
    AddCategoryComponent,
    EditCategoryComponent,
    YearOfManufactureListComponent,
    AddYearOfManufactureComponent,
    EditYearOfManufactureComponent,
    PolicyTypeListComponent,
    AddPolicyTypeComponent,
    EditPolicyTypeComponent,

  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
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
    TypeaheadModule.forRoot()

  ],
  providers: [CompanyCodeService, VehicleCategoryService, RtoStateService, InsuranceTypeService, CategoryService, MakeService, ModelService, PolictTypeService, YearOfManufactureService]
})
export class SettingModule { }
