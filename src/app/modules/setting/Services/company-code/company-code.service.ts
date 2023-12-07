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
<<<<<<< HEAD
  getAllCountryDetails() {
=======
<<<<<<< HEAD
  getAllCountryDetails(){
=======
<<<<<<< HEAD
  getAllCountryDetails() {
=======
  getAllCountryDetails(){
>>>>>>> 8182030ed50a1adf198a3ea6bde1554ab0e0db49
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
>>>>>>> 2ead3065ec0f809e5b01a136a92336d398475a72
    return this.http.get('http://localhost:4000/api/master/country/getAll').toPromise()
  }

  // Single Language API Details
<<<<<<< HEAD
=======
<<<<<<< HEAD
  singleLanguageDetails(id:any){
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }


  singleCompanyCode(id:any){
        return this.http.get(`http://localhost:4000/api/master/companycode/get/${id}`).toPromise()
      }
    
      updateCompanyCode(data:any){
        return this.http.put(`http://localhost:4000/api/master/companycode/update/${data._id}`, data).toPromise()
      }


}
=======
<<<<<<< HEAD
>>>>>>> 2ead3065ec0f809e5b01a136a92336d398475a72
  singleLanguageDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }

}
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
