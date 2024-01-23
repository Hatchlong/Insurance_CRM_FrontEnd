import { ChangeDetectorRef, Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CountryService } from '../../../services/country/country.service';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import { VendorService } from '../../../services/vendor/vendor.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ModeOfTransportService } from 'src/app/modules/setting/Services/mode-of-transport/mode-of-transport.service';
import { IncTermService } from 'src/app/modules/setting/Services/inc-term/inc-term.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PaymentTermService } from 'src/app/modules/setting/Services/payment-term/payment-term.service';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

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
  isSubmitted: any = false
  citiesDetails: any = []
  motDetails: any = []
  incoDetails: any = []
  payDetails: any = []
  companyCodeDetails: any = []
  currencyDetails: any = []
  isShowPadding: any = false;
  vendorTypeDetail: any = [];
  paymentMethodDetails: any = []
  vendorIdisShow: any = true;
  reconcilationAccountDetails: any = []
  vendorId: any = ''
  languageDetails: any = []
  idleState: any = 'Not Started';

  constructor(
    private fb: FormBuilder,
    private countrySer: CountryService,
    private companySer: CompanyCodeService,
    private vendorSer: VendorService,
    private paySer: PaymentTermService,

    private router: Router,
    private activateRouter: ActivatedRoute,
    private motSer: ModeOfTransportService,
    private incoSer: IncTermService,
    private _snackBar: MatSnackBar,
    private idle: Idle,
    private cd: ChangeDetectorRef
  ) {
    idle.setIdle(450),
      idle.setTimeout(900),
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Started';
      cd.detectChanges();
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout';
    })

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'idle';
    })
  }

  ngOnInit(): void {
    this.vendorId = this.activateRouter.snapshot.paramMap.get('id')
    this.createVendorFormFields()
    this.getCountryDetails();
    this.getAllLanguageList()
    this.getMOTDetail()
    this.getIncoTermsDetail()
    this.getSingleVendorDetails()
    this.getCompanyCodeDetail()
    this.getCurrencyDetails()
    this.getPaymentTermsDetail()
    this.getVendorType()
    this.getPaymentMethodDetails()
    this.getReconcilationAccountDetails()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }


  createVendorFormFields(data?: any) {
    if (data) {
      this.vendorFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        vendorName: [data.vendorName, Validators.required],
        vendorId: [data.vendorId],
        vendorTypeFlag: [data.vendorTypeFlag, Validators.required],
        vendorTypeId: [data.vendorTypeId, Validators.required],
        vendorTypeName: [data.vendorTypeName, Validators.required],
        addressCountry: [data.addressCountry, Validators.required],
        languageId: [data.languageId, Validators.required],
        languageName: [data.languageName, Validators.required],
        modeOfTransportId: [data.modeOfTransportId, Validators.required],
        modeOfTransportName: [data.modeOfTransportName, Validators.required],
        incrementTreamsId: [data.incrementTreamsId, Validators.required],
        incrementTreamsName: [data.incrementTreamsName, Validators.required],
        countryId: [data.countryId, Validators.required],
        countryName: [data.countryName, Validators.required],
        financialData: this.fb.array(data.financialData.map((ele: any) => this.getFinancialFields(ele)))

      })
      return;
    }
    this.vendorFormGroup = this.fb.group({
      _id: ['', Validators.required],
      vendorName: ['', Validators.required],
      vendorId: [''],
      vendorTypeFlag: ['', Validators.required],
      vendorTypeId: ['', Validators.required],
      vendorTypeName: ['', Validators.required],
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

  getFinancialFields(data?: any) {
    if (data) {
      return this.fb.group({
        taxNumber: [data.taxNumber],
        vatRegistrationNo: [data.vatRegistrationNo],
        currency: [data.currency],
        companyCode: [data.companyCode],
        bankCountry: [data.bankCountry],
        bankKey: [data.bankKey],
        bankAccount: [data.bankAccount],
        referenceDetails: [data.referenceDetails],
        accountHolder: [data.accountHolder],
        backDetailsValidFrom: [data.backDetailsValidFrom],
        backDetailsValidTo: [data.backDetailsValidTo],
        reconciliationAccount: [data.reconciliationAccount],
        paymentMethod: [data.paymentMethod],
        paymentTerms: [data.paymentTerms],


      })
    }
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
      if (this.vendorFormGroup.invalid)
        return
      const result: any = await this.vendorSer.updateVendor(this.vendorFormGroup.value)
      console.log(result)
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


  //  single details for Language Detials
  async getAllLanguageList() {
    try {
      const result: any = await this.companySer.getAllLanguageDetails();
      if (result.status === '1') {
        this.languageDetails = result.data
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


  async getSingleVendorDetails() {
    try {
      const result: any = await this.vendorSer.singleVendor(this.vendorId)
      console.log(result)
      this.createVendorFormFields(result.data)

      if (result.status === '1') {
        this.vendorFormGroup.patchValue(result.data)
        this.citiesDetails = this.countryDetails.find((el: any) => el._id === this.vendorFormGroup.value.countryId)


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
    this.vendorFormGroup.controls.languageName.setValue(this.citiesDetails.languageName)

  }


  handleCurrency(event: any) {
    const findCurrencyCode = this.currencyDetails.find((el: any) => el._id === event.target.value);
    // this.vendorDetials.controls.currencyName.setValue(findCurrencyCode.code)
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
      if (result.status === '1') {
        this.incoDetails = result.data
      }
      else {
        // alert("API FAiled")
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
    if (findVendorType.num_range === 'M') {
      this.vendorIdisShow = true;
    } else {
      this.vendorIdisShow = false;
    }
    this.vendorFormGroup.controls.vendorTypeFlag.setValue(findVendorType.num_range)
    this.vendorFormGroup.controls.vendorTypeName.setValue(findVendorType.description)

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
