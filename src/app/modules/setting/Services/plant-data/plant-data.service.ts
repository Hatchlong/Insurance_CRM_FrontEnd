import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class PlantDataService {

  constructor(
    private http: HttpClient 
  ) { }
 

  createPlantDataDetails(data: any){
    return this.http.post('http://localhost:4000/api/master/plantData/create',data).toPromise()
  }

  getAllPlantData(){
    return this.http.get('http://localhost:4000/api/master/plantData/getAll').toPromise()
  } 

  singlePlantData(id:any){
    return this.http.get(`http://localhost:4000/api/master/plantData/get/${id}`).toPromise()
  }

  
  updatePlantData(data:any){
    return this.http.put(`http://localhost:4000/api/master/plantData/update/${data._id}`, data).toPromise()
  }


   // Get Country Detials
   getAllCountryDetails(){
    return this.http.get('http://localhost:4000/api/master/country/getAll').toPromise()
  }

   // Single Language API Details
   singleLanguageDetails(id:any){
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }

  // get All Tax Indicators
  getAllTaxDetails(){
    return this.http.get('http://localhost:4000/api/config/tax/getAll').toPromise()
  }

   // get All Storage Location
   getAllStorageLocationsDetails(){
    return this.http.get('http://localhost:4000/api/config/storageLocation/getAll').toPromise()
  }

  //get All Time Zone
  getAllTimeZoneDetails(){
    return this.http.get('http://localhost:4000/api/config/timeZone/getAll').toPromise()
  }  

  
  fileUploadPlantData(data: any) {
    return this.http.post(`http://localhost:4000/api/master/plantData/upload`, data).toPromise()
  }
  exportToExcel(data: any[], fileName: string, sheetName: string): void {
    const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  }

  getAllplantdataDetailsPage(skip?:any, itemsPerPage?:any) {
    return this.http.get(`http://localhost:4000/api/master/plantData/getAll/${skip}/${itemsPerPage}`).toPromise()
  }

  updatePlantDataMany(data: any) {
    return this.http.put(`http://localhost:4000/api/master/plantData/update`, data).toPromise()
  }




}
