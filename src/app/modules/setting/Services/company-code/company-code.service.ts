import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyCodeService {

  constructor(
    private http: HttpClient
  ) { }

<<<<<<< HEAD
  createCompanyCodeDetails(data: any) {
    return this.http.post('http://localhost:4000/api/master/companycode/create', data).toPromise()
  }

  getAllCompanyCodeDetails() {
=======
 
  createCompanyCodeDetails(data:any){
    return this.http.post('http://localhost:4000/api/master/companycode/create', data).toPromise()
  }

  getAllCompanyCodeDetails(){ 
>>>>>>> 8182030ed50a1adf198a3ea6bde1554ab0e0db49
    return this.http.get('http://localhost:4000/api/master/companycode/getAll').toPromise()
  }


  // Get Country Detials
<<<<<<< HEAD
  getAllCountryDetails(){
=======
<<<<<<< HEAD
  getAllCountryDetails() {
=======
  getAllCountryDetails(){
>>>>>>> 8182030ed50a1adf198a3ea6bde1554ab0e0db49
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
    return this.http.get('http://localhost:4000/api/master/country/getAll').toPromise()
  }

  // Single Language API Details
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
  singleLanguageDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }

=======
  singleLanguageDetails(id:any){
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }
>>>>>>> 8182030ed50a1adf198a3ea6bde1554ab0e0db49
}
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
