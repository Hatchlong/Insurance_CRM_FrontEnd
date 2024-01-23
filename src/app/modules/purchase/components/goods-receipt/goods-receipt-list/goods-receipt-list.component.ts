import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoodReceiptService } from '../../../services/good_receipt/good-receipt.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-goods-receipt-list',
  templateUrl: './goods-receipt-list.component.html',
  styleUrls: ['./goods-receipt-list.component.css']
})
export class GoodsReceiptListComponent implements OnInit {
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
  idleState: any = 'Not Started';

  constructor(
    private router:Router,
    private goodReciptSer:GoodReceiptService,
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
