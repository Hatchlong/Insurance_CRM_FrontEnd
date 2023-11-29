import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

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

}