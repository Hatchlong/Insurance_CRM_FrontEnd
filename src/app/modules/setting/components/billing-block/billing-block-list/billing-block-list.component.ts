import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingBlockService } from '../../../Services/billing-block/billing-block.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-billing-block-list',
  templateUrl: './billing-block-list.component.html',
  styleUrls: ['./billing-block-list.component.css']
})
export class BillingBlockListComponent implements OnInit {

  billingBlockDeatil: any = []
  selectAll: any = false


  constructor(
    private router: Router,
    private billingBlockSer: BillingBlockService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getBillingDetails()
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  async getBillingDetails() {
    try {
      const result: any = await this.billingBlockSer.getAllBillingBlockDetails()
      console.log(result);
      if (result.status === '1') {
        this.billingBlockDeatil = result.data
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

  selectdata(event: any) {
    console.log(event.target.checked);
    this.billingBlockDeatil.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.billingBlockDeatil[index].check = event.target.checked
    const findSelect = this.billingBlockDeatil.find((el: any) => el.check === false)
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
      const result: any = await this.billingBlockSer.updatedBillingBlockDetails(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getBillingDetails()
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
