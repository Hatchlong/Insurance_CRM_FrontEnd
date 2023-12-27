import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'


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
  
  updatedManymodeoftransportDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/modeoftransport/update`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    data.map((el: any) => {
      // delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }
  getAllmodeoftransportDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/master/modeoftransport/getAll/${skip}/${itemsPerPage}`).toPromise()

  }
  fileUploadXlsx(data: any) {
    return this.http.post(`http://localhost:4000/api/master/modeoftransport/upload`, data).toPromise()
  }

}
