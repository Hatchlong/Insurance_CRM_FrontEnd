import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  createcustomer(data: any) {
    return this.http.post('http://localhost:4000/api/master/customerMaster/create', data).toPromise()
  }
  getAllcustomerDetail() {
    return this.http.get('http://localhost:4000/api/master/customerMaster/getAll').toPromise()

  }
  singlecustomerDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/master/customerMaster/get/${id}`).toPromise()

  }


  updatecustomerDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/master/customerMaster/update/${data._id}`, data).toPromise()
  }

  getAllCustomerDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/master/customerMaster/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateCustomerDetailsMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/customerMaster/update`, data).toPromise()
  }
  agentLogoUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }

  getAllCustomerDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/master/customerMaster/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
