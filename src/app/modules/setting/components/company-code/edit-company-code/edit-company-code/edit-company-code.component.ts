import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-company-code',
  templateUrl: './edit-company-code.component.html',
  styleUrls: ['./edit-company-code.component.css']
})
export class EditCompanyCodeComponent {
  companyCode: any = FormGroup
  companyDetails: any = [];
  companyCodeId: any = ''
  countryDetials: any = []
  citiesDetails: any = [];
  languageName: any = ''

  constructor(
    private fb: FormBuilder,
    private companyCodeSer: CompanyCodeService,
    private router: Router,
    private activeRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.companyCodeId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.companyCodeId)
    this.getCompanyDetails()
    this.getCountryDetails()
    this.code()
    this.getSingleCompanyCodeDetails()
  }

  code() {
    this.companyCode = this.fb.group({
      _id: ['', Validators.required],
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: ['', Validators.required],
      city: ['', Validators.required],
      currency: ['', Validators.required],
      languageId: ['', Validators.required]
    })
  }

  // update

  async getSingleCompanyCodeDetails() {
    try {
      const result: any = await this.companyCodeSer.singleCompanyCode(this.companyCodeId);
      if (result.status === '1') {
        this.companyCode.patchValue(result.data)
        console.log(result.data, this.companyCode.value.countryId, this.countryDetials)
        this.citiesDetails = this.countryDetials.find((el: any) => el._id === this.companyCode.value.countryId);
        console.log(this.citiesDetails, 'jjjjj')
        this.companyCode.controls.currency.setValue(this.citiesDetails?.countryCurrency)
        this.companyCode.controls.languageId.setValue(this.citiesDetails.languageId)
        this.getSingleLanguage(this.citiesDetails.languageId)
      }
    } catch (error) {
      console.error(error)
    }
  }


  // Create the purchase org Details
  async addCode() {
    try {
      if (this.companyCode.invalid)
        return Swal.fire({
          title: 'warning',
          text: 'All Field Are Required',
          icon: 'warning',
          showCancelButton: true
        })
      const result: any = await this.companyCodeSer.updateCompanyCode(this.companyCode.value);
      console.log(result)
      if (result.status === '1') {
        Swal.fire({
          title: 'success',
          text: 'Successfully Submitted',
          icon: 'success',
          showCancelButton: true
        })
        this.router.navigate(['/settings/company-code-list']);
        return;
      }
      if (result.status === '0')
        return alert(result.message);

    } catch (error) {
      console.error(error)
    }
  }

  // Get All details for company code
  async getCompanyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data
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
      alert('API failed')
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

  // single details for Language Detials
  async getSingleLanguage(id: any) {
    try {
      const result: any = await this.companyCodeSer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName
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
      alert('API failed')
    }
  }

  selectCountryName(event: any) {
    console.log(event.target.value)
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.countryName.setValue(this.citiesDetails.countryName)

    this.companyCode.controls.currency.setValue(this.citiesDetails?.countryCurrency)
    this.companyCode.controls.languageId.setValue(this.citiesDetails.languageId)

    this.getSingleLanguage(this.citiesDetails.languageId)
  }

}