import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit{
  isShowPadding:any = false;
  deliveryDetail:any=[]

  constructor(
    private router:Router,
    private deliverySer:DeliveryService,
    private _snackBar: MatSnackBar

  ){}
  ngOnInit(): void {
      this.getAllDeliveryDetail()
  }
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }

  
  handleSideBar(event: any) {
    this.isShowPadding = event
  }
  async getAllDeliveryDetail(){
    try {
      const result:any=await this.deliverySer.getAllDeliveryDetails()
      if (result.status==='1') {
        this.deliveryDetail=result.data
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
