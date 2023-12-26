import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-purchase-org-list',
  templateUrl: './purchase-org-list.component.html',
  styleUrls: ['./purchase-org-list.component.css']
})
export class PurchaseOrgListComponent implements OnInit {
  purchaseOrgDetails: any = []
  allPurchaseOrgDetails: any = []
  selectAll: any = false;
  selectedFile: any = false;
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "purchase_org": "POR12",
    "purchase_org_Description": "des12",
    "companycode": "TCS234",
  }

  isShowPadding:any = false;
  constructor(
    private router: Router,
    private purchaseSer: PurchaseOrgService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getAllPurchaseOrgDetails(this.page, this.itemsPerPage)
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }



  async getAllPurchaseOrgDetails(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.purchaseSer.getAllPurchaseOrgDetailsPage(page, itemsPerPage);
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.allPurchaseOrgDetails = result.data;
        this.purchaseOrgDetails = result.data;
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
    this.selectAll = event.target.checked;
    this.purchaseOrgDetails.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    console.log(event.target.checked);

    this.purchaseOrgDetails[index].check = event.target.checked
    const findSelect = this.purchaseOrgDetails.find((el: any) => el.check === false)
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
      const result: any = await this.purchaseSer.updatePurchaseOrg(data);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPurchaseOrgDetails(this.page, this.itemsPerPage)
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
      const result: any = await this.purchaseSer.fileUploadPurchaseOrg(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPurchaseOrgDetails(this.page, this.itemsPerPage)
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
    this.purchaseSer.exportToExcel(this.purchaseOrgDetails, 'Purchase_org_records', 'Sheet1');
  }


  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.purchaseSer.exportToExcel(sampleRecord, 'Purchase_org_sample', 'Sheet1');
  }


  async handleDeleteMuliple() {
    try {
      const filterData = this.purchaseOrgDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.purchaseSer.updatePurchaseOrgMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllPurchaseOrgDetails(this.page, this.itemsPerPage)
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
      this.purchaseOrgDetails = this.allPurchaseOrgDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allPurchaseOrgDetails.filter((obj: any) => ((obj.purchase_org.toUpperCase()).includes(event.target.value.toUpperCase()) || (obj.purchase_org_Description.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.purchaseOrgDetails = isStringIncluded
  }


  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page - 1) * this.itemsPerPage;
    this.getAllPurchaseOrgDetails(records, this.itemsPerPage)
  }
}
