import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  constructor(
    private http:HttpClient
  ) { }


  getCountryDetails(){
    return this.http.get('assets/country.json').toPromise();
  }
}
