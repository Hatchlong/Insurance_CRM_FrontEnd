import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VendorInvoiceService } from '../../../services/vendor_invoice/vendor-invoice.service';

@Component({
  selector: 'app-vendor-invoice-list',
  templateUrl: './vendor-invoice-list.component.html',
  styleUrls: ['./vendor-invoice-list.component.css']
})
export class VendorInvoiceListComponent {
  isShowPadding:any = false
  sampleJson = {
    "text": "Domestic",
    "companyCodeName": "SALES ORGANIZATION",
    "referenceDocument": "D123",
    "vendorName": "Domestic",
    "vendorAddress": "SALES ORGANIZATION",
    "vendorBankDetails": "D123",
    "paymentTermsName": "Domestic",
    "baselineDate": "SALES ORGANIZATION",
    "paymentDueDate": "D123",
    "itemList": [
      {
        "item#": "block23",
        "amount": "1",
        "poQTY": 1,
        "poUOM": "1",
        "grQTY": 1,
        "grUOM": "1",
        "referencePO": "1",
        "taxCode": "1",
      }
    ]
  }
  constructor(
    private router:Router,
    private vendorInvoiceSer:VendorInvoiceService
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }
  checks=false;
  selectAll(e:any){
    if(e.target.checked==true){
      this.checks=true;
    }else{
      this.checks=false;
    }
  }
  
  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  downloadExcel(): void {

    const sampleRecord = [this.sampleJson]
    this.vendorInvoiceSer.exportToExcel(sampleRecord, 'Vendor_Invoice_Sample', 'Sheet1');
  }

  exportExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.vendorInvoiceSer.exportToExcel(sampleRecord, 'Vendor_Invoice_Details', 'Sheet1');
  }
}
