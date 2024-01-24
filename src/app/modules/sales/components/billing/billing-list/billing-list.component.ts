import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../../../services/billing/billing.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';

@Component({
  selector: 'app-billing-list',
  templateUrl: './billing-list.component.html',
  styleUrls: ['./billing-list.component.css']
})
export class BillingListComponent implements OnInit {

  isShowPadding: any = false;
  sampleJson = {

    "billingType": "Domestic",
    "billingDate": "SALES ORGANIZATION",
    "referenceDocument": "D123",
    "customerName": "Test",
    "netValue": "1",
    "taxAmount": "1",
    "currency": "02/01/2024",
    "exchangeRate": "SuperAdmin",
    "companyCodeName": "1",
    "customerAcctAssignName": "xyz",
    "postingStatus": "1",
    "paymentsTermsName": "1",
    "IncoTermsName": "1",
    "salesOrgName": "abx",
    "distrubutionName": "block23",
    "divisionName": "TCS234",
    "modeofTransportName": "abc",
    "netTax": 1,
    "netDiscount": 1,
    "netFreight": "1",
    "otherCharges": "1",
    "itemList": [
      {
        "billiedQTY": "Tv",
        "uom": "one",
        "netWeight": "1",
        "grossWeight": "xyz",
        "uomWeight": "1",
        "volumn": 1,
        "uomVolumn": 1,
        "salesOrder": "1",
        "slaesOrderItem": "l",
        "referenceDocument": "1",
        "referenceDocumentItem": "1",
        "priceDate": "1",
        "serviceRenderedDate": "1",
        "pricingAmount": "1",
        "tax": "1",
        "perUnitTax": "1",
        "discount": "dollar",
        "perUnitDiscount": "dollar",
        "freight": "1",
        "perUnitfreight": "1",
        "otherCharges": "1",
        "companyCurrency": "1",
        "transactionCurrency": "1",
        "exchangeRate": "1",
        "hsnCode": "1",
        "countryOrigin": "1",
        "poNumber": "1",
        "poDate": "1"
      }
    ]

  }
  idleState: any = 'Not Started';
  billingDetails:any = [];
  allBillingDetails:any = [];
  selectAll: any = false
  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;
  billingTypeList:any = []
  constructor(
    private router: Router,
    private billingSer: BillingService,
    private idle: Idle,
    private cd: ChangeDetectorRef,
    private _snackBar:MatSnackBar,
  ) {
    idle.setIdle(450),
      idle.setTimeout(900),
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Started';
      cd.detectChanges();
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout';
    })

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'idle';
    })
  }


  ngOnInit(): void {
    this.setStates()
    this.getBillingDetials(this.page, this.itemsPerPage)
    this.getBillingType()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }



  downloadExcel(): void {

    const sampleRecord = [this.sampleJson]
    this.billingSer.exportToExcel(sampleRecord, 'Billing_Sample', 'Sheet1');
  }

  exportExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.billingSer.exportToExcel(sampleRecord, 'Billing_Details', 'Sheet1');
    console.log(this.exportExcel)
  }

   //get all details

   async getBillingDetials(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.billingSer.getBillingDetailsPage(page, itemsPerPage)
      console.log(result)
      if (result.status === '1') {
        this.billingDetails = result.data
        this.allBillingDetails = result.data
        result.data.map((el: any) => {
          el.check = false
        })
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

  async deleteRecords(data: any) {
    try {
      data.isActive = "C"
      const result: any = await this.billingSer.updatedbillingDetails(data);
      console.log(result)
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getBillingDetials(this.page, this.itemsPerPage)
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


  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page - 1) * this.itemsPerPage;
    this.getBillingDetials(records, this.itemsPerPage)
  }

  async handleDeleteMuliple() {
    try {
      const filterData = this.billingDetails.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.billingSer.updatebillingMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getBillingDetials(this.page, this.itemsPerPage)
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

  particularcheck(event: any, index: any) {
    this.billingDetails[index].check = event.target.checked
    const findSelect = this.billingDetails.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }

  //select All
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.billingDetails.map((el: any) => {
      el.check = event.target.checked
    })
  }


  async getBillingType() {
    try {
      const result: any = await this.billingSer.getBillingTypeDetails();
      if (result.status === '1') {
        this.billingTypeList = result.data
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }


  handleFilter(event: any) {
    if (!event.target.value) {
      this.billingDetails = this.allBillingDetails
    }
    console.log(event.target.value)
    const isStringIncluded = this.allBillingDetails.filter((obj: any) => ((obj.billingType.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.billingDetails = isStringIncluded
  }
}
