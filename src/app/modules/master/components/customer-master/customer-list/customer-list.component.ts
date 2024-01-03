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
        this.getCustomerDetail()
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



}
