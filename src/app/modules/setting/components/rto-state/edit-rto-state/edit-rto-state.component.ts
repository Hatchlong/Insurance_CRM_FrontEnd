import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RtoStateService } from '../../../services/rto-state/rto-state.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyCodeService } from '../../../services/company-code/company-code.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-rto-state',
  templateUrl: './edit-rto-state.component.html',
  styleUrls: ['./edit-rto-state.component.css']
})
export class EditRtoStateComponent implements OnInit {

  rtoStateData: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  rtoStateId: any = ''
  countryDetials: any = [];
  stateDetails: any = [];
  citiesDetails: any = [];
  isLookValue: any = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private rtoSer: RtoStateService,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute,
    private companyCodeSer: CompanyCodeService

  ) { }

  ngOnInit(): void {
    this.rtoStateId = this.activateRouter.snapshot.paramMap.get('id')
    this.data()
    this.getCountryDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.rtoStateData = this.fb.group({
      _id: ['', Validators.required],
      rtoStateCode: ['', Validators.required],
      description: ['', Validators.required],
      address: [''],
      countryId: ['', Validators.required],
      countryName: [''],
      city: ['', Validators.required],
      stateId: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
    });


  }
  //get singleDetail
  async getSingleRtoStateDetail() {
    try {
      const result: any = await this.rtoSer.singleRtoStateDetail(this.rtoStateId)
      if (result.status === '1') {
        this.rtoStateData.patchValue(result.data)

        this.stateDetails = this.countryDetials.find((el: any) => el._id === this.rtoStateData.value.countryId);
        console.log(this.stateDetails, 'pppp');

        const findCity = this.stateDetails.states.find((el: any) => el._id === this.rtoStateData.value.stateId);
        console.log(findCity)
        this.citiesDetails = findCity.cities[0]


      }
    } catch (error) {
      console.log(error)
    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.rtoStateData.invalid)
        return

      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.rtoStateData.value.createdOn = fullDate
      this.rtoStateData.value.createdBy = username
      this.rtoStateData.value.changedOn = fullDate
      this.rtoStateData.value.changedBy = username

      const result: any = await this.rtoSer.updateRtoStateDetail(this.rtoStateData.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/rto-state-list/'])
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
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
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
        this.getSingleRtoStateDetail()


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
      this.rtoStateData.controls.countryName.setValue(this.stateDetails.countryName)
    }
  }

  handleState(event: any) {
    var findCity = this.stateDetails.states.find((el: any) => el._id === event.target.value);
    console.log(findCity, 'ststta');

    this.rtoStateData.controls.stateName.setValue(findCity.states)
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
            stateId: this.rtoStateData.value.stateId,
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
          this.rtoStateData.get('city').setErrors({ customError: true })
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



}
