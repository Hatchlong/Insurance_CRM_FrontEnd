import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyCodeService {

  constructor(
    private http: HttpClient
  ) { }
  
  createComapnyCodeDetail(data: any){
    return this.http.post('http://localhost:4000/api/master/company/create',data).toPromise()
   }

<<<<<<< HEAD
   getAllCompanyCodeDetail(){
=======
 
  createCompanyCodeDetails(data:any){
    return this.http.post('http://localhost:4000/api/master/companycode/create', data).toPromise()
  }

  getAllCompanyCodeDetails(){ 
>>>>>>> 67f2481a78151d4bcd6bf3dcc1be61c63b917ce4
    return this.http.get('http://localhost:4000/api/master/companycode/getAll').toPromise()
  }


}
