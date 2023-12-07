import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CompanyCodeListComponent } from './components/company-code/company-code-list/company-code-list.component';
import { AddCompanyCodeComponent } from './components/company-code/add-company-code/add-company-code.component';
import { AddPaymentTermsComponent } from './components/payment-terms/add-payment-terms/add-payment-terms.component';
import { PaymentTermsListComponent } from './components/payment-terms/payment-terms-list/payment-terms-list.component';
import { PoTypeListComponent } from './components/po-type/po-type-list/po-type-list.component';
import { AddPoTypeComponent } from './components/po-type/add-po-type/add-po-type.component';
import { AddPurchaseOrgComponent } from './components/purchase-org/add-purchase-org/add-purchase-org.component';
import { PurchaseOrgListComponent } from './components/purchase-org/purchase-org-list/purchase-org-list.component';
import { AddPlantDataComponent } from './components/plant-data/add-plant-data/add-plant-data.component';
import { PlantDataListComponent } from './components/plant-data/plant-data-list/plant-data-list.component';
import { EditPurchaseOrgComponent } from './components/purchase-org/edit-purchase-org/edit-purchase-org.component';
// import { ErrorPoTypeComponent } from './components/po-type/error-po-type/error-po-type.component';
import { UpdatePoTypeComponent } from './components/po-type/update-po-type/update-po-type.component';
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

const routes: Routes = [
  {
    path:'company-code-list',
    component:CompanyCodeListComponent
  },
  {
    path:'add-company-code',
    component:AddCompanyCodeComponent
  },
  {
    path:'payment-terms-list',
    component:PaymentTermsListComponent
  },
  {
    path:'add-payment-terms',
    component:AddPaymentTermsComponent
  },
  {
    path:'edit-payment-term/:id',
    component:EditPaymentTermComponent
  },
  {
    path:'add-po-type',
    component:AddPoTypeComponent
  },
  {
    path:'po-type-list',
    component:PoTypeListComponent
  },
  {
    path:'update-po-type/:id',
    component:UpdatePoTypeComponent
  },
  {
    path:'add-purchase-org',
    component:AddPurchaseOrgComponent
  },
  {
    path:'purchase-org-list',
    component:PurchaseOrgListComponent
  },
  {
    path:'edit-purchase-org/:id',
    component:EditPurchaseOrgComponent
  },
  {
    path:'add-plant-data',
    component:AddPlantDataComponent
  },{
    path:'plant-data-list',
    component:PlantDataListComponent
  },{
    path:'distribution-channel-list',
    component:DistributionChannelListComponent
  },
  {
    path:'add-distribution-channel',
    component:AddDistributionChannelComponent
  },
  {
    path:'divion-list',
    component:DivionListComponent
  },
  {
    path:'add-divion-list',
    component:AddDivionComponent
  },
  {
    path:'modeOf-transport-list',
    component:ModeOfTransportListComponent
  },
  {
    path:'add-modeOf-transport',
    component:AddModeOfTransportComponent
  },
  {
    path:'order-status-list',
    component:OrderStatusListComponent
  },
  {
    path:'add-order-status',
    component:AddOrderStatusComponent
  },
  {
    path:'customer-account-list',
    component:CustomerAccListComponent
  },
  {
    path:'add-customer-account',
    component:AddCustomerAccComponent
  },{
    path:'billing-block-list',
    component:BillingBlockListComponent
  },
  {
    path:'add-billing-block',
    component:AddBillingBlockComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
