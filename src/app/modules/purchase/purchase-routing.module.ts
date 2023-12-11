import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddVendorInvoiceComponent } from './components/vendor-invoice/add-vendor-invoice/add-vendor-invoice.component';
import { AddPurchaseOrderComponent } from './components/purchase-order/add-purchase-order/add-purchase-order.component';
import { PurchaseOrderListComponent } from './components/purchase-order/purchase-order-list/purchase-order-list.component';
import { AddGoodsReceiptComponent } from './components/goods-receipt/add-goods-receipt/add-goods-receipt.component';
import { GoodsReceiptListComponent } from './components/goods-receipt/goods-receipt-list/goods-receipt-list.component';
import { VendorInvoiceListComponent } from './components/vendor-invoice/vendor-invoice-list/vendor-invoice-list.component';

const routes: Routes = [{
  path:"add-vendor-invoice",
  component:AddVendorInvoiceComponent
},{
  path:"add-purchase-order",
  component:AddPurchaseOrderComponent
},{
  path:"purchase-order-list",
  component:PurchaseOrderListComponent
},
{
  path:"add-goods-receipt",
  component:AddGoodsReceiptComponent
},
{
  path:"goods-receipt-list",
  component:GoodsReceiptListComponent
},
{
  path:"add-vendor-invoice",
  component:AddVendorInvoiceComponent
},
{
  path:"vendor-invoice-list",
  component:VendorInvoiceListComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PurchaseRoutingModule { }
