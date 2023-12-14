import { Component, EventEmitter, Output, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthrService } from '../../services/authr/authr.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterViewInit {
  loginFormGroup: any = FormGroup;
  registerFormGroup: any = FormGroup;
  @Output() isShowSide = new EventEmitter<any>();
  isActive:any = false;
  constructor(
    private fb: FormBuilder,
    private userSer: AuthrService,
    private router: Router
  ) { 
  }

  ngOnInit(): void {
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
  //     console.log(loginHeader, 'kkkk')
  //   loginHeader.addEventListener("click", () => {
  //     wrapper.classList.add("active");
  //   });
  //   signupHeader.addEventListener("click", () => {
  //     console.log('jjjj')
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

  handleHeader(name:any){
    if(name === 'Signup'){
      this.isActive = true
    }else{
      this.isActive = false
    }
  }


  async signuHandle() {
    console.log(this.registerFormGroup.value)
    try {
      if (this.registerFormGroup.invalid) {
        return alert('please fill all the fields');
      }
      const result: any = await this.userSer.createUser(this.registerFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        this.registerFormGroup.reset();
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: result.message,
          showConfirmButton: false,
          timer: 1500
        })
        const wrapper: any = document.querySelector(".wrapper");
        wrapper.classList.add("active");
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }
  async loginHandle() {
    console.log(this.loginFormGroup.value)
    try {
      if (this.loginFormGroup.invalid) {
        return alert('please fill all the fields');
      }
      const result: any = await this.userSer.loginUser(this.loginFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        this.isShowSide.emit('true')
        const token = result.token.split('.');
        const userDetails: any = JSON.parse(atob(token[1]));
        localStorage.setItem('userName', userDetails.userName)
        localStorage.setItem('userId', userDetails.userId)
        localStorage.setItem('token', result.token)
        localStorage.setItem('loginActive', 'true')
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Successfully Login',
          showConfirmButton: false,
          timer: 1500
        })
        this.loginFormGroup.reset()
        this.router.navigate(['/master/product'])
      }
    } catch (error: any) {
      console.error(error);
      Swal.fire({
        position: 'top-end',
        icon: 'error',
        title: error.error.message,
        showConfirmButton: false,
        timer: 1500
      })
    }
  }

}
