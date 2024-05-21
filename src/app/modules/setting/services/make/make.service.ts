import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MakeService {

  constructor(private http: HttpClient) { }

  createmake(data: any) {
    return this.http.post('http://localhost:4000/api/setting/make/create', data).toPromise()
  }
  getAllmakeDetail() {
    return this.http.get('http://localhost:4000/api/setting/make/getAll').toPromise()

  }
  singlemakeDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/make/get/${id}`).toPromise()

  }

  updatemakeDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/make/update/${data._id}`, data).toPromise()
  }

  getAllmakesPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/make/getAll/${skip}/${itemsPerPage}`).toPromise()
  }


  getAllmakeDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/make/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
