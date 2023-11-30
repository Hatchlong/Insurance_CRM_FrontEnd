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
import { ErrorPoTypeComponent } from './components/po-type/error-po-type/error-po-type.component';
import { UpdatePoTypeComponent } from './components/po-type/update-po-type/update-po-type.component';
import { EditPaymentTermComponent } from './components/payment-terms/edit-payment-term/edit-payment-term.component';

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
    path:'error-po-type',
    component:ErrorPoTypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }
