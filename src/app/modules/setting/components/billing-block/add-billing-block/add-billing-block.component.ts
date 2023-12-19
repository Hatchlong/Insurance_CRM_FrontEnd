import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillingBlockService } from '../../../Services/billing-block/billing-block.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-billing-block',
  templateUrl: './add-billing-block.component.html',
  styleUrls: ['./add-billing-block.component.css']
})
export class AddBillingBlockComponent {


  billing: any = FormGroup
  isSubmitted: any = false

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private billingBlockSer: BillingBlockService
  ) { }

  ngOnInit(): void {
    this.channeldata()
  }

  channeldata() {
    this.billing = this.fb.group({
      billingBlock: ['', Validators.required],
      description: ['', Validators.required]
    })
  }
  async addCustomerAcc() {
    try {
      this.isSubmitted = true
      console.log(this.billing);
      if (this.billing.invalid)
      return Swal.fire({
      title: 'warning',
      text: 'All Field Are Required',
      icon: 'warning',
      showCancelButton: true
    })
      const result: any = await this.billingBlockSer.createBillingBlock(this.billing.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Billing Block Processed Successfully ',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/billing-block-list'])
        return
      }
      if (result.status === '0')
        return alert(result.message);

    } catch (error) {
      console.error(error);

    }


  }
}
