import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthrService {

  constructor(
    private http:HttpClient
  ) { }



  createUser(data:any){
    return this.http.post('http://localhost:4000/api/auth/user/create', data).toPromise()
  }


  loginUser(data:any){
    return this.http.post('http://localhost:4000/api/auth/user/login', data).toPromise()
  }}
