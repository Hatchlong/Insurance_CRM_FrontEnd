import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplyPolicyRoutingModule } from './apply-policy-routing.module';
import { ApplyPolicyListComponent } from './components/apply-policy/apply-policy-list/apply-policy-list.component';
import { AddApplyPolicyComponent } from './components/apply-policy/add-apply-policy/add-apply-policy.component';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { ApplyPolicyService } from './services/apply-policy/apply-policy.service';
import { EditApplyPolicyComponent } from './components/apply-policy/edit-apply-policy/edit-apply-policy.component';


@NgModule({
  declarations: [
    ApplyPolicyListComponent,
    AddApplyPolicyComponent,
    EditApplyPolicyComponent
  ],
  imports: [
    CommonModule,
    ApplyPolicyRoutingModule,
    SharedModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDialogModule

  ],
  providers:[ApplyPolicyService]
})
export class ApplyPolicyModule { }
