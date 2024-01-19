import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
}) 
export class PoTypeService {

  constructor(
    private http:HttpClient
  ) { }

  createpoTypeDetail(data:any){
      return this.http.post('http://54.151.187.67:4000/api/master/poType/create',data).toPromise()
      
  }
  getAllPoType(){
    return this.http.get('http://54.151.187.67:4000/api/master/poType/getAll').toPromise()
  }
  singlePoType(id:any){
    return this.http.get(`http://54.151.187.67:4000/api/master/poType/get/${id}`).toPromise()
  }

  updatePoType(data:any){
    return this.http.put(`http://54.151.187.67:4000/api/master/poType/update/${data._id}`,data).toPromise()
  }


  getAllPOTypePage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://54.151.187.67:4000/api/master/poType/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatePOTypeMany(data: any) {
    return this.http.put(`http://54.151.187.67:4000/api/master/poType/update`, data).toPromise()
  }

  fileUploadPOType(data: any) {
    return this.http.post(`http://54.151.187.67:4000/api/master/poType/upload`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    data.map((el: any) => {
      delete el._id;
      delete el.isActive;
      delete el.__v;
      delete el.check;
    })
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

}
