import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(
    private http:HttpClient
  ) { }

  createBillingOrder(data:any){
    return this.http.post('http://localhost:4000/api/sales/billing/create', data).toPromise();
  }

  // get Billing Type Details
  getBillingTypeDetails(){
    return this.http.get('http://localhost:4000/api/config/billingType/getALL').toPromise()
  }

  getBillingDetailsPage(skip?:any, itemsPerPage?:any){
    return this.http.get(`http://localhost:4000/api/sales/billing/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  getAllBillingDetails(){
    return this.http.get(`http://localhost:4000/api/sales/billing/getAll`).toPromise()
  }

  getAllPostingStatusDetails(){
    return this.http.get(`http://localhost:4000/api/config/postingStatus/getAll`).toPromise()
  }

  singlebillingDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/sales/billing/get/${id}`).toPromise()
  }

  updatedbillingDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/sales/billing/update/${data._id}`, data).toPromise()
  }

  updatebillingMany(data: any) {
    return this.http.put(`http://localhost:4000/api/sales/billing/update`, data).toPromise()
  }
  
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
