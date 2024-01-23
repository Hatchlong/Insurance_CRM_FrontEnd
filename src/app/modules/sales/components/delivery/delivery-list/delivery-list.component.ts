import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DeliveryService } from '../../../services/delivery/delivery.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-delivery-list',
  templateUrl: './delivery-list.component.html',
  styleUrls: ['./delivery-list.component.css']
})
export class DeliveryListComponent implements OnInit {

  isShowPadding: any = false;
  deliveryDetail: any = []
  selectAll: any = false
  allDeliveryDetails: any = []

  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;

  sampleJson = {

    "deliveryType": "Domestic",
    "saleOrgName": "SALES ORGANIZATION",
    "distributionChannelsName": "D123",
    "divisionName": "TEST DIVISION",
    "customerName": "Test",
    "customerAddress": "1",
    "salesOrder": "1",
    "createdOn": "02/01/2024",
    "createdBy": "SuperAdmin",
    "changedOn": "02/01/2024",
    "changedBy": "SuperAdmin",
    "customerPo": "1",
    "customerPoDate": "03/01/2024",
    "requestedDeliveryDate": "30/01/2024",
    "companyCurrency": "dollar",
    "transactionCurrency": "dollar",
    "exchangeRate": "1",
    "modeOfTransport": "xyz",
    "totalNetWeight": "1",
    "totalGrossWeight": "1",
    "totalVolume": "1",
    "paymentTerms": "abx",
    "billingBlockName": "block23",
    "companyCodeName": "TCS234",
    "customerAcctAss": "abc",
    "netPrice": 1,
    "netTax": 1,
    "netDiscount": 1,
    "netFreight": "1",
    "otherCharges": "1",
    "text": "test",
    "orderStatusName": "ord12",
    "itemList": [
      {
        "materialDescription": "Tv",
        "ordQty": "2",
        "uom": "one",
        "plant": "1",
        "storageLocation": "xyz",
        "batchSerial": "1",
        "priceAmount": 1,
        "priceUnitPrice": 1,
        "priceUnit": "1",
        "priceUOM": "l",
        "tax": "1",
        "perUnitTax": "1",
        "discount": "1",
        "perUnitDiscount": "1",
        "freight": "1",
        "perUnitFreight": "1",
        "otherCharges": "1",
        "companyCurrency": "dollar",
        "transactionCurrency": "dollar",
        "exchangeRate": "1",
        "priceDate": "1",
        "netWeight": "1",
        "grossWeight": "1",
        "volumn": "1"
      }
    ]

  }

  idleState: any = 'Not Started';

  constructor(
    private router: Router,
    private deliverySer: DeliveryService,
    private _snackBar: MatSnackBar,
    private idle: Idle,
    private cd: ChangeDetectorRef
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
    this.getAllDeliveryDetail(this.page, this.itemsPerPage)
    this.setStates()
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

  pageChanged(event: PageChangedEvent): void {
    this.page = event.page;
    const records = (this.page - 1) * this.itemsPerPage;
    this.getAllDeliveryDetail(records, this.itemsPerPage)
  }

  downloadExcel(): void {

    const sampleRecord = [this.sampleJson]
    this.deliverySer.exportToExcel(sampleRecord, 'delivery', 'Sheet1');
  }

  exportExcel(): void {
    this.deliverySer.exportToExcel(this.deliveryDetail, 'delivery', 'Sheet1');
    console.log(this.exportExcel)
  }

  // data into list
  async getAllDeliveryDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.deliverySer.getAllDeliveryDetailsPage(page, itemsPerPage)
      if (result.status === '1') {
        this.deliveryDetail = result.data
        this.allDeliveryDetails = result.data
        result.data.map((el: any) => {
          el.check = false
        })
        this.deliveryDetail = result.data
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


  //filter text
  handleFilter(event: any) {
    if (!event.target.value) {
      this.deliveryDetail = this.allDeliveryDetails
      return
    }
    console.log(event.target.value)
    const isStringIncluded = this.allDeliveryDetails.filter((obj: any) => ((obj.deliveryType.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.deliveryDetail = isStringIncluded
    console.log(isStringIncluded)
  }

  //selectall

  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.deliveryDetail.map((el: any) => {
      el.check = event.target.checked
    })
  }
  particularcheck(event: any, index: any) {
    this.deliveryDetail[index].check = event.target.checked
    const findSelect = this.deliveryDetail.find((el: any) => el.check === false)

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
      const result: any = await this.deliverySer.updateDeliveryDetails(data);
      console.log(result)
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllDeliveryDetail(this.page, this.itemsPerPage)
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

  // delete multiple
  async handleDeleteMuliple() {
    try {
      const filterData = this.deliveryDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.deliverySer.updateDeliveryMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getAllDeliveryDetail(this.page, this.itemsPerPage)
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
