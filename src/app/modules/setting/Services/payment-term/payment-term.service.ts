import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'
@Injectable({
  providedIn: 'root'
})
export class PaymentTermService {

  constructor(private http: HttpClient) { }


  createPaymentTerm(data: any) {
    return this.http.post('http://localhost:4000/api/master/paymentTerms/create', data).toPromise()
  }

  getAllPaymentTerm() {
    return this.http.get('http://localhost:4000/api/master/paymentTerms/getAll').toPromise();
  }
  singlePaymentTerm(id: any) {
    return this.http.get(`http://localhost:4000/api/master/paymentTerms/get/${id}`).toPromise()
  }

  updatePaymentTerm(data: any) {
    return this.http.put(`http://localhost:4000/api/master/paymentTerms/update/${data._id}`, data).toPromise()
  }

  updatedManypaymentTermsDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/paymentTerms/update`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  getAllpaymentTermsDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/master/paymentTerms/getAll/${skip}/${itemsPerPage}`).toPromise()

  }
  fileUploadXlsx(data: any) {
    return this.http.post(`http://localhost:4000/api/master/paymentTerms/upload`, data).toPromise()
  }
}
