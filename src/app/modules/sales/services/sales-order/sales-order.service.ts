import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesOrderService {

  constructor(private http:HttpClient) { }

  createSalesOrder(data: any) {
    return this.http.post('http://localhost:4000/api/sales/salesOrder/create', data).toPromise()
  }

  getAllSalesOrderDetails() {
    return this.http.get('http://localhost:4000/api/sales/salesOrder/getAll').toPromise()
  }


  singleSalesOrderDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/sales/salesOrder/get/${id}`).toPromise()
  }

  updatedSalesOrderDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/sales/salesOrder/update/${data._id}`, data).toPromise()
  }
  
}
