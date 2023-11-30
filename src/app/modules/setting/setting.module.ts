import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { AddCompanyCodeComponent } from './components/company-code/add-company-code/add-company-code.component';
import { CompanyCodeListComponent } from './components/company-code/company-code-list/company-code-list.component';
import { AddPoTypeComponent } from './components/po-type/add-po-type/add-po-type.component';
import { PoTypeListComponent } from './components/po-type/po-type-list/po-type-list.component';
import { AddPaymentTermsComponent } from './components/payment-terms/add-payment-terms/add-payment-terms.component';
import { PaymentTermsListComponent } from './components/payment-terms/payment-terms-list/payment-terms-list.component';
import { AddPurchaseOrgComponent } from './components/purchase-org/add-purchase-org/add-purchase-org.component';
import { PurchaseOrgListComponent } from './components/purchase-org/purchase-org-list/purchase-org-list.component';
import { AddPlantDataComponent } from './components/plant-data/add-plant-data/add-plant-data.component';
import { PlantDataListComponent } from './components/plant-data/plant-data-list/plant-data-list.component';
import { PurchaseOrgService } from './Services/purchase-org/purchase-org.service';
import { CompanyCodeService } from './Services/company-code/company-code.service';
import { HttpClientModule } from '@angular/common/http';
import { PoTypeService } from './Services/po-type.service';
import { EditPurchaseOrgComponent } from './components/purchase-org/edit-purchase-org/edit-purchase-org.component';
import { ErrorPoTypeComponent } from './components/po-type/error-po-type/error-po-type.component';
<<<<<<< HEAD
import { PlantDataService } from './Services/plant-data/plant-data.service';
import { EditCompanyCodeComponent } from './components/company-code/edit-company-code/edit-company-code/edit-company-code.component';
import { EditPlantDataComponent } from './components/plant-data/edit-plant-data/edit-plant-data.component';
=======
import { UpdatePoTypeComponent } from './components/po-type/update-po-type/update-po-type.component';
import { PaymentTermService } from './Services/payment-term/payment-term.service';
import { EditPaymentTermComponent } from './components/payment-terms/edit-payment-term/edit-payment-term.component';
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22


@NgModule({
  declarations: [
    AddCompanyCodeComponent,
    CompanyCodeListComponent,
    AddPoTypeComponent,
    PoTypeListComponent,
    AddPaymentTermsComponent,
    PaymentTermsListComponent,
    AddPurchaseOrgComponent,
    PurchaseOrgListComponent,
    AddPlantDataComponent,
    PlantDataListComponent,
    EditPurchaseOrgComponent,
    ErrorPoTypeComponent,
<<<<<<< HEAD
    EditCompanyCodeComponent,
    EditPlantDataComponent,
=======
    UpdatePoTypeComponent,
    EditPaymentTermComponent,
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
  ],
  imports: [
    CommonModule,
    SettingRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
<<<<<<< HEAD
  providers:[PurchaseOrgService, CompanyCodeService,PoTypeService,PlantDataService]
=======
  providers:[PurchaseOrgService, CompanyCodeService,PoTypeService,PaymentTermService]
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
})
export class SettingModule { }
