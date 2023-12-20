import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistibutionChannelService {

  constructor(
    private http: HttpClient
  ) { } 
 

  createDistibutionChannelDetails(data:any){
    return this.http.post('http://localhost:4000/api/master/distributionChannel/create', data).toPromise()
  }
 
  getAllDistibutionChannelDetails(){
    return this.http.get('http://localhost:4000/api/master/distributionChannel/getAll').toPromise()
  }
 
  singleDistibutionChannel(id:any){
    return this.http.get(`http://localhost:4000/api/master/distributionChannel/get/${id}`).toPromise()
  } 
 
  updateDistibutionChannel(data:any){
    return this.http.put(`http://localhost:4000/api/master/distributionChannel/update/${data._id}`, data).toPromise()
  }
}
