import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleCategoryService } from '../../../services/vehicle-category/vehicle-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-vehicle-registery',
  templateUrl: './edit-vehicle-registery.component.html',
  styleUrls: ['./edit-vehicle-registery.component.css']
})
export class EditVehicleRegisteryComponent {


  vehicleCategoryData: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  vehicleCategoryDetail: any = []
  allVehicleCategoryDeatil: any = []
  vehicleCategoryId: any = []

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleCategorySer: VehicleCategoryService,
    private _snackBar: MatSnackBar,
    private activateRouter: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.vehicleCategoryId = this.activateRouter.snapshot.paramMap.get('id')
    this.getSingleVehicleCategoryDetail()
    this.data()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.vehicleCategoryData = this.fb.group({
      _id:['',Validators.required],
      vehicleCategory: ['', Validators.required],
      description: ['', Validators.required],

    });

  }

  //get singleDetail
  async getSingleVehicleCategoryDetail() {
    try {
      const result: any = await this.vehicleCategorySer.singleVehicleCategoryDetail(this.vehicleCategoryId)
      if (result.status === '1') {
        this.vehicleCategoryData.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.vehicleCategoryData.value, this.vehicleCategoryData.invalid)
      if (this.vehicleCategoryData.invalid)
        return

      const result: any = await this.vehicleCategorySer.updateVehicleCategoryDetail(this.vehicleCategoryData.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/vehicle-category-list']);
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

}
