import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InventoryRoutingModule } from './inventory-routing.module';
import { InventoryListComponent } from './components/inventory/inventory-list/inventory-list.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { EditInventoryComponent } from './components/inventory/edit-inventory/edit-inventory.component';


@NgModule({
  declarations: [
    InventoryListComponent,
    EditInventoryComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    ReactiveFormsModule,
    SharedModule,
    NgIdleKeepaliveModule
  
  ]
})
export class InventoryModule { }
