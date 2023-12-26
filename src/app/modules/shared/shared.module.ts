import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SideNavComponent } from './side-nav/side-nav.component';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [
    SideNavComponent
  ],
  imports: [
    CommonModule,
    MatIconModule
  ],
  exports:[SideNavComponent]
})
export class SharedModule { }
