import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModeOfTransportService {

  constructor(private http: HttpClient) { }

  createModeOfTransport(data: any) {
    return this.http.post('http://localhost:4000/api/master/modeoftransport/create', data).toPromise()
  }

  getAllModeOfTransportDetails() {
    return this.http.get('http://localhost:4000/api/master/modeoftransport/getAll').toPromise()
  }

  singleModeOfTransportDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/modeoftransport/get/${id}`).toPromise()
  }

  updatedModeOfTransportDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/modeoftransport/update/${data._id}`, data).toPromise()

  }
}
