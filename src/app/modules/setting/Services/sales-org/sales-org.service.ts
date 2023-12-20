import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesOrgService {

  constructor(private http: HttpClient) { }

  createSalesOrg(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/master/salesorg/create', data).toPromise()
  }

  getAllSalesOrgDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/salesorg/getAll').toPromise()
  }

  singleSalesOrgDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/salesorg/get/${id}`).toPromise()
  }

  updatedSalesOrgDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/salesorg/update/${data._id}`, data).toPromise()

  }

   //get all region 

   getAllRegionDetails(id:any){
    return this.http.get(`http://54.151.187.67:4000/api/config/region/getAll/${id}`).toPromise()
  }
}
