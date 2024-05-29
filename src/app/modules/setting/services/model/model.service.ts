import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  constructor(private http: HttpClient) { }

  createmodel(data: any) {
    return this.http.post('http://localhost:4000/api/setting/model/create', data).toPromise()
  }
  getAllmodelDetail() {
    return this.http.get('http://localhost:4000/api/setting/model/getAll').toPromise()

  }
  singlemodelDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/model/get/${id}`).toPromise()

  }

  updatemodelDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/model/update/${data._id}`, data).toPromise()
  }

  getAllmodelsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/model/getAll/${skip}/${itemsPerPage}`).toPromise()
  }


  getAllmodelDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/model/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
