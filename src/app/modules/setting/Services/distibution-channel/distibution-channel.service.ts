import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx'


@Injectable({
  providedIn: 'root'
})
export class DistibutionChannelService {

  constructor(
    private http: HttpClient
  ) { } 
 

  createDistibutionChannelDetails(data:any){
    return this.http.post('http://54.151.187.67:4000/api/master/distributionChannel/create', data).toPromise()
  }
 
  getAllDistibutionChannelDetails(){
    return this.http.get('http://54.151.187.67:4000/api/master/distributionChannel/getAll').toPromise()
  }
 
  singleDistibutionChannel(id:any){
    return this.http.get(`http://54.151.187.67:4000/api/master/distributionChannel/get/${id}`).toPromise()
  } 
 
  updateDistibutionChannel(data:any){
    return this.http.put(`http://54.151.187.67:4000/api/master/distributionChannel/update/${data._id}`, data).toPromise()
  }

  fileUploadXlsx(data:any){
    return this.http.post(`http://54.151.187.67:4000/api/master/distributionChannel/upload`, data).toPromise()
  }

  updatedManydistributionChannelDetails(data:any){
    return this.http.put(`http://54.151.187.67:4000/api/master/distributionChannel/update`, data).toPromise()
  }

  getAlldistributionChannelDetailsPage(skip?: any, itemsPerPage?: any){
    return this.http.get(`http://54.151.187.67:4000/api/master/distributionChannel/getAll/${skip}/${itemsPerPage}`).toPromise()
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
 
}
