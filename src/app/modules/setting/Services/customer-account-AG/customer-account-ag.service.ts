import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'

@Injectable({
  providedIn: 'root'
})
export class CustomerAccountAGService {

  constructor(
    private http : HttpClient
  ) { }

 
  

  createCustomerAccountDetails(data:any){
    return this.http.post('http://54.151.187.67:4000/api/master/customerAccAG/create', data).toPromise()
  }
 
  getAllCustomerAccountDetails(){
    return this.http.get('http://54.151.187.67:4000/api/master/customerAccAG/getAll').toPromise()
  }
 
  singleCustomerAccount(id:any){
    return this.http.get(`http://54.151.187.67:4000/api/master/customerAccAG/get/${id}`).toPromise()
  } 
 
  updateCustomerAccount(data:any){
    return this.http.put(`http://54.151.187.67:4000/api/master/customerAccAG/update/${data._id}`, data).toPromise()
  }

  
  updatedManyCustomerAccountACGDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/customerAccAG/update`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    data.map((el: any) => {
      // delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  getAllCustomerAccountACGDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/customerAccAG/getAll/${skip}/${itemsPerPage}`).toPromise()

  }
  fileUploadXlsx(data: any) {
    return this.http.post(`http://54.151.187.67:4000/api/master/customerAccAG/upload`, data).toPromise()
  }


}
