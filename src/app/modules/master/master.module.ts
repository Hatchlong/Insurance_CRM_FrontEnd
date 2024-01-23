import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';

import { AddProductComponent } from './components/product/add-product/add-product.component';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { AddVendorComponent } from './components/vendor/add-vendor/add-vendor.component';
import { VendorListComponent } from './components/vendor/vendor-list/vendor-list.component';
import { HttpClientModule } from '@angular/common/http';
import { CountryService } from './services/country/country.service';
import { AddCustomerComponent } from './components/customer-master/add-customer/add-customer.component';
import { CustomerListComponent } from './components/customer-master/customer-list/customer-list.component';
import { EditVendorComponent } from './components/vendor/edit-vendor/edit-vendor.component';
import { VendorService } from './services/vendor/vendor.service';
import { ProductService } from './services/product/product.service';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { EditCustomerComponent } from './components/customer-master/edit-customer/edit-customer.component';
import { CustomerService } from './services/customer/customer.service';
import { FilterPipe } from './services/filter/filter.pipe';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

@NgModule({
  declarations: [
    AddProductComponent,
    ProductListComponent,
    AddVendorComponent,
    VendorListComponent,
    AddCustomerComponent,
    CustomerListComponent,
    EditVendorComponent,
    EditProductComponent,
    EditCustomerComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    SharedModule,
    MatTabsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    HttpClientModule,
    PaginationModule.forRoot(),
    FormsModule,
    NgIdleKeepaliveModule
  ],
  providers:[CountryService, VendorService, ProductService,CustomerService]
})
export class MasterModule { }
