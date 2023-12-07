import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SalesOrderListComponent } from './components/sales-order/sales-order-list/sales-order-list.component';
import { AddSalesOrderComponent } from './components/sales-order/add-sales-order/add-sales-order.component';
import { DeliveryListComponent } from './components/delivery/delivery-list/delivery-list.component';
import { AddDeliveryComponent } from './components/delivery/add-delivery/add-delivery.component';
import { BillingListComponent } from './components/billing/billing-list/billing-list.component';
import { AddBillingComponent } from './components/billing/add-billing/add-billing.component';

const routes: Routes = [
  {
    path:'sales-order-list',
    component:SalesOrderListComponent
  },
  {
    path:'add-sales-order',
    component:AddSalesOrderComponent
  },
  {
    path:'delivery-list',
    component:DeliveryListComponent
  },
  {
    path:'add-delivery',
    component:AddDeliveryComponent
  },
  {
    path:'billing-list',
    component:BillingListComponent
  },
  {
    path:'add-billing',
    component:AddBillingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SalesRoutingModule { }
