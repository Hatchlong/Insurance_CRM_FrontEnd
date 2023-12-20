import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-edit-plant-data',
  templateUrl: './edit-plant-data.component.html',
  styleUrls: ['./edit-plant-data.component.css']
})
export class EditPlantDataComponent {
  plantsData: any = FormGroup
  plantDetails: any = [];
  plantDataId: any = ''
  countryDetials: any = []
  citiesDetails: any = []
  languageName: any = ''
  purDetails: any = []
  timeZone: any = []
  taxDetails: any = [];
  storgaeLocationDetails: any = []
  isSubmitted:any=false

  constructor(
    private fb: FormBuilder,
    private plantDataSer: PlantDataService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private companyCodeSer: CompanyCodeService,
    private purOrgSer: PurchaseOrgService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.plantDataId = this.activeRouter.snapshot.paramMap.get('id');
    this.plantData()
    this.getCountryDetails()
    this.getPurchaseOrgDetail()
    this.getSinglePlantDataDetails()
    this.getTaxDetails()
    this.getStorageDetails()
    this.getTimeZoneDetail()

  }

  plantData() {
    this.plantsData = this.fb.group({
      _id: ['', Validators.required],
      plantCode: ['', Validators.required],
      name1: ['', Validators.required],
      name2: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      address: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: ['', Validators.required],
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
      salesOrganizationName: ['fuffgf', Validators.required],
      taxIndicatorId: ['', Validators.required],
      taxIndicatorName: ['', Validators.required],
      stoargeLocationId: ['', Validators.required],
      stoargeLocationName: ['', Validators.required]
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
      });;
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



  // Create the plant data Details

  async submitData() {
    try {
      this.isSubmitted=true
      console.log(this.plantsData.value)
      if (this.plantsData.invalid) {
        return
      }

      const result: any = await this.plantDataSer.updatePlantData(this.plantsData.value);
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


  async getSingleLanguage(id: any) {
    try {
      const result: any = await this.companyCodeSer.singleLanguageDetails(id);
      if (result.status === '1') {
        this.languageName = result.data.languageName;
        this.plantsData.controls.languageName.setValue(result.data.languageName)
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
      });;
    }
  }

  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    this.plantsData.controls.countryName.setValue(this.citiesDetails.countryName)

    this.plantsData.controls.languageId.setValue(this.citiesDetails.languageId)
    this.getSingleLanguage(this.citiesDetails.languageId)
  }

  // Add the purchase Name
  handlePurchaseOrg(event: any) {
    const findPurchaseDetail = this.purDetails.find((el: any) => el._id === event.target.value);
    this.plantsData.controls.purchaseOrganizationName.setValue(findPurchaseDetail.purchase_org)
  }

  // Add the purchase Name
  handleTax(event: any) {
    const findPurchaseDetail = this.taxDetails.find((el: any) => el.tax_ind_code === +event.target.value);
    this.plantsData.controls.taxIndicatorName.setValue(findPurchaseDetail.description)
  }

  // Add the purchase Name
  handleStorageLocation(event: any) {
    const findPurchaseDetail = this.storgaeLocationDetails.find((el: any) => el.stor_loc_id === +event.target.value);
    this.plantsData.controls.stoargeLocationName.setValue(findPurchaseDetail.description)
  }
  handleTimeZone(event: any) {
    const timeDetail = this.timeZone.find((el: any) => el.timeZoneType === +event.target.value)
    this.plantsData.controls.timeZone.setValue(timeDetail.timeZoneType)
  }


}
