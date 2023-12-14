import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthrRoutingModule } from './authr-routing.module';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthrService } from './services/authr/authr.service';


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    AuthrRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule
  ],
  providers:[AuthrService],
  exports:[LoginComponent]
})
export class AuthrModule { }
