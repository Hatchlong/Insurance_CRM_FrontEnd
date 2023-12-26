import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderStatusService } from '../../../Services/order-status/order-status.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-order-status',
  templateUrl: './add-order-status.component.html',
  styleUrls: ['./add-order-status.component.css']
})
export class AddOrderStatusComponent {

  order: any = FormGroup
  isSubmitted: any = false
  isShowPadding:any = false;
  constructor(
    private fb: FormBuilder,
    private orderStatusSer: OrderStatusService,
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
    this.order = this.fb.group({
      orderStatus: ['', Validators.required],
      description: ['', Validators.required]

    })
  }

  async addOrder() {
    try {
      this.isSubmitted = true
      console.log(this.order);
      if (this.order.invalid)
        return
      const result: any = await this.orderStatusSer.createOrderStatus(this.order.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/order-status-list/'])
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
