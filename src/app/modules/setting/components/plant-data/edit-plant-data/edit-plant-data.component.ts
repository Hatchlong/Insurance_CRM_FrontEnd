import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';


@Component({
  selector: 'app-edit-plant-data',
  templateUrl: './edit-plant-data.component.html',
  styleUrls: ['./edit-plant-data.component.css']
})
export class EditPlantDataComponent {
  plantsData: any = FormGroup
  plantDetails: any = [];
  plantDataId: any = []
  countryDetials: any = []
  citiesDetails: any = []
  languageName: any = ''
  purDetails: any = []

  constructor(
    private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private companyCodeSer: CompanyCodeService,
    private purOrgSer: PurchaseOrgService

  ) { }

  ngOnInit(): void {
    this.plantDataId = this.activeRouter.snapshot.paramMap.get('id');
    this.plantData()
    this.getCountryDetails()
    this.getPurchaseOrgDetail()
    this.getSinglePlantDataDetails()



  }

  plantData() {
    this.plantsData = this.fb.group({
      _id: ['', Validators.required],
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
      purchase_org: ['', Validators.required],
      salesOrganizationId: ['', Validators.required],
      taxIndicatorId: ['', Validators.required],
      stoargeLocationId: ['', Validators.required],
    })
  }

  // update

  async getSinglePlantDataDetails() {
    try {
      const result: any = await this.plantDataSer.singlePlantData(this.plantDataId)
      if (result.status === '1') {
        this.plantsData.patchValue(result.data)
        this.citiesDetails = this.countryDetials.find((el: any) => el._id === this.plantsData.value.countryId);
        this.plantsData.controls.languageId.setValue(this.citiesDetails.languageId)

        this.getSingleLanguage(this.citiesDetails.languageId)
        

      }
    } catch (error) {
      console.error(error)
    }
  }



  // Create the plant data Details

  async submitData() {
    try {
      if (this.plantsData.invalid)
        return alert('Please fill all the fields');
      const result: any = await this.plantDataSer.updatePlantData(this.plantsData.value);
      if (result.status === '1') {
        alert(result.message);
        this.router.navigate(['/settings/plant-data-list']);
        return;
      }
      if (result.status === '0')
        return alert(result.message);
    } catch (error) {
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
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }

  // get purchase organization

  async getPurchaseOrgDetail() {
    try {
      const result: any = await this.purOrgSer.getAllPurchaseOrgDetails()
      if (result.status === '1') {
        this.purDetails = result.data
      }
      else {
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
    } catch (error) {
      console.error(error)
      alert('API failed')
    }
  }

  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    this.plantsData.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)
  }


}
