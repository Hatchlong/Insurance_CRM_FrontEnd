import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PurchaseOrderService } from '../../../services/purchase_order/purchase-order.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-purchase-order-list',
  templateUrl: './purchase-order-list.component.html',
  styleUrls: ['./purchase-order-list.component.css']
})
export class PurchaseOrderListComponent implements OnInit {

  isShowPadding: any = false;
  sampleJson = {

    "poType": "Domestic",
    "poNumber": "SALES ORGANIZATION",
    "poDate": "D123",
    "companyCodeName": "Test",
    "purchaseOrgName": "1",
    "paymentTermsName": "1",
    "vendorName": "02/01/2024",
    "netPrice": "SuperAdmin",
    "transaction": "1",
    "exchangeRate": "xyz",
    "companyCurrency": "1",
    "mark_DT": "1",
    "IncoTermsName": "1",
    "remark": "abx",

    "itemList": [
      {
        "defaultDelivery": "block23",
        "productCode": "TCS234",
        "productDescription": "abc",
        "poQTY": 1,
        "uom": 1,
        "priceAmount": "1",
        "perUnitPrice": "1",
        "pricingUnit": "1",
        "pricingUOM": "l",
        "overAllTax": "1",
        "taxPerProduct": "1",
        "companyCurrency": "1",
        "deliveryDate": "1",
        "plantName": "1",
        "storageLocationName": "1",
        "printPO": "1"
      }
    ]

  }

  idleState: any = 'Not Started';
  constructor(
    private router: Router,
    private purchaseOrderSer:PurchaseOrderService,
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
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  nextPage(url: any) {
    this.router.navigate([`${url}`])
  }
  checks = false;
  selectAll(e: any) {
    if (e.target.checked == true) {
      this.checks = true;
    } else {
      this.checks = false;
    }
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }




  downloadExcel(): void {

    const sampleRecord = [this.sampleJson]
    this.purchaseOrderSer.exportToExcel(sampleRecord, 'Purchase_order_Sample', 'Sheet1');
  }

  exportExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.purchaseOrderSer.exportToExcel(sampleRecord, 'Purchase_order_Details', 'Sheet1');
  }
}
