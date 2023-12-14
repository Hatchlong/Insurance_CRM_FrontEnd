import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';

@Component({
  selector: 'app-add-customer-acc',
  templateUrl: './add-customer-acc.component.html',
  styleUrls: ['./add-customer-acc.component.css']
})
export class AddCustomerAccComponent implements OnInit {


  customerAcc: any = FormGroup
  isSubmitted: any = false

  constructor(private fb: FormBuilder,
    private router : Router,
    private customerAccountSer: CustomerAccountAGService
    ) { }

  ngOnInit(): void {
    this.channeldata() 
  }

  channeldata() {
    this.customerAcc = this.fb.group({
      customerAccountAG: ['', Validators.required],
      descriptionCAAG: ['', Validators.required]
    });
    console.warn(this.customerAcc.value)

  }
  
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.customerAcc.invalid)
        return
      const result: any = await this.customerAccountSer.createCustomerAccountDetails(this.customerAcc.value);
      console.log(result)
      if (result.status === '1') {
        alert(result.message);
        this.router.navigate(['/settings/customer-account-list'])
        return;
      }
      if (result.status === '0')
        return alert(result.message)
    } catch (error) {
      console.log(error)

    }
  }




}
