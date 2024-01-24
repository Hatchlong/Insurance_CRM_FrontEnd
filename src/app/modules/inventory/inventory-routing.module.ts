import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
import { EditInventoryComponent } from './components/inventory/edit-inventory/edit-inventory.component';

const routes: Routes = [
  {
    path:'inventory-list',
    component:InventoryListComponent
  },
  {
    path:'edit-inventory',
    component:EditInventoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
