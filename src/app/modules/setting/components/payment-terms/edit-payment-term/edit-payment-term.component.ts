import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PaymentTermService } from '../../../Services/payment-term/payment-term.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-payment-term',
  templateUrl: './edit-payment-term.component.html',
  styleUrls: ['./edit-payment-term.component.css']
})
export class EditPaymentTermComponent {

  payTem: any = FormGroup
  paymentTermId: any = ''
  constructor(
    private fb: FormBuilder,
    private paymentSer: PaymentTermService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.paymentTermId = this.activeRouter.snapshot.paramMap.get('id')
    this.getSinglePayment()
    this.code()
  }

  code() {
    this.payTem = this.fb.group({
      _id: ['', Validators.required],
      paymentTerm: ['', Validators.required],
      description: ['', Validators.required],
      dayLimit: ['', Validators.required],
      fixedBaseLineDate: ['', Validators.required],
      additionalBaselineDataCalculation: ['', Validators.required],
      defaultBaselineDate: ['', Validators.required],
      accountType: ['', Validators.required]

    })
  }

  //get single detail according to id
  async getSinglePayment() {
    try {
      const result: any = await this.paymentSer.singlePaymentTerm(this.paymentTermId)
      console.log(result);
      if (result.status === '1') {
        this.payTem.patchValue(result.data)
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

  //update all data into database

  async submitData() {
    try {
      if (this.payTem.invalid) {
        return
      }
      const result: any = await this.paymentSer.updatePaymentTerm(this.payTem.value);
      console.log(result)
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
