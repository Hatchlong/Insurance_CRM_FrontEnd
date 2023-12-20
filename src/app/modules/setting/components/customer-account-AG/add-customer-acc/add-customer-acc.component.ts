import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

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
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.channeldata()
  }

  channeldata() {
    this.customerAcc = this.fb.group({
      customerAccountAG: ['', Validators.required],
      descriptionCAAG: ['', Validators.required]
    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.customerAcc.invalid)
        return
      const result: any = await this.customerAccountSer.createCustomerAccountDetails(this.customerAcc.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/customer-account-list'])
        return
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
