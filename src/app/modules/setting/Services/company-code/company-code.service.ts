import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyCodeService {

  constructor(
    private http: HttpClient
  ) { }

 
  createCompanyCodeDetails(data:any){
    return this.http.post('http://localhost:4000/api/master/companycode/create', data).toPromise()
  }

  getAllCompanyCodeDetails(){ 
    return this.http.get('http://localhost:4000/api/master/companycode/getAll').toPromise()
  }
}
