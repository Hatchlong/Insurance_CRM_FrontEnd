import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PolicyPlanService {

  constructor(private http: HttpClient) { }

  createPolicyPlan(data: any) {
    return this.http.post('http://54.151.187.67:4003/api/master/policyPlan/create', data).toPromise()
  }

  getAllPolicyPlan() {
    return this.http.get('http://54.151.187.67:4003/api/master/policyPlan/getAll').toPromise()
  }

  singlePolicyDetail(id: any) {
    return this.http.get(`http://54.151.187.67:4003/api/master/policyPlan/get/${id}`).toPromise()

  }
  updatePolicyPlanDetail(data: any) {
    return this.http.put(`http://54.151.187.67:4003/api/master/policyPlan/update/${data._id}`, data).toPromise()
  }

  getAllpolicyPlanDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://54.151.187.67:4003/api/master/policyPlan/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatedManypolicyPlanDetails(data: any) {
    return this.http.put(`http://54.151.187.67:4003/api/master/policyPlan/update`, data).toPromise()
  }


  getAllpolicyPlanDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    return this.http.post(`http://54.151.187.67:4003/api/master/policyPlan/getAll/${skip}/${itemsPerPage}`, { filter: filter }).toPromise()

  }

}
