import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class SalesOrgService {

  constructor(private http: HttpClient) { }

  createSalesOrg(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/master/salesorg/create', data).toPromise()
  }

  getAllSalesOrgDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/salesorg/getAll').toPromise()
  }

  singleSalesOrgDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/salesorg/get/${id}`).toPromise()
  }

  updatedSalesOrgDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/salesorg/update/${data._id}`, data).toPromise()

  }

   //get all region 

   getAllRegionDetails(id:any){
    return this.http.get(`http://54.151.187.67:4000/api/config/region/getAll/${id}`).toPromise()
  }


  fileUploadSalesOrg(data: any) {
    return this.http.post(`http://54.151.187.67:4000/api/master/salesorg/upload`, data).toPromise()
  }
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  getAllSalesOrgDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/salesorg/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateSalesOrgMany(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/salesorg/update`, data).toPromise()
  }
}
