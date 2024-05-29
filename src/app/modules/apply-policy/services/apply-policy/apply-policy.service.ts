import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApplyPolicyService {

  constructor(private http:HttpClient) { }

   createApplyPolicyData(data:any){
    return this.http.post('http://localhost:4000/api/applyPolicy/applyPolicy/create',data).toPromise()
   }

   
   getAllApplyPolicyData(){
    return this.http.get('http://localhost:4000/api/applyPolicy/applyPolicy/getAll').toPromise()
  }

  singleApplyPolicydetail(id:any){
    return this.http.get(`http://localhost:4000/api/applyPolicy/applyPolicy/get/${id}`).toPromise()

  }
  updateApplyPolicyDetail(data: any) {
    return this.http.put(`http://localhost:4000/api/applyPolicy/applyPolicy/update/${data._id}`, data).toPromise()
  }
  
  getAllApplyPolicyPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/applyPolicy/applyPolicy/getAll/${skip}/${itemsPerPage}`).toPromise()
  }
  
  updatedManyApplyPolicy(data: any) {
    return this.http.put(`http://localhost:4000/api/applyPolicy/applyPolicy/update`, data).toPromise()
  }

  
  getAllApplyPolicyDetailsPageFilter(filter?:any,skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://localhost:4000/api/applyPolicy/applyPolicy/getAll/${skip}/${itemsPerPage}`, {filter:filter}).toPromise()

  }

}
