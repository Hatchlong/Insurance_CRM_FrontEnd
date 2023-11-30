import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlantDataService {

  constructor(
<<<<<<< HEAD
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
=======
    private http: HttpClient
  ) { }


  createPlantDataDetails(data: any) {
    return this.http.post('http://localhost:4000/api/master/plantData/create', data).toPromise()
  }

  getAllPlantData() {
    return this.http.get('http://localhost:4000/api/master/plantData/getAll').toPromise()
  }

  singlePlantData(id: any) {
    return this.http.get(`http://localhost:4000/api/master/plantData/get/${id}`).toPromise()
  }


  updatePlantData(data: any) {
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
    return this.http.put(`http://localhost:4000/api/master/plantData/update/${data._id}`, data).toPromise()
  }


<<<<<<< HEAD
   // Get Country Detials
   getAllCountryDetails(){
    return this.http.get('http://localhost:4000/api/master/country/getAll').toPromise()
  }

   // Single Language API Details
   singleLanguageDetails(id:any){
=======
  // Get Country Detials
  getAllCountryDetails() {
    return this.http.get('http://localhost:4000/api/master/country/getAll').toPromise()
  }

  // Single Language API Details
  singleLanguageDetails(id: any) {
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
    return this.http.get(`http://localhost:4000/api/master/language/get/${id}`).toPromise()
  }

}
<<<<<<< HEAD

=======
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
