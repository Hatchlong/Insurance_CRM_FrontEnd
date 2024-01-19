import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as XLSX from 'xlsx';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient
  ) { }

  createProduct(data: any) {
    return this.http.post('http://localhost:4000/api/master/product/create', data).toPromise()
  }

  getAllProductDetails() {
    return this.http.get('http://localhost:4000/api/master/product/getAll').toPromise()
  }


  singleProductDetails(id: any) {
    return this.http.get(`http://localhost:4000/api/master/product/get/${id}`).toPromise()
  }

  updatedProductDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/product/update/${data._id}`, data).toPromise()
  }

  getAllIndustrySectorDetails() {
    return this.http.get('http://localhost:4000/api/config/industrySector/getAll').toPromise()
  }
  getAllStorageConditionsDetails() {
    return this.http.get('http://localhost:4000/api/config/storageConditions/getAll').toPromise()
  }
  getAllTemperatureConditionsDetails() {
    return this.http.get('http://localhost:4000/api/config/temperature/getAll').toPromise()
  }
  getAllTransportationGroupDetails() {
    return this.http.get('http://localhost:4000/api/config/transport/getAll').toPromise()
  }
  getAllprocurementTypeDetails() {
    return this.http.get('http://localhost:4000/api/config/procurement/getAll').toPromise()
  }
  getAllProfitCenterDetails() {
    return this.http.get('http://localhost:4000/api/config/profitcenter/getAll').toPromise()
  }

  getAllAcctAssignDetails() {
    return this.http.get('http://localhost:4000/api/config/acctAssign/getAll').toPromise()
  }

  getAllMaterialGroupDetails() {
    return this.http.get('http://localhost:4000/api/config/materialGroup/getAll').toPromise()
  }
  getAllWeightUnitDetails() {
    return this.http.get('http://localhost:4000/api/config/weightUnit/getAll').toPromise()

  }
  getAllUOMDetails() {
    return this.http.get('http://localhost:4000/api/config/uom/getAll').toPromise()
  }
  getAllMaterialTypeDetails() {
    return this.http.get('http://localhost:4000/api/config/materialType/getAll').toPromise()
  }



  updatedManyProductDetails(data: any) {
    return this.http.put(`http://localhost:4000/api/master/product/update`, data).toPromise()
  }

  exportToExcel(data: any[], fileName: string, sheetName: string): void {

    const plantData: any = [];
    const salesData: any = []
    data.map((el: any) => {
      el.plantData.map((ele: any) => {
        ele.materialId = el.materialId;
        plantData.push(ele)
      })
      el.salesData.map((ele: any) => {
        ele.materialId = el.materialId;
        salesData.push(ele)
      })

    })
    data.map((el: any) => {
      delete el.isLock;
      delete el.isActive;
      delete el.__v;
      delete el.check;
      delete el.plantData
      delete el.salesData
    })
    const workbook: XLSX.WorkBook = XLSX.utils.book_new();

    // Add sheets to the workbook
    const sheet1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data);
    XLSX.utils.book_append_sheet(workbook, sheet1, 'Product_Data');

    const sheet2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(plantData);
    XLSX.utils.book_append_sheet(workbook, sheet2, 'Plant_Data');

    const sheet3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(salesData);
    XLSX.utils.book_append_sheet(workbook, sheet3, 'Sales_Data');

    XLSX.writeFile(workbook, `${fileName}.xlsx`);
  }
  getAllProductDetailsPage(skip?: any, itemsPerPage?: any) {
    return this.http.get(`http://localhost:4000/api/master/product/getAll/${skip}/${itemsPerPage}`).toPromise()

  }
  fileUploadXlsx(data: any) {
    return this.http.post(`http://localhost:4000/api/master/product/upload`, data).toPromise()
  }
  
  getAllBatchManagmentDetails() {
    return this.http.get('http://localhost:4000/api/config/batch/getAll').toPromise()
  }
  getAllAvailibityCheckDetails(){
    return this.http.get('http://localhost:4000/api/config/availibityCheck/getAll').toPromise()

  }
  getAllBOMRelevanceDetails(){
    return this.http.get('http://localhost:4000/api/config/BOM/getAll').toPromise()

  }
  getAllExpirationRelavanceDetails(){
    return this.http.get('http://localhost:4000/api/config/expirationData/getAll').toPromise()

  }

}
