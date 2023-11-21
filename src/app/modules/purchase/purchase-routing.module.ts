import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorInvoiceComponent } from './components/vendor-invoice/add-vendor-invoice/add-vendor-invoice.component';
import { AddPurchaseOrderComponent } from './components/purchase-order/add-purchase-order/add-purchase-order.component';
import { PurchaseOrderListComponent } from './components/purchase-order/purchase-order-list/purchase-order-list.component';

const routes: Routes = [{
  path:"add-vendor-invoice",
  component:AddVendorInvoiceComponent
},{
  path:"add-purchase-order",
  component:AddPurchaseOrderComponent
},{
  path:"purchase-order-list",
  component:PurchaseOrderListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
