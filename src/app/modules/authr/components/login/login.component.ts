import { Component, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthrService } from '../../services/authr/authr.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginFormGroup: any = FormGroup;
  registerFormGroup: any = FormGroup;
  @Output() isShowSide = new EventEmitter<any>();
  isActive: any = false;
  isSubmitted: any = false;
  constructor(
    private fb: FormBuilder,
    private userSer: AuthrService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    const isShowNav = localStorage.getItem('loginActive');
    if (isShowNav === 'true') {
      localStorage.setItem('loginActive', 'true');
    } else {
      localStorage.setItem('loginActive', 'false');
      this.router.navigate(['/authr/login'])
    }
    // this.isShowSide.emit('false')
    this.createFormFields()
    this.createSignUpFormFields()
  }

  ngAfterViewInit(): void {
    // this.changeClassContent()
  }


  // Open Login and Signup
  // changeClassContent() {
  //   const wrapper: any = document.querySelector(".wrapper"),
  //     signupHeader: any = document.querySelector(".signup header"),
  //     loginHeader: any = document.querySelector(".login header");
  //   loginHeader.addEventListener("click", () => {
  //     wrapper.classList.add("active");
  //   });
  //   signupHeader.addEventListener("click", () => {
  //     wrapper.classList.remove("active");
  //   });

  // }

  createFormFields() {
    this.loginFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }


  createSignUpFormFields() {
    this.registerFormGroup = this.fb.group({
      userName: ['', [Validators.required]],
      emailId: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

  handleHeader(name: any) {
    if (name === 'Signup') {
      this.isActive = true
    } else {
      this.isActive = false
    }
  }


  async signuHandle() {
    this.isSubmitted = true
    try {
      if (this.registerFormGroup.invalid) {
        return
      }
      const result: any = await this.userSer.createUser(this.registerFormGroup.value)
      this.isSubmitted = false
      if (result.status === '1') {
        this.registerFormGroup.reset();
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        const wrapper: any = document.querySelector(".wrapper");
        wrapper.classList.add("active");
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
        panelClass: 'app-notification-error'
      });
    }
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
        this.router.navigate(['/master/product'])
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
