import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from '../../../services/vendor/vendor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-vendor-list',
  templateUrl: './vendor-list.component.html',
  styleUrls: ['./vendor-list.component.css']
})
export class VendorListComponent implements OnInit{

  isShowPadding: any = false
  vendorDetail:any=[]
  allVendorDetail:any=[]
  selectAll: any = false
  
  constructor(private router:Router,
    private _snackBar: MatSnackBar,

    private vendorSer:VendorService){}
    handleSideBar(event: any) {
      this.isShowPadding = event
    }
    nextPage(url: any) {
      this.router.navigate([`${url}`])
    }
    ngOnInit(): void {
        this.getAllVendorDetail()
    }

     //get all detail of agent from the database
  async getAllVendorDetail() {
    try {
      const result: any = await this.vendorSer.getAllVendorDetail()
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.vendorDetail = result.data
        this.allVendorDetail = result.data
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.vendorDetail.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.vendorDetail[index].check = event.target.checked
    const findSelect = this.vendorDetail.find((el: any) => el.check === false)
    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

    //delete single or particular record by the delete icon in every row of data
    async deleteRecords(data: any) {
      try {
        data.isActive = "C"
        const result: any = await this.vendorSer.updateVendorDetail(data);
        if (result.status === '1') {
          this._snackBar.open("Deleted Successfully", '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.getAllVendorDetail()
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
