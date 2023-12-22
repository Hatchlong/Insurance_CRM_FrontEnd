import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
}) 
export class BillingBlockService {

  constructor(private http: HttpClient) { }
 
  createBillingBlock(data: any) {
    return this.http.post('http://localhost:4000/api/master/billingblock/create', data).toPromise()
  }

  getAllBillingBlockDetails() {
    return this.http.get('http://localhost:4000/api/master/billingblock/getAll').toPromise()
  }

  getAllBillingBlockPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/billingblock/getAll/`).toPromise()
  }

  singleBillingBlockDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/billingblock/get/${id}`).toPromise()
  }

  updatedBillingBlockDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/billingblock/update/${data._id}`, data).toPromise()
  }

  updateBillingBlockMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/billingblock/update`, data).toPromise()
  }

 
  fileUploadBillingBlock(data: any) {
    return this.http.post(`http://localhost:4000/api/master/billingblock/upload`, data).toPromise()
  }
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }


}
