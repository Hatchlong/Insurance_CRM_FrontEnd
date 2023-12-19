import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BillingBlockService } from '../../../Services/billing-block/billing-block.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-billing-block',
  templateUrl: './edit-billing-block.component.html',
  styleUrls: ['./edit-billing-block.component.css']
})
export class EditBillingBlockComponent {

  billing: any = FormGroup
  isSubmitted: any = false
  billinBlockId: any = ''

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private billingBlockSer: BillingBlockService,
    private activeRouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.billinBlockId = this.activeRouter.snapshot.paramMap.get('id')
    this.channeldata()
    this.getSingleDetail()
  }

  channeldata() {
    this.billing = this.fb.group({
      _id: ['', Validators.required],
      billingBlock: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  //get single data

  async getSingleDetail() {
    try {
      const result: any = await this.billingBlockSer.singleBillingBlockDetails(this.billinBlockId)
      if (result.status === '1') {
        this.billing.patchValue(result.data)
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }


  }


  //update data
  async addCustomerAcc() {
    try {
      this.isSubmitted = true
      if (this.billing.invalid)
        return
      const result: any = await this.billingBlockSer.updatedBillingBlockDetails(this.billing.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, 'Success', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/billing-block-list/']);
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }

  }




}
