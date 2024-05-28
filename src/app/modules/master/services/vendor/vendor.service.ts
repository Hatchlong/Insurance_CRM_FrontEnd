import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(private http: HttpClient) { }

  createVendor(data: any) {
    return this.http.post('http://54.151.187.67:4003/api/master/vendor/create', data).toPromise()
  }
  getAllVendorDetail() {
    return this.http.get('http://54.151.187.67:4003/api/master/vendor/getAll').toPromise()

  }
  singleVendorDetail(id: any) {
    return this.http.get(`http://54.151.187.67:4003/api/master/vendor/get/${id}`).toPromise()

  }
  updateVendorDetail(data: any) {
    return this.http.put(`http://54.151.187.67:4003/api/master/vendor/update/${data._id}`, data).toPromise()
  }

  getAllVendorDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4003/api/master/vendor/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateVendorDetailsMany(data: any) {
    return this.http.put(`http://54.151.187.67:4003/api/master/vendor/update`, data).toPromise()
  }

  // payment_method
  getAllPaymentMethodDetails() {
    return this.http.get('http://54.151.187.67:4003/api/config/payment/getAll').toPromise()
  }

  getAllCurrencyDetails() {
    return this.http.get('http://54.151.187.67:4003/api/config/currency/getAll').toPromise()
  }

  
  getAllVendorDetailsPageFilter(filter?:any,skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://54.151.187.67:4003/api/master/vendor/getAll/${skip}/${itemsPerPage}`, {filter:filter}).toPromise()

  }

}
