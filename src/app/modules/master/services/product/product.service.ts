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

  getAllIndustrySectorDetails() {
    return this.http.get('http://localhost:4000/api/config/industrySector/getAll').toPromise()
  }
  getAllStorageConditionsDetails() {
    return this.http.get('http://localhost:4000/api/config/storageConditions/getAll').toPromise()
  }
  getAllTemperatureConditionsDetails() {
    return this.http.get('http://localhost:4000/api/config/temperature/getAll').toPromise()
  }
  getAllTransportationGroupDetails() {
    return this.http.get('http://localhost:4000/api/config/transport/getAll').toPromise()
  }
  getAllprocurementTypeDetails() {
    return this.http.get('http://localhost:4000/api/config/procurement/getAll').toPromise()
  }
  getAllProfitCenterDetails() {
    return this.http.get('http://localhost:4000/api/config/profitcenter/getAll').toPromise()
  }

  getAllAcctAssignDetails() {
    return this.http.get('http://localhost:4000/api/config/acctAssign/getAll').toPromise()
  }

  getAllMaterialGroupDetails() {
    return this.http.get('http://localhost:4000/api/config/materialGroup/getAll').toPromise()
  }
  getAllWeightUnitDetails() {
    return this.http.get('http://localhost:4000/api/config/weightUnit/getAll').toPromise()

  }
  getAllUOMDetails() {
    return this.http.get('http://localhost:4000/api/config/uom/getAll').toPromise()
  }
  getAllMaterialTypeDetails(){
    return this.http.get('http://localhost:4000/api/config/materialType/getAll').toPromise()
  }
}
