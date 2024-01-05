import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class DeliveryService {

  constructor(private http:HttpClient) { }

  createDeliveryDetails(data: any) {
    return this.http.post('http://localhost:4000/api/sales/delivery/create', data).toPromise()
  }

  getAllDeliveryDetails() {
    return this.http.get('http://localhost:4000/api/sales/delivery/getAll').toPromise()
  }

  singleDeliveryDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/sales/delivery/get/${id}`).toPromise()
  }

  updateDeliveryDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/sales/delivery/update/${data._id}`, data).toPromise()
  }

 

}
