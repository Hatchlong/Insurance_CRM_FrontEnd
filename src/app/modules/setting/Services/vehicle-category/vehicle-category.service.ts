import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VehicleCategoryService {


  constructor(private http:HttpClient) { }

  createVehicleCategory(data:any){
   return this.http.post('http://localhost:4000/api/setting/vehicle/create',data).toPromise()
 }
 getAllVehicleCategoryDetail(){
   return this.http.get('http://localhost:4000/api/setting/vehicle/getAll').toPromise()

 }
 singleVehicleCategoryDetail(id:any){
   return this.http.get(`http://localhost:4000/api/setting/vehicle/get/${id}`).toPromise()

 }

 updateVehicleCategoryDetail(data: any) {
   return this.http.put(`http://localhost:4000/api/setting/vehicle/update/${data._id}`, data).toPromise()
 }}
