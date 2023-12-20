import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DivionService {

  constructor(
    private http: HttpClient
  ) { } 

   
  createDivionDetails(data:any){
    return this.http.post('http://54.151.187.67:4000/api/master/division/create', data).toPromise()
  }
 
  getAllDivionDetails(){
    return this.http.get('http://54.151.187.67:4000/api/master/division/getAll').toPromise()
  }

  singleDivionDetails(id:any){
    return this.http.get(`http://54.151.187.67:4000/api/master/division/get/${id}`).toPromise()
  }
  updateDivion(data:any){
    return this.http.put(`http://54.151.187.67:4000/api/master/division/update/${data._id}`, data).toPromise()
  }

}
