import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrgService {

  constructor(
    private http: HttpClient
  ) { } 
 

  createPurchaseOrgDetails(data:any){
    return this.http.post('http://localhost:4000/api/master/purchaseOrg/create', data).toPromise()
  }
 
  getAllPurchaseOrgDetails(){
    return this.http.get('http://localhost:4000/api/master/purchaseOrg/getAll').toPromise()
  }
 
  singlePurchaseOrg(id:any){
    return this.http.get(`http://localhost:4000/api/master/purchaseOrg/get/${id}`).toPromise()
  } 

  updatePurchaseOrg(data:any){
    return this.http.put(`http://localhost:4000/api/master/purchaseOrg/update/${data._id}`, data).toPromise()
  }

  fileUploadPurchaseOrg(data: any) {
    return this.http.post(`http://localhost:4000/api/master/purchaseOrg/upload`, data).toPromise()
  }
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  getAllPurchaseOrgDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/purchaseOrg/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatePurchaseOrgMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/purchaseOrg/update`, data).toPromise()
  }
} 
   