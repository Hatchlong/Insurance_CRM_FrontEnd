import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }

  createcategory(data: any) {
    return this.http.post('http://localhost:4000/api/setting/category/create', data).toPromise()
  }
  getAllcategoryDetail() {
    return this.http.get('http://localhost:4000/api/setting/category/getAll').toPromise()

  }
  singlecategoryDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/category/get/${id}`).toPromise()

  }

  updatecategoryDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/category/update/${data._id}`, data).toPromise()
  }

  getAllcategorysPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/category/getAll/${skip}/${itemsPerPage}`).toPromise()
  }


  getAllcategoryDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/category/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
