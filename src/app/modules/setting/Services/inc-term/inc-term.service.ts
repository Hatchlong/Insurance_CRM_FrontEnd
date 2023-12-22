import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class IncTermService {

  constructor(private http: HttpClient) { }

  createIncTerms(data: any) {
    return this.http.post('http://localhost:4000/api/master/incterms/create', data).toPromise()
  }
 
  getAllIncTermsDetails() {
    return this.http.get('http://localhost:4000/api/master/incterms/getAll').toPromise()
  }

  getAllIncoTermPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/incterms/getAll/`).toPromise()
  }

  singleIncTermsDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/incterms/get/${id}`).toPromise()
  }

  updatedIncTermsDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/incterms/update/${data._id}`, data).toPromise()

  }


  updateIncoTermMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/incterms/update`, data).toPromise()
  }

 
  fileUploadIncoTerm(data: any) {
    return this.http.post(`http://localhost:4000/api/master/incterms/upload`, data).toPromise()
  }
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}
