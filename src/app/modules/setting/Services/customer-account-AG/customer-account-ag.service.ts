import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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


}
