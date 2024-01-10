import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SalesRoutingModule } from './sales-routing.module';
import { DeliveryListComponent } from './components/delivery/delivery-list/delivery-list.component';
import { SalesOrderListComponent } from './components/sales-order/sales-order-list/sales-order-list.component';
import { AddSalesOrderComponent } from './components/sales-order/add-sales-order/add-sales-order.component';


import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatTabsModule} from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddDeliveryComponent } from './components/delivery/add-delivery/add-delivery.component';
import { BillingListComponent } from './components/billing/billing-list/billing-list.component';
import { AddBillingComponent } from './components/billing/add-billing/add-billing.component';
import { SharedModule } from '../shared/shared.module';
import { SalesOrderService } from './services/sales-order/sales-order.service';
import { EditSalesOrderComponent } from './components/sales-order/edit-sales-order/edit-sales-order.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DeliveryService } from './services/delivery/delivery.service';
import { EditDeliveryComponent } from './components/delivery/edit-delivery/edit-delivery.component';
import { DeliverySalesOrderComponent } from './components/sales-order/delivery-sales-order/delivery-sales-order.component';


@NgModule({
  declarations: [
    DeliveryListComponent,
    SalesOrderListComponent,
    AddSalesOrderComponent,
    AddDeliveryComponent,
    BillingListComponent,
    AddBillingComponent,
    EditSalesOrderComponent,
    EditDeliveryComponent,
    DeliverySalesOrderComponent
  ],
  imports: [
    CommonModule,
    SalesRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    SharedModule,
    FormsModule,
    PaginationModule.forRoot(),

    
  ],
  providers:[SalesOrderService,DeliveryService]
})
export class SalesModule { }
