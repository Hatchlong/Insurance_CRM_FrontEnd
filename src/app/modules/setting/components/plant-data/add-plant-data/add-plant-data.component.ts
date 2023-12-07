import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
<<<<<<< HEAD
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
=======
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22

@Component({
  selector: 'app-add-plant-data',
  templateUrl: './add-plant-data.component.html',
  styleUrls: ['./add-plant-data.component.css']
})
export class AddPlantDataComponent {
<<<<<<< HEAD
  plantFormData: any= FormGroup;
  countryDetials: any= []
  citiesDetails: any = []
  languageName: any = []
=======
  plantFormData: any = FormGroup;
  countryDetials: any = []
  citiesDetails: any = []
  languageName: any = ''

  constructor(private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private companyCodeSer: CompanyCodeService
  ) { }
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22

  constructor (private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private companyCodeSer: CompanyCodeService
    ){}
 
  ngOnInit(): void {
    this.getCountryDetails()
    this.plantData()
  }

<<<<<<< HEAD
  plantData(){
    this.plantFormData =  this.fb.group({
      plantCode:['', Validators.required],
      name1:['', Validators.required], 
      name2:['', Validators.required],
      languageId:['', Validators.required],
      address:['', Validators.required],
      countryId:['', Validators.required],
      cityId:['', Validators.required],

      contactPersonName:['', Validators.required],
      contactNumber:['', Validators.required],
      timeZone:['', Validators.required],
      searchTerm:['', Validators.required],
      customerNo_plant:['', Validators.required],
      vendorNumberPlant:['', Validators.required],
      purchaseOrganizationId:['', Validators.required],
      salesOrganizationId:['', Validators.required],
      taxIndicatorId:['', Validators.required],
      stoargeLocationId:['', Validators.required],
     })
=======
  plantData() {
    this.plantFormData = this.fb.group({
      plantCode: ['', Validators.required],
      name1: ['', Validators.required],
      name2: ['', Validators.required],
      languageId: ['', Validators.required],
      address: ['', Validators.required],
      countryId: ['', Validators.required],
      cityId: ['', Validators.required],

      contactPersonName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      timeZone: ['', Validators.required],
      searchTerm: ['', Validators.required],
      customerNo_plant: ['', Validators.required],
      vendorNumberPlant: ['', Validators.required],
      purchaseOrganizationId: ['', Validators.required],
      salesOrganizationId: ['', Validators.required],
      taxIndicatorId: ['', Validators.required],
      stoargeLocationId: ['', Validators.required],
    })
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
  }

  // Create the purchase org Details

<<<<<<< HEAD
  async submitData(){
  try {
    if(this.plantFormData.invalid)
      return alert('Please fill all the fields');
    const result: any = await this.plantDataSer.createPlantDataDetails(this.plantFormData.value);
    console.log(result)
    if(result.status==='1'){
      alert(result.message);
      this.router.navigate(['/settings/plant-data-list']);
      return;
    }
    if (result.status==='0')
      return alert(result.message);
  } catch (error) {
      console.log(error) 
  }
  }
 

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
=======
  async submitData() {
    try {
      if (this.plantFormData.invalid)
        return alert('Please fill all the fields');
      const result: any = await this.plantDataSer.createPlantDataDetails(this.plantFormData.value);
      console.log(result)
      if (result.status === '1') {
        alert(result.message);
        this.router.navigate(['/settings/plant-data-list']);
        return;
      }
      if (result.status === '0')
        return alert(result.message);
    } catch (error) {
      console.log(error)
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
    }
  }

  
  async getSingleLanguage(id:any) {
    try {
      const result: any = await this.companyCodeSer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }  

<<<<<<< HEAD
  selectCountryName(event:any){
    console.log(event.target.value)
    this.citiesDetails = this.countryDetials.find((el:any) => el._id === event.target.value);
    this.plantFormData.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)
}
=======
  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }

//get language acc to id
  async getSingleLanguage(id: any) {
    try {
      const result: any = await this.companyCodeSer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName
      } else {
        alert('API failed')
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }
//dependent dropdown
  selectCountryName(event: any) {
    console.log(event.target.value)
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    // this.companyCode.controls.currency.setValue(this.citiesDetails?.countryCurrency)
    this.plantFormData.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)
  }
>>>>>>> ee783a2d28979cdfdf5147755ba07815d5dc7c22
}
