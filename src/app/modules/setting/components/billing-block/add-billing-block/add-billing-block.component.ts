import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BillingBlockService } from '../../../Services/billing-block/billing-block.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private billingBlockSer: BillingBlockService,
    private _snackBar: MatSnackBar
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
      if (this.billing.invalid)
        return
      const result: any = await this.billingBlockSer.createBillingBlock(this.billing.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/billing-block-list/']);
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
      console.log(error)
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
return
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
