import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatusService } from '../../../Services/order-status/order-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order-status-list',
  templateUrl: './order-status-list.component.html',
  styleUrls: ['./order-status-list.component.css']
})
export class OrderStatusListComponent implements OnInit {


  orderStatusDetail: any = []
  selectAll: any = false

  constructor(
    private router: Router,
    private orderStatusSer: OrderStatusService,
    private _snackBar: MatSnackBar
  ) {

  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllDetails()
  }

  //get all details of order status

  async getAllDetails() {
    try {
      const result: any = await this.orderStatusSer.getAllOrderStatusDetails()
      console.log(result);
      if (result.status === '1') {
        this.orderStatusDetail = result.data
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
      });;
    }
  }

  selectdata(event: any) {
    console.log(event.target.checked);
    this.orderStatusDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.orderStatusDetail[index].check = event.target.checked
    const findSelect = this.orderStatusDetail.find((el: any) => el.check === false)
    console.log(findSelect);

    if (findSelect) {

      this.selectAll = false

    }
    else {
      this.selectAll = true
    }
  }


  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.orderStatusSer.updatedOrderStatusDetails(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllDetails()
        return;
      }
      if (result.status === '0') {
        this._snackBar.open("Deleted Unsuccessfully", '', {
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
