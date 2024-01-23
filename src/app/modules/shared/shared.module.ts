import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { AuthrService } from './services/authr/authr.service';
import { HttpClientModule } from '@angular/common/http';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';



@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    HttpClientModule,
    NgIdleKeepaliveModule
  ],
  exports:[SideNavComponent],
  providers:[AuthrService]
})
export class SharedModule { }
