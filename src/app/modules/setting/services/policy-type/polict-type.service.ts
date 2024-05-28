import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolictTypeService {

  constructor(private http: HttpClient) { }

  createpolicyType(data: any) {
    return this.http.post('http://54.151.187.67:4003/api/setting/policyType/create', data).toPromise()
  }
  getAllpolicyTypeDetail() {
    return this.http.get('http://54.151.187.67:4003/api/setting/policyType/getAll').toPromise()

  }
  singlepolicyTypeDetail(id: any) {
    return this.http.get(`http://54.151.187.67:4003/api/setting/policyType/get/${id}`).toPromise()

  }

  updatepolicyTypeDetail(data: any) {
    return this.http.put(`http://54.151.187.67:4003/api/setting/policyType/update/${data._id}`, data).toPromise()
  }

  getAllpolicyTypesPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4003/api/setting/policyType/getAll/${skip}/${itemsPerPage}`).toPromise()
  }


  getAllpolicyTypeDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://54.151.187.67:4003/api/setting/policyType/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }
}
