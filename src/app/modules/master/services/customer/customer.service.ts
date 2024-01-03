import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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
}
