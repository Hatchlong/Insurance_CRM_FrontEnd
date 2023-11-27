import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CompanyCodeService {

  constructor(
    private http: HttpClient
  ) { }

  getAllCompanyCodeDetails(){
    return this.http.get('http://localhost:4000/api/master/companycode/getAll').toPromise()
  }
}
