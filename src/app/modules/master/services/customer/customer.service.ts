import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(
    private http: HttpClient
  ) { }

  createCustomer(data: any) {
    return this.http.post('http://localhost:4000/api/master/customer/create', data).toPromise()
  }

  getAllCustomerDetails() {
    return this.http.get('http://localhost:4000/api/master/customer/getAll').toPromise()
  }

  getAllCustomerDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/customer/getAll/`).toPromise()
  }

  singleCustomerDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/customer/get/${id}`).toPromise()
  }

  updatedCustomerDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/customer/update/${data._id}`, data).toPromise()
  }

  getDeliveryBlock(){
    return this.http.get('http://localhost:4000/api/config/deliveryBlock/getAll').toPromise()
  }

  getCustomerGroup(){
    return this.http.get('http://localhost:4000/api/config/customerGroup/getAll').toPromise()
    
  }


  
  updateCustomerMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/customer/update`, data).toPromise()
  }


  exportToExcel(data: any[], fileName: string, sheetName: string): void {

    const financialData: any = [];
    const salesData: any = []
    data.map((el: any) => {
      el.plantData.map((ele: any) => {
        ele.customerId = el.customerId;
        financialData.push(ele)
      })
      el.salesData.map((ele: any) => {
        ele.customerId = el.customerId;
        salesData.push(ele)
      })

    })
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
      delete el.financialData
      delete el.salesData
      delete el.plantData
    })
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Add sheets to the workbook
    const sheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet1, 'customer_data');

    const sheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(financialData);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'Financial_Data');

    const sheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(salesData);
    XLSX.utils.book_append_sheet(workbook, sheet3, 'Sales_Data');

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }


}
