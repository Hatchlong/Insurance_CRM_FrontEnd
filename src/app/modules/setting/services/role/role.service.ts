import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RoleService {


  constructor(
    private http: HttpClient
  ) { }


  createroles(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://54.151.187.67:4004/api/master/roles/create', data,{headers}).toPromise()
  }

  getAllrolesDetails() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://54.151.187.67:4004/api/master/roles/getAll',{headers}).toPromise()
  }

  singlerolesDetails(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://54.151.187.67:4004/api/master/roles/get/${id}`,{headers}).toPromise()
  }
  updateroles(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://54.151.187.67:4004/api/master/roles/update/${data._id}`, data,{headers}).toPromise()
  }
  getAllrolesDetailsPage(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://54.151.187.67:4004/api/master/roles/getAll/${skip}/${itemsPerPage}`,{headers}).toPromise()
  }

  updaterolesDetailMany(data: any) {
    return this.http.put(`http://54.151.187.67:4004/api/master/roles/update`, data).toPromise()
  }

  getAllRolesDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://54.151.187.67:4004/api/master/roles/getAll/${skip}/${itemsPerPage}`, { filter: filter ,headers}).toPromise()

  }


  getAllRolesAccessDetails(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4004/api/master/rolesAccess/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  createScreenAccess(data: any) {
    return this.http.post('http://54.151.187.67:4004/api/master/rolesAccess/create', data).toPromise()
  }

  singleRolesDetails(id: any) {
  
    return this.http.get(`http://54.151.187.67:4004/api/master/rolesAccess/get/${id}`).toPromise()
  }

  
  updateRolesDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4004/api/master/rolesAccess/update/${data._id}`, data).toPromise()
  }
}
