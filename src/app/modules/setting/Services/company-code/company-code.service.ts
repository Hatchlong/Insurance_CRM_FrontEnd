import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';
@Injectable({
  providedIn: 'root'
})
export class CompanyCodeService {

  constructor(
    private http: HttpClient
  ) { }

  createCompanyCodeDetails(data: any) {
    return this.http.post('http://localhost:4000/api/master/companycode/create', data).toPromise()
  }

  getAllCompanyCodeDetails(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/companycode/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  // Get Country Detials
  getAllCountryDetails() {
    return this.http.get('http://localhost:4000/api/master/country/getAll').toPromise()
  }

  // Single Language API Details
  singleLanguageDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }

  singleCompanyCode(id: any) {
    return this.http.get(`http://localhost:4000/api/master/companycode/get/${id}`).toPromise()
  }

  updateCompanyCode(data: any) {
    return this.http.put(`http://localhost:4000/api/master/companycode/update/${data._id}`, data).toPromise()
  }

  updateCompanyCodeMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/companycode/update`, data).toPromise()
  }

  // Get All currecny Details

 getAllCurrencyDetails(companyId:any) {
    return this.http.get(`http://localhost:4000/api/config/currency/getAll/${companyId}`).toPromise()
  }


  fileUploadCompanyCode(data: any) {
    return this.http.post(`http://localhost:4000/api/master/companycode/upload`, data).toPromise()
  }
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}
