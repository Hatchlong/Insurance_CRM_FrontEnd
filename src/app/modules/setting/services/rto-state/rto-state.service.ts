import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RtoStateService {

  constructor(private http: HttpClient) { }

  createRtoState(data: any) {
    return this.http.post('http://localhost:4000/api/setting/rtoState/create', data).toPromise()
  }
  getAllRtoStateDetail() {
    return this.http.get('http://localhost:4000/api/setting/rtoState/getAll').toPromise()

  }
  singleRtoStateDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/rtoState/get/${id}`).toPromise()

  }


  updateRtoStateDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/rtoState/update/${data._id}`, data).toPromise()
  }

  getAllRtoStatesPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/setting/rtoState/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  
  updateRtoStateMany(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/rtoState/update`, data).toPromise()
  }

}
