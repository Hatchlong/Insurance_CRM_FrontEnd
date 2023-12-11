import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentTermService } from '../../../Services/payment-term/payment-term.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-payment-terms',
  templateUrl: './add-payment-terms.component.html',
  styleUrls: ['./add-payment-terms.component.css']
})
export class AddPaymentTermsComponent {

  payTem: any = FormGroup
  isSubmitted: any = false

  constructor(
    private fb: FormBuilder,
    private paymentSer: PaymentTermService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.payTem = this.fb.group({
      paymentTerm: ['', Validators.required],
      description: ['', Validators.required],
      dayLimit: ['', Validators.required],
      fixedBaseLineDate: ['', Validators.required],
      additionalBaselineDataCalculation: ['', Validators.required],
      defaultBaselineDate: ['', Validators.required],
      accountType: ['', Validators.required]

    })
  }

  //submit all data into database

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.payTem.invalid)
        return
      const result: any = await this.paymentSer.createPaymentTerm(this.payTem.value);
      console.log(result)
      if (result.status === '1') {
        alert(result.message);
        this.router.navigate(['/settings/payment-terms-list']);
        return;
      }
      if (result.status === '0')
        return alert(result.message);
    } catch (error) {
      console.error(error)
    }
  }


  //   async addCode() {
  //     try {
  //       if (this.payTem.invalid) {
  //         Swal.fire({
  //           title: 'warning',
  //           text: 'All Field are Required',
  //           icon: 'warning',
  //           showCancelButton: true
  //         })
  //       }
  //       const result: any = await this.paymentSer.createPaymentTerm(this.purTem.value)
  //       console.log(result);
  //       if (result.status === '1') {
  //         Swal.fire({
  //           title: 'success',
  //           text: 'Successfully Submitted',
  //           icon: 'success',
  //           showCancelButton: true
  //         })
  //         this.router.navigate(['/settings/payment-terms-list']);
  //         return;
  //       }
  //       if (result.status === '0') {
  //         Swal.fire({
  //           title: 'warning',
  //           text: 'Failed',
  //           icon: 'warning',
  //           showCancelButton: true
  //         })

  //       }
  //     } catch (error) {
  //       console.error(error);

  //     }
  //     console.log(this.purTem);

  //   }
}
