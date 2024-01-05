import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http:HttpClient) { }

  createDeliveryDetails(data: any) {
    return this.http.post('http://localhost:4000/api/sales/delivery/create', data).toPromise()
  }

  getAllDeliveryDetails() {
    return this.http.get('http://localhost:4000/api/sales/delivery/getAll').toPromise()
  }

  getAllDeliveryDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/sales/delivery/getAll/`).toPromise()
  }

  singleDeliveryDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/sales/delivery/get/${id}`).toPromise()
  }

  updateDeliveryDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/sales/delivery/update/${data._id}`, data).toPromise()
  }

  updateDeliveryMany(data: any) {
    return this.http.put(`http://localhost:4000/api/sales/delivery/update`, data).toPromise()
  }
  

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const delivery: any = [];
    console.log(delivery)
    data.map((el: any) => {
      el.ItemList.map((ele: any) => {
        ele.deliveryType = el.deliveryType;
        delivery.push(ele)
      })

    })
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
      delete el.ItemList
    })
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Add sheets to the workbook
    const sheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet1, 'delivery');

    const sheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(delivery);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'Item Data');


    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

}
