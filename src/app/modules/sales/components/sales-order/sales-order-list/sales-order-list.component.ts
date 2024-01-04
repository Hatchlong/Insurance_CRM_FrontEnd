import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesOrderService } from '../../../services/sales-order/sales-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.css']
})
export class SalesOrderListComponent implements OnInit{

  isShowPadding:any = false;
  salesOrderDetail:any=[]

  constructor(
    private router:Router,
    private salesOrderSer:SalesOrderService,
    private _snackBar: MatSnackBar

  ){}
  ngOnInit(): void {
      this.getSalesOrderDetail()
  }
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  //get all details

  async getSalesOrderDetail(){
    try {
      const result:any= await this.salesOrderSer.getAllSalesOrderDetails()
      if (result.status==='1') {
        this.salesOrderDetail=result.data
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
