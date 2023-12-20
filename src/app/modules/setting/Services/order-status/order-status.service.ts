import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderStatusService {

  constructor(private http: HttpClient) { }

  createOrderStatus(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/master/orderStatus/create', data).toPromise()
  }

  getAllOrderStatusDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/orderStatus/getAll').toPromise()
  }

  singleOrderStatusDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/orderStatus/get/${id}`).toPromise()
  }

  updatedOrderStatusDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/orderStatus/update/${data._id}`, data).toPromise()

  }}
