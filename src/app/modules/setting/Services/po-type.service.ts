import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PoTypeService {

  constructor(
    private http:HttpClient
  ) { }

  createpoTypeDetail(data:any){
      return this.http.post('http://localhost:4000/api/master/poType/create',data).toPromise()
      
  }
  getAllPoType(){
    return this.http.get('http://localhost:4000/api/master/poType/getAll').toPromise()
  }
  singlePoType(id:any){
    return this.http.get(`http://localhost:4000/api/master/poType/get/${id}`).toPromise()
  }

  updatePoType(data:any){
    return this.http.put(`http://localhost:4000/api/master/poType/update/${data._id}`,data).toPromise()
  }
}
