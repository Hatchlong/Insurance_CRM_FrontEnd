import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthrService {

  constructor(
    private http: HttpClient
  ) { }





  logoutUser(data: any) {
    return this.http.post('http://localhost:4000/api/auth/user/logout', data).toPromise()
  }
}
