import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SalesOrgService } from '../../../Services/sales-org/sales-org.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { PlantDataService } from '../../../Services/plant-data/plant-data.service';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-sales-org',
  templateUrl: './add-sales-org.component.html',
  styleUrls: ['./add-sales-org.component.css']
})
export class AddSalesOrgComponent {
  salesOrg: any = FormGroup
  isSubmitted: any = false
  timeZone: any = []
  countryDetials: any = []
  details: any = []
  regionDetail:any=[]


  constructor(
    private fb: FormBuilder,
    private salesSer: SalesOrgService,
    private plantSer: PlantDataService,
    private companyCodeSer: CompanyCodeService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.code()
    this.getTimeZoneDetail()
    this.getCountryDetails()
  }

  code() {
    this.salesOrg = this.fb.group({
      salesOrg: ['', Validators.required],
      description: ['', Validators.required],
      address: ['', Validators.required],
      searchTerm: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: ['', Validators.required],
      regionId: ['', Validators.required],
      regionName: ['', Validators.required],
      timeZoneId: ['', Validators.required],
      timeZoneName: ['', Validators.required],
      contactPerson: ['', Validators.required],

    });

  }

  async addCode() {
    try {
      this.isSubmitted = true
      if (this.salesOrg.invalid)
        return
      const result: any = await this.salesSer.createSalesOrg(this.salesOrg.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/sales-org-list']);
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
      });;


    }
  }

  // get time zone
  async getTimeZoneDetail() {
    try {
      const result: any = await this.plantSer.getAllTimeZoneDetails()

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
      });;


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
    } catch (error:any) {
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

  
  //get region data

  async getRegionDetail(id:any){
    try {
      const result:any=await this.salesSer.getAllRegionDetails(id)
      if(result.status==='1'){
        console.log(result);
        
          this.regionDetail=result.data
          // this.salesOrg.controls.regionName.setValue(result.data.code)
      }
      else{
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

  selectCountry(event: any) {
    this.details = this.countryDetials.find((el: any) => el._id === event.target.value);
    this.salesOrg.controls.countryName.setValue(this.details.countryName)
    // this.salesOrg.controls.regionName.setValue(this.details.code)
    this.getRegionDetail(this.details._id)

  }
  handleTimeZone(event: any) {
    const time = this.timeZone.find((el: any) => el._id === event.target.value)
    console.log(time);
    this.salesOrg.controls.timeZoneName.setValue(time.timeZoneType)
  }



  
  handleRegion(event:any){
    const regionData:any=this.regionDetail.find((el:any)=>el._id===event.target.value)
    console.log(regionData);
    this.salesOrg.controls.regionName.setValue(regionData.code)
    
  }


}
