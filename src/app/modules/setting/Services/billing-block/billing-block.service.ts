import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BillingBlockService {

  constructor(private http: HttpClient) { }

  createBillingBlock(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/master/billingblock/create', data).toPromise()
  }

  getAllBillingBlockDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/billingblock/getAll').toPromise()
  }

  singleBillingBlockDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/billingblock/get/${id}`).toPromise()
  }

  updatedBillingBlockDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/billingblock/update/${data._id}`, data).toPromise()

  }
}
