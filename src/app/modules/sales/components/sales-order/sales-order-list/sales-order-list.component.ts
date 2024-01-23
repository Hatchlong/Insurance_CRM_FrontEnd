import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesOrderService } from '../../../services/sales-order/sales-order.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PageChangedEvent } from 'ngx-bootstrap/pagination';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';


@Component({
  selector: 'app-sales-order-list',
  templateUrl: './sales-order-list.component.html',
  styleUrls: ['./sales-order-list.component.css']
})
export class SalesOrderListComponent implements OnInit {

  selectAll: any = false
  isShowPadding: any = false;
  salesOrderDetail: any = []
  selectedSalesType: string = '';
  allSalesDetails: any = []

  totalItem: any = 0;
  currentPage = 1;
  page?: number = 0;
  itemsPerPage = 10;

  sampleJson = {
    "orderType": "Domestic",
    "saleOrgName": "SALES ORGANIZATION",
    "distributionChannelsName": "D123",
    "divisionName": "TEST DIVISION",
    "customerId": "CUS001",
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
    "modeOfTransport": "test_modeOfTransport",
    "totalNetWeight": "1",
    "totalGrossWeight": "1",
    "totalVolume": "1",
    "paymentTerms": "test_paymentTerms",
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
        "materialId": "test001",
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
    private salesOrderSer: SalesOrderService,
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
    this.getSalesOrderDetail(this.page, this.itemsPerPage)
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

  //filter text
  handleFilter(event: any) {
    if (!event.target.value) {
      this.salesOrderDetail = this.allSalesDetails
      return
    }
    console.log(event.target.value)
    const isStringIncluded = this.allSalesDetails.filter((obj: any) => ((obj.orderType.toUpperCase()).includes(event.target.value.toUpperCase())));
    this.salesOrderDetail = isStringIncluded
    console.log(isStringIncluded)
  }

  //select All
  selectdata(event: any) {
    console.log(event.target.checked)
    this.selectAll = event.target.checked;
    console.log(typeof this.selectAll)
    this.salesOrderDetail.map((el: any) => {
      el.check = event.target.checked
    })


  }
  particularcheck(event: any, index: any) {
    this.salesOrderDetail[index].check = event.target.checked
    const findSelect = this.salesOrderDetail.find((el: any) => el.check === false)

    if (findSelect) {
      this.selectAll = false
    }
    else {
      this.selectAll = true
    }
  }




  //get all details

  async getSalesOrderDetail(page: any, itemsPerPage: any) {
    try {
      const result: any = await this.salesOrderSer.getAllSalesOrderDetailsPage(page, itemsPerPage)
      console.log(result)
      if (result.status === '1') {
        this.salesOrderDetail = result.data
        this.allSalesDetails = result.data
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
      const result: any = await this.salesOrderSer.updatedSalesOrderDetails(data);
      console.log(result)
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getSalesOrderDetail(this.page, this.itemsPerPage)
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
    this.getSalesOrderDetail(records, this.itemsPerPage)
  }

  downloadExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.salesOrderSer.exportToExcel(sampleRecord, 'sales_orfer', 'Sheet1');
  }

  exportExcel(): void {
    this.salesOrderSer.exportToExcel(this.salesOrderDetail, 'salesOrder', 'Sheet1');
  }

  async handleDeleteMuliple() {
    try {
      const filterData = this.salesOrderDetail.filter((el: any) => el.check === true)
      filterData.map((el: any) => {
        el.isActive = "C"
      })
      const result: any = await this.salesOrderSer.updateSalesOrderMany(filterData);
      if (result.status === '1') {
        this._snackBar.open("Deleted Successfully", '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.getSalesOrderDetail(this.page, this.itemsPerPage)
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
