import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FinancialPeriodService {

  constructor(private http:HttpClient) { }

  createFinancial(data:any){
    return this.http.post('http://localhost:4000/api/master/financial/create',data).toPromise()
  }
  getAllFinancialDetail(){
    return this.http.get('http://localhost:4000/api/master/financial/getAll').toPromise()

  }
  singleFinancialDetail(id:any){
    return this.http.get(`http://localhost:4000/api/master/financial/get/${id}`).toPromise()
  }

  updateFinancialDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/master/financial/update/${data._id}`, data).toPromise()
  }

  getAllfinancialPeriodDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/financial/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  
  updatedManyFinancialPeriodDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/financial/update`, data).toPromise()
  }

}
