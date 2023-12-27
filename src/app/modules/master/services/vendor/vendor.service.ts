import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private http: HttpClient
  ) { }

  createVendorDetails(data: any) {
    return this.http.post('http://localhost:4000/api/master/vendor/create', data).toPromise()
  }

  getAllVendorDetails() {
    return this.http.get('http://localhost:4000/api/master/vendor/getAll').toPromise()
  }

  getAllVendorDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/vendor/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  singleVendor(id: any) {
    return this.http.get(`http://localhost:4000/api/master/vendor/get/${id}`).toPromise()
  }

  updateVendor(data: any) {
    return this.http.put(`http://localhost:4000/api/master/vendor/update/${data._id}`, data).toPromise()
  }

  getVendorTypesDetails(){
    return this.http.get(`http://localhost:4000/api/config/vendorType/getAll`).toPromise()
  }

  
  fileUploadVendor(data: any) {
    return this.http.post(`http://localhost:4000/api/master/vendor/upload`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    data.map((el: any) => {
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}

