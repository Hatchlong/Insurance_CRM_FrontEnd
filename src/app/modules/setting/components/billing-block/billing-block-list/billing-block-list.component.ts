import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingBlockService } from '../../../Services/billing-block/billing-block.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as XLSX from 'xlsx';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-billing-block-list',
  templateUrl: './billing-block-list.component.html',
  styleUrls: ['./billing-block-list.component.css']
}) 
export class BillingBlockListComponent implements OnInit {

  billingBlockDeatil: any = []
  selectAll: any = false
  selectedFile: any = '';
  allBillingBlockDetails: any = []
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "billingBlock": "HAT123",
    "description": "Hatchlong",
  }


  constructor(
    private router: Router,
    private billingBlockSer: BillingBlockService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllBillingBlockDetails(this.page, this.itemsPerPage)
  }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.billingBlockDeatil.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.billingBlockDeatil[index].check = event.target.checked
    const findSelect = this.billingBlockDeatil.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  //get data in list
  async getAllBillingBlockDetails(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.billingBlockSer.getAllBillingBlockPage(page, itemsPerPage);
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allBillingBlockDetails = result.data
        this.billingBlockDeatil = result.data;
        if (result.data.length === 0) {
          this.selectAll = false
        }
      }
    } catch (error: any) {

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
      const result: any = await this.billingBlockSer.updateBillingBlockMany(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllBillingBlockDetails(this.page, this.itemsPerPage)
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
      const result: any = await this.billingBlockSer.fileUploadBillingBlock(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllBillingBlockDetails(this.page, this.itemsPerPage)
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
    this.billingBlockDeatil.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    this.billingBlockSer.exportToExcel(this.billingBlockDeatil, 'billing block', 'Sheet1');
  }

  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.billingBlockSer.exportToExcel(sampleRecord, 'billing_block', 'Sheet1');
  }

  async handleDeleteMuliple() {
    try {
      const filterData = this.billingBlockDeatil.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.billingBlockSer.updateBillingBlockMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllBillingBlockDetails(this.page, this.itemsPerPage)
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


  handleFilter(event: any) {
    if (!event.target.value) {
      this.billingBlockDeatil = this.allBillingBlockDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allBillingBlockDetails.filter((obj: any) => ((obj.billingBlock.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.description.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.billingBlockDeatil = isStringIncluded
  }



  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page-1) * this.itemsPerPage;
    this.getAllBillingBlockDetails(records, this.itemsPerPage)
  }


}
