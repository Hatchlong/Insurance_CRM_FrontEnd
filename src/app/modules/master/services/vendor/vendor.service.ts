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
    return this.http.get(`http://localhost:4000/api/master/vendor/getAll/`).toPromise()
  }

  singleVendor(id: any) {
    return this.http.get(`http://localhost:4000/api/master/vendor/get/${id}`).toPromise()
  }

  updateVendor(data: any) {
    return this.http.put(`http://localhost:4000/api/master/vendor/update/${data._id}`, data).toPromise()
  }

  
  updateVendorMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/vendor/update`, data).toPromise()
  }

  getVendorTypesDetails(){
    return this.http.get(`http://localhost:4000/api/config/vendorType/getAll`).toPromise()
  }

    // payment_method
    getAllPaymentMethodDetails(){
      return this.http.get('http://localhost:4000/api/config/payment/getAll').toPromise()
    }

     // reconcilationAccount
     getAllReconcilationAccountDetails(){
      return this.http.get('http://localhost:4000/api/config/reconcilationAccount/getAll').toPromise()
    }  



  
  fileUploadVendor(data: any) {
    return this.http.post(`http://localhost:4000/api/master/vendor/upload`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const vendorFinancialData: any = [];
    data.map((el: any) => {
      el.financialData.map((ele: any) => {
        ele.vendorId = el.vendorId;
        vendorFinancialData.push(ele)
      })

    })
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
      delete el.financialData
    })
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Add sheets to the workbook
    const sheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet1, 'Vendor_Data');

    const sheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(vendorFinancialData);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'FinancialData');


    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }

}

