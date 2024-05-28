import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InsuranceTypeService {

  constructor(private http: HttpClient) { }

  createinsuranceType(data: any) {
    return this.http.post('http://54.151.187.67:4003/api/setting/insuranceType/create', data).toPromise()
  }
  getAllinsuranceTypeDetail() {
    return this.http.get('http://54.151.187.67:4003/api/setting/insuranceType/getAll').toPromise()

  }
  singleinsuranceTypeDetail(id: any) {
    return this.http.get(`http://54.151.187.67:4003/api/setting/insuranceType/get/${id}`).toPromise()

  }

  updateinsuranceTypeDetail(data: any) {
    return this.http.put(`http://54.151.187.67:4003/api/setting/insuranceType/update/${data._id}`, data).toPromise()
  }

  getAllinsuranceTypesPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4003/api/setting/insuranceType/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updateinsuranceTypeMany(data: any) {
    return this.http.put(`http://54.151.187.67:4003/api/setting/insuranceType/update`, data).toPromise()
  }

  getAllInsuranceTypeDetailsPageFilter(filter?:any,skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://54.151.187.67:4003/api/setting/insuranceType/getAll/${skip}/${itemsPerPage}`, {filter:filter}).toPromise()

  }

}
