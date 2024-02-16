import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  createcustomer(data:any){
   return this.http.post('http://localhost:4000/api/master/customer/create',data).toPromise()
 }
 getAllcustomerDetail(){
   return this.http.get('http://localhost:4000/api/master/customer/getAll').toPromise()

 }
 singlecustomerDetail(id:any){
   return this.http.get(`http://localhost:4000/api/master/customer/get/${id}`).toPromise()

 }

 
 updatecustomerDetail(data: any) {
   return this.http.put(`http://localhost:4000/api/master/customer/update/${data._id}`, data).toPromise()
 }
}
