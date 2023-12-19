import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../../services/country/country.service';
import Swal from 'sweetalert2';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeOfTransportService } from 'src/app/modules/setting/Services/mode-of-transport/mode-of-transport.service';
import { IncTermService } from 'src/app/modules/setting/Services/inc-term/inc-term.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent {
  vendorFormGroup: any = FormGroup
  vendorDetials: any = []
  countryDetails: any = []
  languageName: any = []
  incrementTreamsName: any = []
  modeOfTransportName: any = []
  isSubmitted:any=false
  citiesDetails: any = []
  vendorId:any= ''
  motDetails: any = []
  incoDetails: any =[]

  constructor(
    private fb: FormBuilder,
    private countrySer:CountryService,
    private companySer:CompanyCodeService,
    private vendorSer: VendorService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private motSer: ModeOfTransportService,
    private incoSer: IncTermService
  ) { }  

  ngOnInit(): void {
    this.vendorId = this.activateRouter.snapshot.paramMap.get('id')
    this.createVendorFormFields()
    this.getCountryDetails()
    this.getMOTDetail()
    this.getIncoTermsDetail()
    this.getSingleVendorDetails()
  }

  createVendorFormFields() {
    this.vendorFormGroup = this.fb.group({
            vendorName: ['', Validators.required],
            accountGroup: ['', Validators.required],
            addressCountry: ['', Validators.required],
            languageId: ['', Validators.required],
            languageName: ['', Validators.required],
            modeOfTransportId: ['',Validators.required],
            modeOfTransportName: ['', Validators.required],
            incrementTreamsId: ['', Validators.required],
            incrementTreamsName: ['', Validators.required],
            countryId: ['', Validators.required],
            countryName: ['', Validators.required],
            financialData: this.fb.array([this.getFinancialFields()])
          })
  }

  getFinancialFields(): FormGroup {
    return this.fb.group({
      financialTax1: [''],
      financialTax2: [''],
      vatRegistrationNo: [''],
      currency:[''],
      companyCode: [''],
      bankCountry: [''],
      bankKey: [''],
      bankAccount: [''],
      referenceDetails: [''],
      accountHolder: [''],
      backDetailsValidFrom: [''],
      backDetailsValidTo:[''],
      reconciliationAccount:[''],
      paymentMethod:[''],
      paymentTerms:[''],      
    })
  }

  async submitData() {
    try {
      this.isSubmitted = true
      const userName:any = localStorage.getItem('userName')
      this.vendorFormGroup.value.createdOn = '18/12/2023'
      this.vendorFormGroup.value.createdBy = userName
      this.vendorFormGroup.value.changedOn = '18/12/2023'
      this.vendorFormGroup.value.changedBy = userName
      console.log(this.vendorFormGroup.value)
      if (this.vendorFormGroup.invalid){
        Swal.fire({
          title: 'warning',
          text: 'All Field Are Required',
          icon: 'warning',
          showCancelButton: true
        })
        return
      }
      const result: any = await this.vendorSer.updateVendor(this.vendorFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Vendor Processed Successfully ',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/master/vendor'])
        return
      }
      if (result.status === '0')
        return alert(result.message);

    } catch (error) {
      console.error(error);
    }
  }

  get financialListArray() {
    return this.vendorFormGroup.get('financialData') as FormArray
  }
  
  addFinancial() {
    this.financialListArray.push(this.getFinancialFields());
    console.log(this.financialListArray.value)
  }

  deleteFinancial(index: any) {
    this.financialListArray.removeAt(index)
  }

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companySer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetails = result.data;
      } else {
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
      Swal.fire({
        title: 'warning',
        text: 'API Failed',
        icon: 'warning',
        showCancelButton: true
      })
    }
  }
 
  //  single details for Language Detials
   async getSingleLanguage(id: any) {
    try {
      const result: any = await this.companySer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName
        this.vendorFormGroup.controls.languageName.setValue(result.data.languageName)
      } else {
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
      Swal.fire({
        title: 'warning',
        text: 'API Failed',
        icon: 'warning',
        showCancelButton: true
      })
    }
  }

  async getSingleVendorDetails(){
    try {
      const result : any = await this.vendorSer.singleVendor(this.vendorId)
      if(result.status === '1'){
        console.log(result)
        this.languageName = result.data.languageName
        this.vendorFormGroup.patchValue(result.data)
        console.log(result.data, this.vendorFormGroup.value.country, this.countryDetails)
        this.vendorFormGroup.controls.languageId.setValue(this.citiesDetails.languageId)
      }
    } catch (error) {
      console.log(error);
    }
  }

  selectCountryName(event: any) {
    console.log(event.target.value)
    this.citiesDetails = this.countryDetails.find((el: any) => el._id === event.target.value);
    this.vendorFormGroup.controls.countryName.setValue(this.citiesDetails.countryName)
    // this.vendorFormGroup.controls.currency.setValue(this.citiesDetails?.countryCurrency)
    this.vendorFormGroup.controls.languageName.setValue(this.countryDetails.languageName)
    this.vendorFormGroup.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)
  }    

    // get MOT organization

    async getMOTDetail() {
      try {
        const result: any = await this.motSer.getAllModeOfTransportDetails()
        if (result.status === '1') {
          this.motDetails = result.data
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

      // Add the MOT Name
  handleMOT(event: any) {
    const findMOTDetail = this.motDetails.find((el: any) => el._id === event.target.value);
    this.vendorFormGroup.controls.modeOfTransportName.setValue(findMOTDetail.modeOfTransport)
  }
 
    // get INCO TERMS organization

    async getIncoTermsDetail() {
      try {
        const result: any = await this.incoSer.getAllIncTermsDetails()
        console.log(result)
        if (result.status === '1') {
          this.incoDetails = result.data
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

     // Add the inco Name
  handleInco(event: any) {
    const findIncoDetail = this.incoDetails.find((el: any) => el._id === event.target.value);
    console.log(findIncoDetail)
    this.vendorFormGroup.controls.incrementTreamsName.setValue(findIncoDetail.inc_terms_code)
  }

}


