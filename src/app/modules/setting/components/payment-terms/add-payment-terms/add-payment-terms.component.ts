import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentTermService } from '../../../Services/payment-term/payment-term.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-payment-terms',
  templateUrl: './add-payment-terms.component.html',
  styleUrls: ['./add-payment-terms.component.css']
})
export class AddPaymentTermsComponent {

  payTem: any = FormGroup
  isSubmitted: any = false
  isShowPadding:any = false;
  constructor(
    private fb: FormBuilder,
    private paymentSer: PaymentTermService,
    private router: Router,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.code()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  code() {
    this.payTem = this.fb.group({
      paymentTerm: ['', [Validators.required,Validators.minLength(6), Validators.maxLength(6)]],
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
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/payment-terms-list']);
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }
}
