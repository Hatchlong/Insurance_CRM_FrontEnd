import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VendorService {

  constructor(
    private http: HttpClient
  ) { }

  createVendorDetails(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/master/vendor/create', data).toPromise()
  }

  getAllVendorDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/vendor/getAll').toPromise()
  }

  singleVendor(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/vendor/get/${id}`).toPromise()
  }

  updateVendor(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/vendor/update/${data._id}`, data).toPromise()
  }

  getVendorTypesDetails(){
    return this.http.get(`http://54.151.187.67:4000/api/config/vendorType/getAll`).toPromise()
  }

}

