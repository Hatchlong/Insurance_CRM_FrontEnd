import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {

  constructor() { }


  
  
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const deliveryData: any = [];
    console.log(deliveryData)
    data.map((el: any) => {
      el.itemList.map((ele: any) => {
        ele.itemData = el.itemData;
        deliveryData.push(ele)
      })

    })
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
      delete el.itemList
    })
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Add sheets to the workbook
    const sheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet1, 'Header');

    const sheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(deliveryData);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'Item Data');


    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
}
