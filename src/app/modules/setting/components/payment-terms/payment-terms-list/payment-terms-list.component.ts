import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentTermService } from '../../../Services/payment-term/payment-term.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-payment-terms-list',
  templateUrl: './payment-terms-list.component.html',
  styleUrls: ['./payment-terms-list.component.css']
})
export class PaymentTermsListComponent implements OnInit {

  paymentDetails: any = []
  selectAll: any = false
  selectedFile: any = ''; 
  allPaymentDetails:any = []


  constructor(
    private router: Router,
    private paymentSer: PaymentTermService,
    private _snackBar: MatSnackBar
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  ngOnInit(): void {
    this.getAllPayment()
  }

  selectdata(event: any) {
    console.log(event.target.checked);
    this.paymentDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.paymentDetails[index].check = event.target.checked
    const findSelect = this.paymentDetails.find((el: any) => el.check === false)
    console.log(findSelect);

    if (findSelect) {

      this.selectAll = false

    }
    else {
      this.selectAll = true
    }
  }


  async getAllPayment() {
    try {
      const result: any = await this.paymentSer.getAllPaymentTerm();
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.allPaymentDetails=result.data
        this.paymentDetails = result.data;
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

  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.paymentSer.updatePaymentTerm(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPayment()
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
     
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  
  handleFilter(event:any){
    if(!event.target.value){
      this.paymentDetails = this.allPaymentDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allPaymentDetails.filter((obj:any) => ((obj.paymentTerm.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.description.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.paymentDetails = isStringIncluded
  }

}
