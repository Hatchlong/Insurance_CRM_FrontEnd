import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';

@Component({
  selector: 'app-add-plant-data',
  templateUrl: './add-plant-data.component.html',
  styleUrls: ['./add-plant-data.component.css']
})
export class AddPlantDataComponent {
  plantFormData: any = FormGroup;
  countryDetials: any = []
  citiesDetails: any = []
  languageName: any = []
  purDetails:any=[]

  constructor(private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private companyCodeSer: CompanyCodeService,
    private purOrgSer:PurchaseOrgService
  ) { }

  ngOnInit(): void {
    this.getCountryDetails()
    this.plantData()
    this.getPurchaseOrgDetail()
  }

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
  }

  // Create the purchase org Details

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
    }
  }

    // get purchase organization

    async getPurchaseOrgDetail(){
      try {
        const result:any=await this.purOrgSer.getAllPurchaseOrgDetails()
        if(result.status==='1'){
          this.purDetails=result.data
        }
        else{
          alert("API FAiled")
        }
      } catch (error) {
        console.error(error);
        
      }
    }


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

  selectCountryName(event: any) {
    console.log(event.target.value)
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    this.plantFormData.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)
  }
}
