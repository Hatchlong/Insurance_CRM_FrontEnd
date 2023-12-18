import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-customer-acc',
  templateUrl: './add-customer-acc.component.html',
  styleUrls: ['./add-customer-acc.component.css']
})
export class AddCustomerAccComponent implements OnInit {


  customerAcc: any = FormGroup;
  isSubmitted: any = false
  constructor(
    private fb: FormBuilder,
    private customerAccountSer: CustomerAccountAGService,
    private router: Router
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
      console.log(this.customerAcc);
      if (this.customerAcc.invalid)
      return Swal.fire({
      title: 'warning',
      text: 'All Field Are Required',
      icon: 'warning',
      showCancelButton: true
    })
      const result: any = await this.customerAccountSer.createCustomerAccountDetails(this.customerAcc.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Customer Account AG created successfully ',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/inco-term-list/'])
        return
      }
      if (result.status === '0')
        return alert(result.message);


    } catch (error) {
      console.error(error);

    }
  }

 
}
