import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { VendorListComponent } from './components/vendor/vendor-list/vendor-list.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { AddVendorComponent } from './components/vendor/add-vendor/add-vendor.component';
import { CustomerListComponent } from './components/customer-master/customer-list/customer-list.component';
import { AddCustomerComponent } from './components/customer-master/add-customer/add-customer.component';
<<<<<<< HEAD
import { EditVendorComponent } from './components/vendor/edit-vendor/edit-vendor.component';
=======
import { EditProductComponent } from './components/product/edit-product/edit-product.component';
>>>>>>> 835ab9e2217e270ccfd0d1dcabe22e3f035eeaab

const routes: Routes = [{
  path:'product',
  component:ProductListComponent
},{
  path:'add-product',
  component:AddProductComponent
},{
  path:'vendor',
  component:VendorListComponent
},{
  path:'add-vendor',
  component:AddVendorComponent
},
{
  path: 'edit-vendor/:id',
  component:EditVendorComponent
},
{
  path:'customer-list',
  component:CustomerListComponent
},{
  path:'add-customer',
  component:AddCustomerComponent
},{
  path:'edit-product/:id',
  component:EditProductComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
