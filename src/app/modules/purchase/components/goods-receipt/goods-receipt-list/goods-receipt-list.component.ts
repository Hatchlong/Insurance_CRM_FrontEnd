import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { GoodReceiptService } from '../../../services/good_receipt/good-receipt.service';

@Component({
  selector: 'app-goods-receipt-list',
  templateUrl: './goods-receipt-list.component.html',
  styleUrls: ['./goods-receipt-list.component.css']
})
export class GoodsReceiptListComponent {
  isShowPadding:any = false;
  sampleJson = {

    "referencePO": "Domestic",
    "postingDate": "SALES ORGANIZATION",
    "documentDate": "D123",
    "itemList": [
      {
        "productId": "block23",
        "plantName": "1",
        "storageLocationName": "1",
        "poQTY": 1,
        "grQTY": 1,
        "UOM": "1",
        "G/LAmount": "1",
        "stockType": "1",
      }
    ]

  }
  constructor(
    private router:Router,
    private goodReciptSer:GoodReceiptService
  ){}
  nextPage(url:any){
    this.router.navigate([`${url}`])
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  downloadExcel(): void {

    const sampleRecord = [this.sampleJson]
    this.goodReciptSer.exportToExcel(sampleRecord, 'Good_Receipt_Sample', 'Sheet1');
  }

  exportExcel(): void {
    const sampleRecord = [this.sampleJson]
    this.goodReciptSer.exportToExcel(sampleRecord, 'Good_Receipt_Details', 'Sheet1');
  }
}
