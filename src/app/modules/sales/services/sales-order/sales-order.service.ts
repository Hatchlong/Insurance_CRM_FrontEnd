import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private http:HttpClient) { }

  createSalesOrder(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/sales/salesOrder/create', data).toPromise()
  }

  getAllSalesOrderDetails() {
    return this.http.get('http://54.151.187.67:4000/api/sales/salesOrder/getAll').toPromise()
  }

  getAllSalesOrderDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://54.151.187.67:4000/api/sales/salesOrder/getAll/`).toPromise()
  }

  singleSalesOrderDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/sales/salesOrder/get/${id}`).toPromise()
  }

  updatedSalesOrderDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/sales/salesOrder/update/${data._id}`, data).toPromise()
  }

  updateSalesOrderMany(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/sales/salesOrder/update`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const salesOrderData: any = [];
    console.log(salesOrderData)
    data.map((el: any) => {
      console.log(el)
      el.itemList.map((ele: any) => {
        ele.orderType = el.orderType;
        salesOrderData.push(ele)
      })

    })
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
      delete el.itemList
      delete el.saleOrgId
    })
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Add sheets to the workbook
    const sheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet1, 'sales_order');

    const sheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(salesOrderData);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'ItemData');


    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
  
}
