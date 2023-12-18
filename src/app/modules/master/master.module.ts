import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterRoutingModule } from './master-routing.module';
import { SharedModule } from '../shared/shared.module';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms'
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
import { ProductService } from './services/product/product.service';
import { EditProductComponent } from './components/product/edit-product/edit-product.component';

@NgModule({
  declarations: [
    AddProductComponent,
    ProductListComponent,
    AddVendorComponent,
    VendorListComponent,
    AddCustomerComponent,
    CustomerListComponent,
    EditProductComponent,
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
    HttpClientModule
  ],
  providers:[CountryService,ProductService]
})
export class MasterModule { }
