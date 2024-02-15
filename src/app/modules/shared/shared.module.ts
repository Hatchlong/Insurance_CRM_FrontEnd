import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SideNavComponent } from './components/side-nav/side-nav.component';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatIconModule

  ],
  exports:[SideNavComponent]
})
export class SharedModule { }
