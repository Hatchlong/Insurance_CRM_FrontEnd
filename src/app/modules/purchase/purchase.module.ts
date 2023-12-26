import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PurchaseRoutingModule } from './purchase-routing.module';
import { AddPurchaseOrderComponent } from './components/purchase-order/add-purchase-order/add-purchase-order.component';
import { PurchaseOrderListComponent } from './components/purchase-order/purchase-order-list/purchase-order-list.component';
import { AddVendorInvoiceComponent } from './components/vendor-invoice/add-vendor-invoice/add-vendor-invoice.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { AddGoodsReceiptComponent } from './components/goods-receipt/add-goods-receipt/add-goods-receipt.component';
import { GoodsReceiptListComponent } from './components/goods-receipt/goods-receipt-list/goods-receipt-list.component';
import { VendorInvoiceListComponent } from './components/vendor-invoice/vendor-invoice-list/vendor-invoice-list.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    AddPurchaseOrderComponent,
    PurchaseOrderListComponent,
    AddVendorInvoiceComponent,
    AddGoodsReceiptComponent,
    GoodsReceiptListComponent,
    VendorInvoiceListComponent
  ],
  imports: [
    CommonModule,
    PurchaseRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    SharedModule
  ]
}) 
export class PurchaseModule { }
