import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IncTermService {

  constructor(private http: HttpClient) { }

  createIncTerms(data: any) {
    return this.http.post('http://54.151.187.67:4000/api/master/incterms/create', data).toPromise()
  }

  getAllIncTermsDetails() {
    return this.http.get('http://54.151.187.67:4000/api/master/incterms/getAll').toPromise()
  }

  singleIncTermsDetails(id: any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/incterms/get/${id}`).toPromise()
  }

  updatedIncTermsDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/incterms/update/${data._id}`, data).toPromise()

  }
}
