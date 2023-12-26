import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';


@Injectable({
  providedIn: 'root'
})
export class DivionService {

  constructor(
    private http: HttpClient
  ) { } 

   
  createDivionDetails(data:any){
    return this.http.post('http://localhost:4000/api/master/division/create', data).toPromise()
  }
 
  getAllDivionDetails(){
    return this.http.get('http://localhost:4000/api/master/division/getAll').toPromise()
  }

  getAllDivionDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/division/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  singleDivionDetails(id:any){
    return this.http.get(`http://localhost:4000/api/master/division/get/${id}`).toPromise()
  }
  updateDivion(data:any){
    return this.http.put(`http://localhost:4000/api/master/division/update/${data._id}`, data).toPromise()
  }

  updateDivionMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/division/update`, data).toPromise()
  }

  
  fileUploadDivion(data: any) {
    return this.http.post(`http://localhost:4000/api/master/division/upload`, data).toPromise()
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

}
