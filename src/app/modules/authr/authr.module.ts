import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthrRoutingModule } from './authr-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { AuthrService } from './services/authr/authr.service';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    AuthrRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule
  ],
  exports:[LoginComponent],
  providers:[AuthrService]
})
export class AuthrModule { }
