import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PospService {

  constructor(private http: HttpClient) { }

  createAgentReport(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/master/agent_report/create', data, { headers }).toPromise()
  }
  getAllAgentReportDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/master/agent_report/getAll', { headers }).toPromise()

  }
  singleAgentReportDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/master/agent_report/get/${id}`, { headers }).toPromise()

  }

  updateAgentReportDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/master/agent_report/update/${data._id}`, data, { headers }).toPromise()
  }

  getAllAgentReportsPage(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/master/agent_report/getAll/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }


  getAllAgentReportDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/master/agent_report/getAll/${skip}/${itemsPerPage}`, { filter: filter }, { headers }).toPromise()

  }

  deleteAgentReportDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/master/agent_report/delete/${data._id}`, data, { headers }).toPromise()
  }
}
