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
    return this.http.post('http://54.151.187.67:4000/api/master/companycode/create', data).toPromise()
  }

  getAllCompanyCodeDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/companycode/getAll').toPromise()
  }

  // Get Country Detials
  getAllCountryDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/country/getAll').toPromise()
  }

  // Single Language API Details
  singleLanguageDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/language/get/${id}`).toPromise()
  }

  singleCompanyCode(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/companycode/get/${id}`).toPromise()
  }

  updateCompanyCode(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/companycode/update/${data._id}`, data).toPromise()
  }

  // Get All currecny Details

 getAllCurrencyDetails(companyId:any) {
    return this.http.get(`http://54.151.187.67:4000/api/config/currency/getAll/${companyId}`).toPromise()
  }

}
