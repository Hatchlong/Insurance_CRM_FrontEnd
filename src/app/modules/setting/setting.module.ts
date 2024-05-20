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
  providers: [CompanyCodeService, VehicleCategoryService, RtoStateService, InsuranceTypeService]
})
export class SettingModule { }
