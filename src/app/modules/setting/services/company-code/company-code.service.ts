import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyCodeService {

  constructor(private http: HttpClient) { }

  createCompanyCode(data: any) {
    return this.http.post('http://localhost:4000/api/setting/companyCode/create', data).toPromise()
  }
  getAllCompanyCodeDetail() {
    return this.http.get('http://localhost:4000/api/setting/companyCode/getAll').toPromise()

  }
  singleCompanyCodeDetail(id: any) {
    return this.http.get(`http://localhost:4000/api/setting/companyCode/get/${id}`).toPromise()

  }

  updateCompanyCodeDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/companyCode/update/${data._id}`, data).toPromise()
  }


  getAllcompanyCodeDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/setting/companyCode/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedManyCompanyCodeDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/setting/companyCode/update`, data).toPromise()
  }
  companyLogoUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }

  // Get Country Detials
  getAllCountryDetails() {
    return this.http.get('http://localhost:4000/api/config/country/getAll').toPromise()
  }

  updateCity(data: any) {
    return this.http.put(`http://localhost:4000/api/config/cities/update/${data.stateId}`, data).toPromise()
  }

  getAllcompanyCodeDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/setting/companyCode/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
