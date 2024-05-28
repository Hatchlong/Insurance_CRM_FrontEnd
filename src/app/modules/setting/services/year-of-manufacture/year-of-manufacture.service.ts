import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class YearOfManufactureService {

  constructor(private http: HttpClient) { }

  createyearOfManfacture(data: any) {
    return this.http.post('http://54.151.187.67:4004/api/setting/yearOfManfacture/create', data).toPromise()
  }
  getAllyearOfManfactureDetail() {
    return this.http.get('http://54.151.187.67:4004/api/setting/yearOfManfacture/getAll').toPromise()

  }
  singleyearOfManfactureDetail(id: any) {
    return this.http.get(`http://54.151.187.67:4004/api/setting/yearOfManfacture/get/${id}`).toPromise()

  }

  updateyearOfManfactureDetail(data: any) {
    return this.http.put(`http://54.151.187.67:4004/api/setting/yearOfManfacture/update/${data._id}`, data).toPromise()
  }

  getAllyearOfManfacturesPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4004/api/setting/yearOfManfacture/getAll/${skip}/${itemsPerPage}`).toPromise()
  }


  getAllyearOfManfactureDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://54.151.187.67:4004/api/setting/yearOfManfacture/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
