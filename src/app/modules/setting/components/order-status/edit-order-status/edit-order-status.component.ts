import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrderStatusService } from '../../../Services/order-status/order-status.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-order-status',
  templateUrl: './edit-order-status.component.html',
  styleUrls: ['./edit-order-status.component.css']
})
export class EditOrderStatusComponent implements OnInit {
  order: any = FormGroup
  orderStatusId: any = ''
  isSubmitted: any = false
  isShowPadding:any = false;

  constructor(
    private orderStatusSer: OrderStatusService,
    private router: Router,
    private fb: FormBuilder,
    private activeRouter: ActivatedRoute,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.orderStatusId = this.activeRouter.snapshot.paramMap.get('id')
    this.code()
    this.getSingleOrderDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  code() {
    this.order = this.fb.group({
      _id: ['', Validators.required],
      orderStatus: ['', Validators.required],
      description: ['', Validators.required]

    })
  }

  //get single detail

  async getSingleOrderDetail() {
    try {
      const result: any = await this.orderStatusSer.singleOrderStatusDetails(this.orderStatusId)
      if (result.status === '1') {
        this.order.patchValue(result.data)
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

  async addOrder() {
    try {
      this.isSubmitted = true
      if (this.order.invalid) {
        return;

      }
      const result: any = await this.orderStatusSer.updatedOrderStatusDetails(this.order.value)
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
