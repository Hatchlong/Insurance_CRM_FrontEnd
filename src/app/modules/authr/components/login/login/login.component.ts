import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthrService } from '../../../services/authr/authr.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  
  loginFormGroup: any = FormGroup
  isSubmitted: any = false
  @Output() isShowSide = new EventEmitter<any>();

  constructor(private fb: FormBuilder,
    private userSer: AuthrService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { 
    this.createLogInFormFields()
  }

  createLogInFormFields() {
    this.loginFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  async loginHandle() {
    this.isSubmitted = true
    try {
      if (this.loginFormGroup.invalid) {
        return
      }
      const result: any = await this.userSer.loginUser(this.loginFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {
        this.isShowSide.emit('true')
        const token = result.token.split('.');
        const userDetails: any = JSON.parse(atob(token[1]));
        localStorage.setItem('userName', userDetails.userName)
        localStorage.setItem('userId', userDetails.userId)
        localStorage.setItem('token', result.token)
        localStorage.setItem('loginActive', 'true')
        this._snackBar.open('Successfully Login', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.loginFormGroup.reset()
        this.router.navigate(['/master/agent-list'])
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      this.isSubmitted = false
      this._snackBar.open(error.error.message, '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

}
