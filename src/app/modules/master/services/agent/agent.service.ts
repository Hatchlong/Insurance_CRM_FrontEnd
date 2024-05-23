import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class AgentService {

  constructor(private http: HttpClient) { }

  createAgent(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post('http://localhost:4000/api/master/agent/create', data, { headers }).toPromise()
  }
  getAllAgentDetail() {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get('http://localhost:4000/api/master/agent/getAll', { headers }).toPromise()

  }
  singleAgentDetail(id: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/master/agent/get/${id}`, { headers }).toPromise()

  }


  updateAgentDetail(data: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.put(`http://localhost:4000/api/master/agent/update/${data._id}`, data, { headers }).toPromise()
  }


  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }



  agentLogoUpload(data: any) {
    return this.http.post('http://localhost:4000/api/upload', data).toPromise()
  }

  getAllagentDetailsPage(skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`http://localhost:4000/api/master/agent/getAll/${skip}/${itemsPerPage}`, { headers }).toPromise()
  }

  updateagentMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/agent/update`, data).toPromise()
  }


  getAllAgentDetailsPageFilter(filter?: any, skip?: any, itemsPerPage?: any) {
    const token: any = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post(`http://localhost:4000/api/master/agent/getAll/${skip}/${itemsPerPage}`, { filter: filter }, { headers }).toPromise()

  }

}
