import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../../services/country/country.service';
import Swal from 'sweetalert2';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeOfTransportService } from 'src/app/modules/setting/Services/mode-of-transport/mode-of-transport.service';
import { IncTermService } from 'src/app/modules/setting/Services/inc-term/inc-term.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent {
  vendorFormGroup: any = FormGroup
  vendorDetials: any = []
  countryDetails: any = []
  languageName: any = ''
  isSubmitted: any = false
  citiesDetails: any = [];
  vendorId: any = ''
  motDetails: any = []
  incoDetails: any = []

  constructor(
    private fb: FormBuilder,
    private countrySer: CountryService,
    private companySer: CompanyCodeService,
    private vendorSer: VendorService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private motSer: ModeOfTransportService,
    private incoSer: IncTermService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.vendorId = this.activateRouter.snapshot.paramMap.get('id')
    this.createVendorFormFields()
    this.getCountryDetails()
    this.getSingleVendorDetails()
    this.getMOTDetail()
    this.getIncoTermsDetail()
  }

  createVendorFormFields() {
    this.vendorFormGroup = this.fb.group({
      _id: ['', Validators.required],
      vendorName: ['', Validators.required],
      accountGroup: ['', Validators.required],
      addressCountry: ['', Validators.required],
      language: ['', Validators.required],

      modeOfTransport: ['', Validators.required],
      incrementTreams: ['', Validators.required],
      country: ['', Validators.required],
      financialData: this.fb.array([this.getFinancialFields()])
    })
  }

  getFinancialFields(): FormGroup {
    return this.fb.group({
      financialTax1: [''],
      financialTax2: [''],
      vatRegistrationNo: [''],
      currency: [''],
      companyCode: [''],
      bankCountry: [''],
      bankKey: [''],
      bankAccount: [''],
      referenceDetails: [''],
      accountHolder: [''],
      backDetailsValidFrom: [''],
      backDetailsValidTo: [''],
      reconciliationAccount: [''],
      paymentMethod: [''],
      paymentTerms: [''],


    })
  }

  async submitData() {
    try {
      this.isSubmitted = true
      const userName: any = localStorage.getItem('userName')
      this.vendorFormGroup.value.createdOn = '18/12/2023'
      this.vendorFormGroup.value.createdBy = userName
      this.vendorFormGroup.value.changedOn = '18/12/2023'
      this.vendorFormGroup.value.changedBy = userName
      if (this.vendorFormGroup.invalid)
        return
      const result: any = await this.vendorSer.updateVendor(this.vendorFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, 'Success', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/vendor'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }


  get financialListArray() {
    return this.vendorFormGroup.get('financialData') as FormArray
  }

  addFinancial() {
    this.financialListArray.push(this.getFinancialFields());
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

        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  //  single details for Language Detials
  async getSingleLanguage(id: any) {
    try {
      const result: any = await this.companySer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName
        // this.vendorFormGroup.controls.languageName.setValue(result.data.language)
      } else {

        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
    } catch (error: any) {

      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getSingleVendorDetails() {
    try {
      const result: any = await this.vendorSer.singleVendor(this.vendorId)
      if (result.status === '1') {
        this.vendorFormGroup.patchValue(result.data)
        this.citiesDetails = this.countryDetails.find((el: any) => el._id === this.vendorFormGroup.value.country)
        // this.vendorFormGroup.controls.currency.setValue(this.citiesDetails?.countryCurrency)
        this.vendorFormGroup.controls.language.setValue(this.citiesDetails.languageId)
        this.getSingleLanguage(this.citiesDetails.languageId)
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetails.find((el: any) => el._id === event.target.value);
    this.vendorFormGroup.controls.language.setValue(this.citiesDetails.languageId)
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
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }

  // Add the MOT Name
  handleMOT(event: any) {
    const findMOTDetail = this.motDetails.find((el: any) => el._id === event.target.value);
    this.vendorFormGroup.controls.purchaseOrganizationName.setValue(findMOTDetail.modeOfTransport)
  }

  // get INCO TERMS organization

  async getIncoTermsDetail() {
    try {
      const result: any = await this.incoSer.getAllIncTermsDetails()
      if (result.status === '1') {
        this.incoDetails = result.data
      }
      else {
        // alert("API FAiled")
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
      this._snackBar.open('Something went wrong', 'Error', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }

  // Add the inco Name
  handleInco(event: any) {
    const findIncoDetail = this.incoDetails.find((el: any) => el._id === event.target.value);
    this.vendorFormGroup.controls.incoTermsName.setValue(findIncoDetail.incrementTreams)
  }

}
