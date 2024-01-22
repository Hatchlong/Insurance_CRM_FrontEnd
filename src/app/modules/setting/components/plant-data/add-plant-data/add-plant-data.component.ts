import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SalesOrgService } from '../../../Services/sales-org/sales-org.service';

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
  timeZone: any = []
  storgaeLocationDetails: any = [];
  salesDetail: any = []
  isSubmitted: any = false;
  isShowPadding: any = false;
  languageDetails: any = [];
  myTime: Date = new Date();
  minTime: Date = new Date();
  maxTime: Date = new Date();
  constructor(private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private companyCodeSer: CompanyCodeService,
    private purOrgSer: PurchaseOrgService,
    private _snackBar: MatSnackBar,
    private SalesSer: SalesOrgService
  ) { }

  ngOnInit(): void {
    this.getCountryDetails()
    this.plantData()
    this.getPurchaseOrgDetail()
    this.getStorageDetails();
    this.getTaxDetails()
    this.getTimeZoneDetail()
    this.getSalesDetail()
    this.getAllLanguageList()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  plantData() {
    this.plantFormData = this.fb.group({
      plantCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      plantName: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      address: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: [''],
      cityId: ['', Validators.required],
      contactPersonName: [''],
      contactNumber: [''],
      timeZoneId: ['', Validators.required],
      timeZoneName: ['', Validators.required],
      searchTerm: [''],
      customerNo_plant: [''],
      vendorNumberPlant: ['', Validators.required],
      purchaseOrganizationId: ['', Validators.required],
      purchaseOrganizationName: ['', Validators.required],
      salesOrganizationId: ['', Validators.required],
      salesOrganizationName: ['', Validators.required],
      taxIndicatorId: ['', Validators.required],
      taxIndicatorName: ['', Validators.required],
      stoargeLocationId: [''],
      stoargeLocationName: [''],
      fromTimer: ['', Validators.required],
      toTimer: ['', Validators.required]
    })
  }

  // Create the purchase org Details

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.plantFormData.value)
      if (this.plantFormData.invalid)
        return
      var hours = this.plantFormData.value.fromTimer.getHours();
      var minutes = this.plantFormData.value.fromTimer.getMinutes();

      // Format the date and time
      var formTimer = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

      var tohours = this.plantFormData.value.toTimer.getHours();
      var tominutes = this.plantFormData.value.toTimer.getMinutes();

      // Format the date and time
      var toTimer = `${tohours.toString().padStart(2, '0')}:${tominutes.toString().padStart(2, '0')}`;
      this.plantFormData.value.fromTimer = formTimer;
      this.plantFormData.value.toTimer = toTimer;
      const result: any = await this.plantDataSer.createPlantDataDetails(this.plantFormData.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/plant-data-list']);
        return;
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
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
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

  // get purchase organization

  async getPurchaseOrgDetail() {
    try {
      const result: any = await this.purOrgSer.getAllPurchaseOrgDetails()
      if (result.status === '1') {
        this.purDetails = result.data
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
      });;;

    }
  }

  //get tax detail
  async getTaxDetails() {
    try {
      const result: any = await this.plantDataSer.getAllTaxDetails()
      if (result.status === '1') {
        this.taxDetails = result.data
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

  //get storage location 

  async getStorageDetails() {
    try {
      const result: any = await this.plantDataSer.getAllStorageLocationsDetails()
      if (result.status === '1') {
        this.storgaeLocationDetails = result.data
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

  //get sales org details

  async getSalesDetail() {
    try {
      const result: any = await this.SalesSer.getAllSalesOrgDetails()
      if (result.status === '1') {
        this.salesDetail = result.data
      } else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
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
      });;
    }
  }

  // single details for Language Detials
  async getAllLanguageList() {
    try {
      const result: any = await this.companyCodeSer.getAllLanguageDetails();
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


  // get time zone
  async getTimeZoneDetail() {
    try {
      const result: any = await this.plantDataSer.getAllTimeZoneDetails()
      if (result.status === '1') {
        this.timeZone = result.data
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
      });;;

    }
  }

  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.citiesDetails)
    this.plantFormData.controls.countryName.setValue(this.citiesDetails.countryName)
    this.plantFormData.controls.languageId.setValue(this.citiesDetails.languageId)
    this.plantFormData.controls.languageName.setValue(this.citiesDetails.languageName)

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

  // Add time Zone
  handleTimeZone(event: any) {
    const timeDetail = this.timeZone.find((el: any) => el._id === event.target.value);
    this.plantFormData.controls.timeZoneName.setValue(timeDetail.timeZoneType)
  }
  handleSalesOrg(event: any) {
    const findsalesData = this.salesDetail.find((el: any) => el._id === event.target.value);
    console.log(findsalesData, 'jjj')
    this.plantFormData.controls.salesOrganizationName.setValue(findsalesData.salesOrg)
    this.plantFormData.controls.timeZoneId.setValue(findsalesData.timeZoneId)
    this.plantFormData.controls.timeZoneName.setValue(findsalesData.timeZoneName)


  }
}