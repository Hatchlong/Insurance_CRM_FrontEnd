import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-customer-account-ag',
  templateUrl: './edit-customer-account-ag.component.html',
  styleUrls: ['./edit-customer-account-ag.component.css']
})
export class EditCustomerAccountAGComponent {
 
  
  customerAcc: any = FormGroup
  isSubmitted: any = false
  customerId: any = ''


  constructor(private fb: FormBuilder,
    private router : Router,
    private customerAccountSer: CustomerAccountAGService,
    private activeRouter:ActivatedRoute

    ) { }

  ngOnInit(): void {
    this.customerId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.customerId)
    this.getSingleCustomerAccountDetails()
    this.channeldata()
  }

  channeldata() {
    this.customerAcc = this.fb.group({
      _id: ['', Validators.required],
      customerAccountAG: ['', Validators.required],
      descriptionCAAG: ['', Validators.required]
    });
    console.warn(this.customerAcc.value)

  }

  async getSingleCustomerAccountDetails(){
    try {
      const result: any = await this.customerAccountSer.singleCustomerAccount(this.customerId);
    if (result.status === '1') {
      this.customerAcc.patchValue(result.data);
    }
    } catch (error) {
      console.log(error)
    }
  }

  
  async submitData() {
    try {
      this.isSubmitted = true
      if (this.customerAcc.invalid)
        return
      const result: any = await this.customerAccountSer.updateCustomerAccount(this.customerAcc.value);
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
