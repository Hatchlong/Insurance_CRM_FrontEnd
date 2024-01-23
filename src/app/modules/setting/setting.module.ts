import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { PlantDataService } from './Services/plant-data/plant-data.service';
import { EditCompanyCodeComponent } from './components/company-code/edit-company-code/edit-company-code/edit-company-code.component';
import { EditPlantDataComponent } from './components/plant-data/edit-plant-data/edit-plant-data.component';
import { UpdatePoTypeComponent } from './components/po-type/update-po-type/update-po-type.component';
import { PaymentTermService } from './Services/payment-term/payment-term.service';
import { EditPaymentTermComponent } from './components/payment-terms/edit-payment-term/edit-payment-term.component';
import { DistributionChannelListComponent } from './components/distibution-channel/distribution-channel-list/distribution-channel-list.component';
import { AddDistributionChannelComponent } from './components/distibution-channel/add-distribution-channel/add-distribution-channel.component';
import { DivionListComponent } from './components/divion/divion-list/divion-list.component';
import { AddDivionComponent } from './components/divion/add-divion/add-divion.component';
import { ModeOfTransportListComponent } from './components/mode-of-transport/mode-of-transport-list/mode-of-transport-list.component';
import { AddModeOfTransportComponent } from './components/mode-of-transport/add-mode-of-transport/add-mode-of-transport.component';
import { OrderStatusListComponent } from './components/order-status/order-status-list/order-status-list.component';
import { AddOrderStatusComponent } from './components/order-status/add-order-status/add-order-status.component';
import { CustomerAccListComponent } from './components/customer-account-AG/customer-acc-list/customer-acc-list.component';
import { AddCustomerAccComponent } from './components/customer-account-AG/add-customer-acc/add-customer-acc.component';
import { BillingBlockListComponent } from './components/billing-block/billing-block-list/billing-block-list.component';
import { AddBillingBlockComponent } from './components/billing-block/add-billing-block/add-billing-block.component';
import { AddSalesOrgComponent } from './components/sales-org/add-sales-org/add-sales-org.component';
import { SalesOrgListComponent } from './components/sales-org/sales-org-list/sales-org-list.component';
import { AddIncoTermComponent } from './components/inco-term/add-inco-term/add-inco-term.component';
import { IncoTermListComponent } from './components/inco-term/inco-term-list/inco-term-list.component';
import { EditDivionComponent } from './components/divion/edit-divion/edit-divion.component';
import { EditDistibutionChannelComponent } from './components/distibution-channel/edit-distibution-channel/edit-distibution-channel.component';
import { DivionService } from './Services/divion/divion.service';
import { DistibutionChannelService } from './Services/distibution-channel/distibution-channel.service';
import { EditCustomerAccountAGComponent } from './components/customer-account-AG/edit-customer-account-ag/edit-customer-account-ag.component';
import { ModeOfTransportService } from './Services/mode-of-transport/mode-of-transport.service';
import { EditModeOfTransportComponent } from './components/mode-of-transport/edit-mode-of-transport/edit-mode-of-transport.component';
import { EditOrderStatusComponent } from './components/order-status/edit-order-status/edit-order-status.component';
import { OrderStatusService } from './Services/order-status/order-status.service';
import { BillingBlockService } from './Services/billing-block/billing-block.service';
import { EditBillingBlockComponent } from './components/billing-block/edit-billing-block/edit-billing-block.component';
import { IncTermService } from './Services/inc-term/inc-term.service';
import { EditIncoTermComponent } from './components/inco-term/edit-inco-term/edit-inco-term.component';
import { EditSalesOrgComponent } from './components/sales-org/edit-sales-org/edit-sales-org.component';
import { SalesOrgService } from './Services/sales-org/sales-org.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { SharedModule } from '../shared/shared.module';
import { FilterPipesPipe } from './Services/filter/filter-pipes.pipe';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DirectiveDirective } from './Services/directive/directive.directive';
import { ViewImageComponent } from './components/view-image/view-image.component';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
<<<<<<< HEAD
import { FieldsetModule } from "primeng/fieldset"; 

=======
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
>>>>>>> 4032d9c7157e5e5b7798657b36c1934793a7eaa1
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
    EditCompanyCodeComponent,
    EditPlantDataComponent,
    UpdatePoTypeComponent,
    EditPaymentTermComponent,
    DistributionChannelListComponent,
    AddDistributionChannelComponent,
    DivionListComponent,
    AddDivionComponent,
    ModeOfTransportListComponent,
    AddModeOfTransportComponent,
    OrderStatusListComponent,
    AddOrderStatusComponent,
    CustomerAccListComponent,
    AddCustomerAccComponent,
    BillingBlockListComponent,
    AddBillingBlockComponent,
    AddSalesOrgComponent,
    SalesOrgListComponent,
    AddIncoTermComponent,
    IncoTermListComponent,
    EditDivionComponent,
    EditDistibutionChannelComponent,
    EditCustomerAccountAGComponent,
    EditModeOfTransportComponent,
    EditOrderStatusComponent,
    EditBillingBlockComponent,
    EditIncoTermComponent,
    EditSalesOrgComponent,
    FilterPipesPipe,
    DirectiveDirective,
    ViewImageComponent
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
    PaginationModule.forRoot(),
    FormsModule,
    SharedModule,
    TimepickerModule.forRoot(),
    MatDialogModule,
<<<<<<< HEAD
    FieldsetModule
=======
    NgIdleKeepaliveModule
>>>>>>> 4032d9c7157e5e5b7798657b36c1934793a7eaa1
  ],
  providers: [ PurchaseOrgService, CompanyCodeService, PoTypeService, PlantDataService, PaymentTermService, DivionService, DistibutionChannelService, ModeOfTransportService, OrderStatusService, BillingBlockService, IncTermService, SalesOrgService ]
})
export class SettingModule { }
