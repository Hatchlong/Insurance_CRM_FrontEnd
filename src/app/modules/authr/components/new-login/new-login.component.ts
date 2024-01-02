import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-login',
  templateUrl: './new-login.component.html',
  styleUrls: ['./new-login.component.css']
})
export class NewLoginComponent {


  loginForm:any=FormGroup
  isSubmitted:any=true

  constructor(private fb:FormBuilder){}

  createLogInFormFields() {
    this.loginForm = this.fb.group({
      userEmail: ['', [Validators.required]],
      password: ['', [Validators.required]],
    })
  }

}
