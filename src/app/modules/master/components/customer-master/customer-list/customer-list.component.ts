import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from '../../../services/customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

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
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  selectedFile: any = '';
  sampleJson ={
    "customerId":"cus123",
    "countryName": "zambia",
    "address": "Chennai",
    "postalCode": "600119",
    "city": "chennai",
    "region": "Hindu",
    "telephone": "9943879942",
    "taxNumber1": "1",
    "taxNumber2": "1",
    "vatRegNO": "1",
    "plantData": [
        {
            "currency": "dollar",
            "termsPayment": "test_payment",
            "companyCode": "code361",
            "reconciliationAcct": "one",
            "taxClassification": [
                {
                    "tax": "1"
                },
                {
                    "tax": "2"
                }
            ]
        }
    ],
    "salesData":[
        {
            "billingBlock":"test_billing_block",
            "workingTimes":"7 to 3",
            "accountGroup":"one",
            "deletionFlag":"Yes",
            "deliveryBlock":"test_delivery_block",
            "salesOrganization":"test_sales_org",
            "distributionChannel":"test_distribution",
            "division":"test_division",
            "customerGroup":"test_customer_group",
            "modeOfTransport":"test_mode_of_transport",
            "acctAssGrpCustomer":"test_acctAssGrpCustomer",
            "deliveryPlant":"test_deliveryPlant",
            "partialDeliveryAllowed":"Yes"
        }
    ]
}

  constructor(
    private router:Router,
    private customerSer:CustomerService,
    private _snackBar: MatSnackBar

  ){ }

  ngOnInit(): void {
      this.getCustomerDetail(this.page, this.itemsPerPage)
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

 

  async getCustomerDetail(page:any, itemsPerPage:any) {
    try {
      const result: any = await this.customerSer.getAllCustomerDetailsPage(page, itemsPerPage)
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
      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      console.log(fullDate);
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      formData.append('createdOn', fullDate);
      formData.append('createdBy', username);
      formData.append('changedOn', fullDate);
      formData.append('changedBy', username);

      const result: any = await this.customerSer.fileUploadXlsx(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getCustomerDetail(this.page, this.itemsPerPage)
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
    this.customerSer.exportToExcel(this.customerDetails, 'Customer', 'Sheet1');
  }

  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.customerSer.exportToExcel(sampleRecord, 'customer_master', 'Sheet1');
  }

  async handleDeleteMuliple() {
    try {
      const filterData = this.customerDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.customerSer.updateCustomerMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getCustomerDetail(this.page, this.itemsPerPage)
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
    this.getCustomerDetail(records, this.itemsPerPage)
  }

}
