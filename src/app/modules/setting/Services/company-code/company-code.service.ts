import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyCodeService {

  constructor(
    private http: HttpClient
  ) { }

  createCompanyCodeDetails(data: any) {
    return this.http.post('http://localhost:4000/api/master/companycode/create', data).toPromise()
  }

  getAllCompanyCodeDetails() {
    return this.http.get('http://localhost:4000/api/master/companycode/getAll').toPromise()
  }


  // Get Country Detials
  getAllCountryDetails() {
    return this.http.get('http://localhost:4000/api/master/country/getAll').toPromise()
  }

  // Single Language API Details
  singleLanguageDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }


  singleCompanyCode(id: any) {
    return this.http.get(`http://localhost:4000/api/master/companycode/get/${id}`).toPromise()
  }

  updateCompanyCode(data: any) {
    return this.http.put(`http://localhost:4000/api/master/companycode/update/${data._id}`, data).toPromise()
  }


}
