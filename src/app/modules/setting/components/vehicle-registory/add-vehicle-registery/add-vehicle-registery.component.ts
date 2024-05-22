import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { VehicleCategoryService } from '../../../services/vehicle-category/vehicle-category.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-vehicle-registery',
  templateUrl: './add-vehicle-registery.component.html',
  styleUrls: ['./add-vehicle-registery.component.css']
})
export class AddVehicleRegisteryComponent implements OnInit {

  vehicleCategoryData: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private vehicleCategorySer: VehicleCategoryService,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.createdata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.vehicleCategoryData = this.fb.group({
      vehicleCategory: ['', [Validators.required]],
      description: ['', Validators.required],

    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.vehicleCategoryData, this.vehicleCategoryData.invalid)
      if (this.vehicleCategoryData.invalid)
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

      this.vehicleCategoryData.value.createdOn = fullDate
      this.vehicleCategoryData.value.createdBy = username
      this.vehicleCategoryData.value.changedOn = fullDate
      this.vehicleCategoryData.value.changedBy = username


      const result: any = await this.vehicleCategorySer.createVehicleCategory(this.vehicleCategoryData.value)
      console.log(result, "ttrrtr")
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
