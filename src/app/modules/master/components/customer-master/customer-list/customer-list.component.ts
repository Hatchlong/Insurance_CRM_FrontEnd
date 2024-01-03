import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit{

  isShowPadding:any = false
  customerDetails:any=[]
  selectAll: any;
  allCustomerDetails:any=[]

  constructor(
    private router:Router,
    private customerSer:CustomerService,
    private _snackBar: MatSnackBar

  ){

  }
  ngOnInit(): void {
      this.getCustomerDetail()
  }
  nextPage(url: any){
    this.router.navigate([`${url}`])
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.customerDetails.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.customerDetails[index].check = event.target.checked
    const findSelect = this.customerDetails.find((el: any) => el.check === false)
    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  handleFilter(event:any){
    if(!event.target.value){
      this.customerDetails = this.allCustomerDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allCustomerDetails.filter((obj:any) => ((obj.customerId.toUpperCase()).includes(event.target.value.toUpperCase()) ));
    this.customerDetails = isStringIncluded
  }

 

  async getCustomerDetail() {
    try {
      const result: any = await this.customerSer.getAllCustomerDetails()
      console.log(result);
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
       
        this.customerDetails = result.data
        this.allCustomerDetails=result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
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
