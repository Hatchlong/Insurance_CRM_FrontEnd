import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './components/product/product-list/product-list.component';
import { VendorListComponent } from './components/vendor/vendor-list/vendor-list.component';
import { AddProductComponent } from './components/product/add-product/add-product.component';
import { AddVendorComponent } from './components/vendor/add-vendor/add-vendor.component';

const routes: Routes = [{
  path: '',
  redirectTo:'product',
  pathMatch: 'full'
},{
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
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
