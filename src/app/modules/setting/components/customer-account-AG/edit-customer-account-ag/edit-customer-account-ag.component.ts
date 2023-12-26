import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-customer-account-ag',
  templateUrl: './edit-customer-account-ag.component.html',
  styleUrls: ['./edit-customer-account-ag.component.css']
})
export class EditCustomerAccountAGComponent {
 
  
  customerAcc: any = FormGroup;
  isSubmitted: any = false
  customerId: any = '';
  isShowPadding:any = false;
  constructor(
    private fb: FormBuilder,
    private customerAccountSer: CustomerAccountAGService,
    private router: Router,
    private activeRouter:ActivatedRoute,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.customerId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.customerId)
    this.getSingleCustomerAccountDetails()
    this.channeldata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  channeldata() {
    this.customerAcc = this.fb.group({
      _id: ['', Validators.required],
      customerAccountAG: ['', Validators.required],
      descriptionCAAG: ['', Validators.required]
    });

  }
 
  async getSingleCustomerAccountDetails(){
    try {
      const result: any = await this.customerAccountSer.singleCustomerAccount(this.customerId);
    if (result.status === '1') {
      this.customerAcc.patchValue(result.data);
    }
    } catch (error:any) {
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

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.customerAcc.invalid)
      return 
      const result: any = await this.customerAccountSer.updateCustomerAccount(this.customerAcc.value)
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
    } catch (error:any) {
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
