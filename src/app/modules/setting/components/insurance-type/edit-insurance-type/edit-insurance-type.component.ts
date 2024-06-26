import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InsuranceTypeService } from '../../../services/insurance-type/insurance-type.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-insurance-type',
  templateUrl: './edit-insurance-type.component.html',
  styleUrls: ['./edit-insurance-type.component.css']
})
export class EditInsuranceTypeComponent {



  insuranceTypeFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  insuranceTypeId: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private insuranceTypeSer: InsuranceTypeService,
    private _snackBar: MatSnackBar, private activateRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.insuranceTypeId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getSingleInsuranceTypeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.insuranceTypeFormGroup = this.fb.group({
      _id: ['', Validators.required],
      insuranceId: ['', Validators.required],
      insuranceName: ['', Validators.required],
      description: [''],

    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.insuranceTypeFormGroup, this.insuranceTypeFormGroup.invalid)
      if (this.insuranceTypeFormGroup.invalid)
        return
      const username: any = localStorage.getItem('userId')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

     
      this.insuranceTypeFormGroup.value.changedOn = fullDate
      this.insuranceTypeFormGroup.value.changedBy = username

      const result: any = await this.insuranceTypeSer.updateinsuranceTypeDetail(this.insuranceTypeFormGroup.value)
      console.log(result, "ttrrtr")
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/insurance-type-list']);
        return;
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

  //get singleDetail
  async getSingleInsuranceTypeDetail() {
    try {
      const result: any = await this.insuranceTypeSer.singleinsuranceTypeDetail(this.insuranceTypeId)
      if (result.status === '1') {
        this.insuranceTypeFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


}
