import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';
import { MyProfileComponent } from './components/my-profile/my-profile/my-profile.component';
import { ClearUserComponent } from './components/clear-user/clear-user/clear-user.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password/reset-password.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { AuthrService } from '../authr/services/authr/authr.service';


@NgModule({
  declarations: [
    SideNavComponent,
    MyProfileComponent,
    ClearUserComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule,
    ReactiveFormsModule,
    NgIdleKeepaliveModule,
    MatMenuModule,
    MatDialogModule,

  ], providers: [AuthrService],
  exports: [SideNavComponent]
})
export class SharedModule { }
