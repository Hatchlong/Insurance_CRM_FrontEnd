import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthrRoutingModule } from './authr-routing.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login/login.component';
import { RegisterComponent } from './components/register/register/register.component';
import { AuthrService } from './services/authr/authr.service';
import { NewLoginComponent } from './components/new-login/new-login/new-login.component';
import { ChangePasswordComponent } from './components/change-password/change-password/change-password.component';
import { ForgetPasswordComponent } from './components/forget-password/forget-password/forget-password.component';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NewLoginComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent
  ],
  imports: [
    CommonModule,
    AuthrRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    MatSnackBarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatDividerModule,
    MatMenuModule,
    MatTabsModule,
    FormsModule,
   
  ],
  exports:[LoginComponent],
  providers:[AuthrService]
})
export class AuthrModule { }
