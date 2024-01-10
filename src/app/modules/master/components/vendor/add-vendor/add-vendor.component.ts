import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms'
import { CountryService } from '../../../services/country/country.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import { Router } from '@angular/router';
import { ModeOfTransportService } from 'src/app/modules/setting/Services/mode-of-transport/mode-of-transport.service';
import { IncTermService } from 'src/app/modules/setting/Services/inc-term/inc-term.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentTermService } from 'src/app/modules/setting/Services/payment-term/payment-term.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {
  vendorFormGroup: any = FormGroup
  vendorDetials: any = []
  countryDetails: any = []
  languageName: any = []
  incrementTreamsName: any = []
  modeOfTransportName: any = []
  isSubmitted: any = false
  citiesDetails: any = []
  motDetails: any = []
  incoDetails: any = []
  payDetails: any = []
  companyCodeDetails: any = []
  currencyDetails: any = []
  isShowPadding: any = false;
  vendorTypeDetail:any = [];
  vendorIdisShow:any = false;
  paymentMethodDetails: any = [] 
  reconcilationAccountDetails: any = []


  constructor(
    private fb: FormBuilder,
    private countrySer: CountryService,
    private companySer: CompanyCodeService,
    private vendorSer: VendorService,
    private paySer: PaymentTermService,
    private router: Router,
    private motSer: ModeOfTransportService,
    private incoSer: IncTermService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.createVendorFormFields()
    this.getCountryDetails()
    this.getMOTDetail()
    this.getIncoTermsDetail()
    this.getCompanyCodeDetail()
    this.getCurrencyDetails()
    this.getPaymentTermsDetail()
    this.getVendorType()
    this.getPaymentMethodDetails()
    this.getReconcilationAccountDetails()
  }

  createVendorFormFields() {
    this.vendorFormGroup = this.fb.group({
      vendorName: ['', Validators.required],
      vendorId: [''],
      vendorTypeFlag: ['', Validators.required],
      vendorTypeId: ['', Validators.required],
      vendorTypeName:['', Validators.required],
      addressCountry: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      modeOfTransportId: ['', Validators.required],
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
      taxNumber: [''],
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

  handleSideBar(event: any) {
    this.isShowPadding = event
  }



  async submitData() {
    try {
      this.isSubmitted = true
      const userName: any = localStorage.getItem('userName')
      this.vendorFormGroup.value.createdOn = '18/12/2023'
      this.vendorFormGroup.value.createdBy = userName
      this.vendorFormGroup.value.changedOn = '18/12/2023'
      this.vendorFormGroup.value.changedBy = userName
      console.log(this.vendorFormGroup.value)
      if (this.vendorFormGroup.invalid)
        return
      const result: any = await this.vendorSer.createVendorDetails(this.vendorFormGroup.value)
      console.log(result);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/vendor'])
        return
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }

    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
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
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
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
        this.vendorFormGroup.controls.languageName.setValue(result.data.languageName)
      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  selectCountryName(event: any) {
    console.log(event.target.value)
    this.citiesDetails = this.countryDetails.find((el: any) => el._id === event.target.value);
    this.vendorFormGroup.controls.countryName.setValue(this.citiesDetails.countryName)
    this.vendorFormGroup.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)

  }

  
  handleCurrency(event: any) {
    const findCurrencyCode = this.currencyDetails.find((el: any) => el._id === event.target.value);
    this.vendorDetials.controls.currencyName.setValue(findCurrencyCode.code)
  }

  // get MOT organization

  async getMOTDetail() {
    try {
      const result: any = await this.motSer.getAllModeOfTransportDetails()
      if (result.status === '1') {
        this.motDetails = result.data
      }
      else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  // Add the MOT Name
  handleMOT(event: any) {
    const findMOTDetail = this.motDetails.find((el: any) => el._id === event.target.value);
    console.log(findMOTDetail)
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
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  // Add the inco Name
  handleInco(event: any) {
    const findIncoDetail = this.incoDetails.find((el: any) => el._id === event.target.value);
    console.log(findIncoDetail)
    this.vendorFormGroup.controls.incrementTreamsName.setValue(findIncoDetail.inc_terms_code)
  }


  async getCompanyCodeDetail() {
    try {
      const result: any = await this.companySer.getAllCompanyCodeDetails()
      console.log(result)
      if (result.status === '1') {
        this.companyCodeDetails = result.data
      }
      else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  // Get All details for Currency code
  async getCurrencyDetails() {
    try {
      const result: any = await this.companySer.getAllCurrencyDetails();
      if (result.status === '1') {
        this.currencyDetails = result.data;

      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  // get payment TERMS organization

  async getPaymentTermsDetail() {
    try {
      const result: any = await this.paySer.getAllPaymentTerm()
      console.log(result)
      if (result.status === '1') {
        this.payDetails = result.data
      }
      else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getVendorType() {
    try {
      const result: any = await this.vendorSer.getVendorTypesDetails()
      if (result.status === '1') {
        this.vendorTypeDetail = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handleVendorType(event: any) {
    const findVendorType = this.vendorTypeDetail.find((el: any) => el._id === event.target.value)
    console.log(findVendorType);
    if(findVendorType.num_range === 'M'){
      this.vendorIdisShow = true;
      this.vendorFormGroup.controls.vendorId.setValue("")
    }else{
      this.vendorIdisShow = false;
      this.vendorFormGroup.controls.vendorId.reset()
    }
    this.vendorFormGroup.controls.vendorTypeFlag.setValue(findVendorType.num_range)
    this.vendorFormGroup.controls.vendorTypeName.setValue(findVendorType.description)  

  }
  get drop(){
    return this.vendorFormGroup.get('vendorTypeName')
  }


   //get payment_method 

   async getPaymentMethodDetails() {
    try {
      const result: any = await this.vendorSer.getAllPaymentMethodDetails()
      if (result.status === '1') {
        this.paymentMethodDetails = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  handlePaymentMethod(event: any) {
    const findPaymentMethod = this.paymentMethodDetails.find((el: any) => el._id === event.target.value)
    console.log(findPaymentMethod);

    this.vendorFormGroup.controls.paymentMethod.setValue(findPaymentMethod.description)
  }


  //get ReconcilationAccount 

  async getReconcilationAccountDetails() {
    try {
      const result: any = await this.vendorSer.getAllReconcilationAccountDetails()
      if (result.status === '1') {
        this.reconcilationAccountDetails = result.data
      }
    } catch (error: any) {
      if (error.error.message) {
        this._snackBar.open(error.error.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
        return
      }
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


}
