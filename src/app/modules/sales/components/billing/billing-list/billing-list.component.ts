import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BillingService } from '../../../services/billing/billing.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

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

  constructor(
    private router: Router,
    private billingSer: BillingService,
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
}
