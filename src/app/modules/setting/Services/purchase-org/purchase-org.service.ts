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

  getAllPurchaseOrg(){
    return this.http.get('http://localhost:4000/api/master/purchaseOrg/getAll').toPromise()
  }
}
