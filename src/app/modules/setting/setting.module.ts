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
    HttpClientModule
  ],
  providers:[PurchaseOrgService, CompanyCodeService,PoTypeService]
})
export class SettingModule { }
