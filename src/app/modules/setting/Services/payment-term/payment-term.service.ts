import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PaymentTermService {

  constructor(private http:HttpClient) { }

  
  createPaymentTerm(data:any){
    return this.http.post('http://54.151.187.67:4000/api/master/paymentTerms/create', data).toPromise()
  }

  getAllPaymentTerm(){
    return this.http.get('http://54.151.187.67:4000/api/master/paymentTerms/getAll').toPromise();
  }
  singlePaymentTerm(id:any){
    return this.http.get(`http://54.151.187.67:4000/api/master/paymentTerms/get/${id}`).toPromise()
  }

  updatePaymentTerm(data:any){
    return this.http.put(`http://54.151.187.67:4000/api/master/paymentTerms/update/${data._id}`, data).toPromise()
  }
}
