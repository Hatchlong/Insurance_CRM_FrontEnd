import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http:HttpClient) { }

  createDeliveryDetails(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/sales/delivery/create', data).toPromise()
  }

  getAllDeliveryDetails() {
    return this.http.get('http://54.151.187.67:4000/api/sales/delivery/getAll').toPromise()
  }

  getAllDeliveryDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://54.151.187.67:4000/api/sales/delivery/getAll/`).toPromise()
  }

  singleDeliveryDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/sales/delivery/get/${id}`).toPromise()
  }

  updateDeliveryDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/sales/delivery/update/${data._id}`, data).toPromise()
  }

  updateDeliveryMany(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/sales/delivery/update`, data).toPromise()
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
    XLSX.utils.book_append_sheet(workbook, sheet1, 'delivery');

    const sheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(deliveryData);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'Item Data');


    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

}
