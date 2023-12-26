import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentTermService } from '../../../Services/payment-term/payment-term.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';


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
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  sampleJson = {
    "paymentTerm":"test",
    "description":"test description",
    "dayLimit":1,
    "accountType":"Customer",
    "defaultBaselineDate":"20/11/2023",
    "fixedBaseLineDate":"20/11/2023",
    "additionalBaselineDataCalculation":"20/11/2023"

}
isShowPadding:any = false;

  constructor(
    private router: Router,
    private paymentSer: PaymentTermService,
    private _snackBar: MatSnackBar
  ) { }
  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
    this.getAllpaymentTermsDetailsPage(this.page, this.itemsPerPage)
  }

  // select multiple checkbox
  selectdata(event: any) {
    console.log(event.target.checked);
    this.selectAll = event.target.checked;
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


  async getAllpaymentTermsDetailsPage(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.paymentSer.getAllpaymentTermsDetailsPage(page, itemsPerPage);
      console.log(result)
      if (result.status === '1') {
        result.data.map((el: any) => {
          el.check = false
        })
        this.totalItem = result.count
        this.allPaymentDetails=result.data
        this.paymentDetails = result.data;
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
        this.getAllpaymentTermsDetailsPage(this.page, this.itemsPerPage)
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
      const result: any = await this.paymentSer.fileUploadXlsx(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllpaymentTermsDetailsPage(this.page, this.itemsPerPage)
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
    this.paymentSer.exportToExcel(this.paymentDetails, 'payment Term', 'Sheet1');
  }


  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.paymentSer.exportToExcel(sampleRecord, 'Payment Term', 'Sheet1');
  }


  async handleDeleteMuliple() {
    try {
      const filterData = this.paymentDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.paymentSer.updatedManypaymentTermsDetails(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllpaymentTermsDetailsPage(this.page, this.itemsPerPage)
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
    this.getAllpaymentTermsDetailsPage(records, this.itemsPerPage)
  }

}
