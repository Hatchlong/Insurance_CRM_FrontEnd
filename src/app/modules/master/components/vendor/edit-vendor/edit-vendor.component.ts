import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../../../services/vendor/vendor.service';
import Swal from 'sweetalert2';
import { CompanyCodeService } from 'src/app/modules/setting/services/company-code/company-code.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent {

  vendorFormGroup: any = FormGroup
  vendorDetials: any = []
  isSubmitted: any = false;
  isShowPadding: any = false;
  vendordetailId: any = ''
  countryDetials: any = [];
  stateDetails: any = [];
  citiesDetails: any = [];
  isLookValue: any = false;
  paymentMethodDetails: any = []
  currencyDetails: any = []


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private vendorSer: VendorService,
    private activateRouter: ActivatedRoute,
    private companyCodeSer: CompanyCodeService



  ) { }
  ngOnInit(): void {
    this.vendordetailId = this.activateRouter.snapshot.paramMap.get('id')
    this.createVendorFormFields()
    this.getCountryDetails()
    this.getPaymentMethodDetails()
    this.getCurrencydDetails()
  }
  createVendorFormFields(data?: any) {
    if (data) {
      this.vendorFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        vendorId: [data.vendorId],
        vendorName: [data.vendorName, Validators.required],
        address: [data.address, Validators.required],
        countryId: [data.countryId, Validators.required],
        countryName: [data.countryName, Validators.required],
        stateId: [data.stateId, Validators.required],
        stateName: [data.stateName, Validators.required],
        city: [data.city, Validators.required],
        postalCode: [data.city, Validators.required],
        mobile: [data.mobile],
        mailId: [data.mailId],
        financialData: this.fb.array(data.financialData.map((ele: any) => this.getFinancialFields(ele)))

      })
      return;
    }
    this.vendorFormGroup = this.fb.group({
      _id: ['', Validators.required],
      vendorId: ['', Validators.required],
      vendorName: ['', Validators.required],
      address: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: ['', Validators.required],
      stateId: ['', Validators.required],
      stateName: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      mobile: [''],
      mailId: [''],
      financialData: this.fb.array([this.getFinancialFields()])
    })
  }
  getFinancialFields(data?: any) {
    if (data) {
      return this.fb.group({
        taxNumber: [data.taxNumber],
        vatRegistrationNo: [data.vatRegistrationNo],
        currency: [data.currency],
        bankName: [data.bankName],
        branchName: [data.branchName],
        branchAddress: [data.branchAddress],
        ifscCode: [data.ifscCode],
        bankAccount: [data.bankAccount],
        accountHolder: [data.accountHolder],
        paymentMethod: [data.paymentMethod],
      })
    }
    return this.fb.group({
      taxNumber: [''],
      vatRegistrationNo: [''],
      currency: [''],
      bankName: [''],
      branchName: [''],
      branchAddress: [''],
      ifscCode: [''],
      bankAccount: [''],
      accountHolder: [''],
      paymentMethod: [''],



    })
  }

  get financialListArray() {
    return this.vendorFormGroup.get('financialData') as FormArray
  }
  addFinancial() {
    this.financialListArray.push(this.getFinancialFields())
  }
  deleterow(index: any) {
    this.financialListArray.removeAt(index);
  }
  addVendor() {
    this.financialListArray.push(this.getFinancialFields())
  }


  //get single data


  async getSingleDetail() {
    try {
      const result: any = await this.vendorSer.singleVendorDetail(this.vendordetailId)


      if (result.status === '1') {
        // this.vendorFormGroup.patchValue(result.data)
        this.createVendorFormFields(result.data)

        this.stateDetails = this.countryDetials.find((el: any) => el._id === this.vendorFormGroup.value.countryId);
        console.log(this.stateDetails, 'pppp');

        const findCity = this.stateDetails.states.find((el: any) => el._id === this.vendorFormGroup.value.stateId);
        console.log(findCity)
        this.citiesDetails = findCity.cities[0]


      }
    } catch (error: any) {
      console.log(error);

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

  async submitdata() {
    try {
      this.isSubmitted = true

      if (this.vendorFormGroup.invalid)
        return

      const result: any = await this.vendorSer.updateVendorDetail(this.vendorFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/vendor-list']);
        return
      }
      if (result.status === '0') {
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
        verticalPosition: 'top'
      });

    }
  }

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      console.log(result, 'country');

      if (result.status === '1') {
        this.countryDetials = result.data;
        this.getSingleDetail()


      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  selectCountryName(event: any) {
    this.stateDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.stateDetails);
    if (this.stateDetails) {
      this.vendorFormGroup.controls.countryName.setValue(this.stateDetails.countryName)
    }
  }

  handleState(event: any) {
    var findCity = this.stateDetails.states.find((el: any) => el._id === event.target.value);
    console.log(findCity, 'ststta');

    this.vendorFormGroup.controls.stateName.setValue(findCity.states)
    this.citiesDetails = findCity.cities[0]
  }

  typeaheadOnSelect(event: any) {
    if (event.value) {
      this.isLookValue = true
    }
  }

  handleEvent(event: any) {
    if (event.target.value) {
      setTimeout(() => {
        if (!this.isLookValue) {
          const findCities = this.citiesDetails.cities.find((el: any) => el === event.target.value.toLowerCase());
          if (!findCities) {
            this.createState(event.target.value)
          }

        }
      }, 500);
    }
  }

  async createState(city: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want add new city in state",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.citiesDetails.cities.push(city);
          const reqBody = {
            stateId: this.vendorFormGroup.value.stateId,
            cities: this.citiesDetails.cities
          }
          console.log(reqBody, 'kkk');
          const result: any = await this.companyCodeSer.updateCity(reqBody);
          if (result.status === '1') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });

            return;
          }
          if (result.status === '0') {

            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.vendorFormGroup.get('city').setErrors({ customError: true })
        }
      });

    } catch (error) {
      console.error(error);
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
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

  //get currency detail
  async getCurrencydDetails() {
    try {
      const result: any = await this.vendorSer.getAllCurrencyDetails()
      if (result.status === '1') {
        this.currencyDetails = result.data
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
