import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import Swal from 'sweetalert2';

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
  purDetails: any = [];
  taxDetails: any = [];
  storgaeLocationDetails: any = [];
  isSubmitted:any = false;
 
  constructor(private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private companyCodeSer: CompanyCodeService,
    private purOrgSer: PurchaseOrgService
  ) { }

  ngOnInit(): void {
    this.getCountryDetails()
    this.plantData()
    this.getPurchaseOrgDetail()
    this.getStorageLocationDetail();
    this.getTaxIndicatorDetail()

  }

  plantData() {
    this.plantFormData = this.fb.group({
      plantCode: ['', Validators.required],
      name1: ['', Validators.required],
      name2: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      address: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: [''],
      cityId: ['', Validators.required],
      contactPersonName: ['', Validators.required],
      contactNumber: ['', Validators.required],
      timeZone: ['', Validators.required],
      searchTerm: ['', Validators.required],
      customerNo_plant: ['', Validators.required],
      vendorNumberPlant: ['', Validators.required],
      purchaseOrganizationId: ['', Validators.required],
      purchaseOrganizationName: ['', Validators.required],
      salesOrganizationId: ['', Validators.required],
      salesOrganizationName: ['sales', Validators.required],
      taxIndicatorId: ['', Validators.required],
      taxIndicatorName: ['', Validators.required],
      stoargeLocationId: ['', Validators.required],
      stoargeLocationName: ['', Validators.required]
    })
  }

  // Create the purchase org Details

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.plantFormData.value)
      if (this.plantFormData.invalid)
        return 
      const result: any = await this.plantDataSer.createPlantDataDetails(this.plantFormData.value);
      console.log(result)
      if (result.status === '1') {
        // alert(result.message);
        Swal.fire({
          title: 'success',
          text: 'Plant Data Processed Successfully',
          icon: 'success',
          showCancelButton: true
        })
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
        // alert('API failed')
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      // alert('API failed')
      Swal.fire({
        title: 'warning',
        text: 'API Failed',
        icon: 'warning',
        showCancelButton: true
      })
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


  // get purchase organization

  async getTaxIndicatorDetail() {
    try {
      const result: any = await this.plantDataSer.getAllTaxDetails()
      if (result.status === '1') {
        this.taxDetails = result.data
      }
      else {
        // alert("API FAiled")
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
    } catch (error) {
      console.error(error);

    }
  }

  // get purchase organization

  async getStorageLocationDetail() {
    try {
      const result: any = await this.plantDataSer.getAllStorageLocationsDetails()
      if (result.status === '1') {
        this.storgaeLocationDetails = result.data
      }
      else {
        // alert("API FAiled")
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
    } catch (error) {
      console.error(error);

    }
  }


  async getSingleLanguage(id: any) {
    try {
      const result: any = await this.companyCodeSer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName;
        this.plantFormData.controls.languageName.setValue(result.data.languageName)

      } else {
        // alert('API failed')
        Swal.fire({
          title: 'warning',
          text: 'API Failed',
          icon: 'warning',
          showCancelButton: true
        })
      }
      console.log(result);
    } catch (error) {
      console.error(error)
      // alert('API failed')
      Swal.fire({
        title: 'warning',
        text: 'API Failed',
        icon: 'warning',
        showCancelButton: true
      })
    }
  }

  selectCountryName(event: any) {
    console.log(event.target.value)
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.citiesDetails)
    this.plantFormData.controls.countryName.setValue(this.citiesDetails.countryName)
    this.plantFormData.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)
  }

  // Add the purchase Name
  handlePurchaseOrg(event: any) {
    const findPurchaseDetail = this.purDetails.find((el: any) => el._id === event.target.value);
    this.plantFormData.controls.purchaseOrganizationName.setValue(findPurchaseDetail.purchase_org)
  }

  // Add the purchase Name
  handleTax(event: any) {
    const findPurchaseDetail = this.taxDetails.find((el: any) => el.tax_ind_code === +event.target.value);
    console.log(findPurchaseDetail, this.taxDetails, event.target.value, 'findPurchaseDetail')
    this.plantFormData.controls.taxIndicatorName.setValue(findPurchaseDetail.description)
  }

  // Add the purchase Name
  handleStorageLocation(event: any) {
    const findPurchaseDetail = this.storgaeLocationDetails.find((el: any) => el.stor_loc_id === +event.target.value);
    this.plantFormData.controls.stoargeLocationName.setValue(findPurchaseDetail.description)
  }
}
