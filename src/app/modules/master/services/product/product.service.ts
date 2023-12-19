import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  createProduct(data: any) {
    return this.http.post('http://localhost:4000/api/master/product/create', data).toPromise()
  }

  getAllProductDetails() {
    return this.http.get('http://localhost:4000/api/master/product/getAll').toPromise()
  }

 
  singleProductDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/product/get/${id}`).toPromise()
  }

  updatedProductDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/product/update/${data._id}`, data).toPromise()
  }


}
