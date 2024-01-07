import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient) { }

  createOrderStatus(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/master/orderStatus/create', data).toPromise()
  }

  getAllOrderStatusDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/orderStatus/getAll').toPromise()
  }

  singleOrderStatusDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/orderStatus/get/${id}`).toPromise()
  }

  updatedOrderStatusDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/orderStatus/update/${data._id}`, data).toPromise()

  }
  updatedManyorderStatusDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/orderStatus/update`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    
    data.map((el: any) => {
      // delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  getAllorderStatusDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/orderStatus/getAll/${skip}/${itemsPerPage}`).toPromise()

  }
  fileUploadXlsx(data: any) {
    return this.http.post(`http://54.151.187.67:4000/api/master/orderStatus/upload`, data).toPromise()
  }

}
