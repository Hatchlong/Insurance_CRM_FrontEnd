import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OrderStatusService } from '../../../Services/order-status/order-status.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-order-status-list',
  templateUrl: './order-status-list.component.html',
  styleUrls: ['./order-status-list.component.css']
})
export class OrderStatusListComponent implements OnInit {


  orderStatusDetail: any = []
  selectAll: any = false
  selectedFile: any = '';
  allOrderDetails: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "orderStatus": "delivered",
    "description": "Description 23"
  }

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
    this.getAllorderStatusDetailsPage(this.page, this.itemsPerPage)
  }

  //get all details of order status

  async getAllorderStatusDetailsPage(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.orderStatusSer.getAllorderStatusDetailsPage(page, itemsPerPage)
      console.log(result);
      if (result.status === '1') {
        this.totalItem = result.count
        this.allOrderDetails = result.data
        this.orderStatusDetail = result.data
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
      });;
    }
  }
  // select multiple checkbox
  selectdata(event: any) {
    console.log(event.target.checked);
    this.selectAll = event.target.checked;
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
        this.getAllorderStatusDetailsPage(this.page, this.itemsPerPage)
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
      this.orderStatusDetail = this.allOrderDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allOrderDetails.filter((obj:any) => ((obj.orderStatus.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.description.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.orderStatusDetail = isStringIncluded
  }

 

  // File Upload
  importHandle(inputId: any) {
    inputId.click()
  }


  // File Input
  handleFileData(event: any) {
    console.log(event.target.files[0]);
    this.selectedFile = event.target.files[0];
    this.uploadFile()
  }

  async uploadFile() {
    try {
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.orderStatusSer.fileUploadXlsx(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllorderStatusDetailsPage(this.page, this.itemsPerPage)
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
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

  exportExcel(): void {
    this.orderStatusDetail.map((el: any) => {
      // delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    this.orderStatusSer.exportToExcel(this.orderStatusDetail, 'Order Status', 'Sheet1');
  }


  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.orderStatusSer.exportToExcel(sampleRecord, 'Order Status', 'Sheet1');
  }


  async handleDeleteMuliple() {
    try {
      const filterData = this.orderStatusDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.orderStatusSer.updatedManyorderStatusDetails(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllorderStatusDetailsPage(this.page, this.itemsPerPage)
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
      console.error(error)
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page-1) * this.itemsPerPage;
    this.getAllorderStatusDetailsPage(records, this.itemsPerPage)
  }


}
