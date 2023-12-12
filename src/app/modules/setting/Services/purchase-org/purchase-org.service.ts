import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrgService {

  constructor(
    private http: HttpClient
  ) { } 
 

  createPurchaseOrgDetails(data:any){
    return this.http.post('http://localhost:4000/api/master/purchaseOrg/create', data).toPromise()
  }
 
  getAllPurchaseOrgDetails(){
    return this.http.get('http://localhost:4000/api/master/purchaseOrg/getAll').toPromise()
  }
 
  singlePurchaseOrg(id:any){
    return this.http.get(`http://localhost:4000/api/master/purchaseOrg/get/${id}`).toPromise()
  } 

  updatePurchaseOrg(data:any){
    return this.http.put(`http://localhost:4000/api/master/purchaseOrg/update/${data._id}`, data).toPromise()
  }
} 
   