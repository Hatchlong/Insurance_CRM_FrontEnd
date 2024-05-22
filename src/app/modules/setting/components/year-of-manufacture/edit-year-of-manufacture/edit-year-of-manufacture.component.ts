import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { YearOfManufactureService } from '../../../services/year-of-manufacture/year-of-manufacture.service';

@Component({
  selector: 'app-edit-year-of-manufacture',
  templateUrl: './edit-year-of-manufacture.component.html',
  styleUrls: ['./edit-year-of-manufacture.component.css']
})
export class EditYearOfManufactureComponent {


  yearOfManufactureFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  yearManuId: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private yearManuSer: YearOfManufactureService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.yearManuId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getSingleYearOfManufactureDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.yearOfManufactureFormGroup = this.fb.group({
      _id: ['', [Validators.required]],
      year: ['', [Validators.required]],
      description: ['', Validators.required],

    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.yearOfManufactureFormGroup, this.yearOfManufactureFormGroup.invalid)
      if (this.yearOfManufactureFormGroup.invalid)
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

      this.yearOfManufactureFormGroup.value.changedOn = fullDate
      this.yearOfManufactureFormGroup.value.changedBy = username


      const result: any = await this.yearManuSer.updateyearOfManfactureDetail(this.yearOfManufactureFormGroup.value)
      console.log(result, "ttrrtr")
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/year-of-manufacture-list']);
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
  async getSingleYearOfManufactureDetail() {
    try {
      const result: any = await this.yearManuSer.singleyearOfManfactureDetail(this.yearManuId)
      if (result.status === '1') {
        this.yearOfManufactureFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }

}
