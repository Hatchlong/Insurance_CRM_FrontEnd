import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { MakeService } from '../../../services/make/make.service';

@Component({
  selector: 'app-add-make',
  templateUrl: './add-make.component.html',
  styleUrls: ['./add-make.component.css']
})
export class AddMakeComponent {

  makeDetailFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private makeSer: MakeService
  ) { }

  ngOnInit(): void {
    this.createdata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.makeDetailFormGroup = this.fb.group({
      makeId: ['', [Validators.required]],
      description: ['', Validators.required],

    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.makeDetailFormGroup, this.makeDetailFormGroup.invalid)
      if (this.makeDetailFormGroup.invalid)
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

      this.makeDetailFormGroup.value.createdOn = fullDate
      this.makeDetailFormGroup.value.createdBy = username
      this.makeDetailFormGroup.value.changedOn = fullDate
      this.makeDetailFormGroup.value.changedBy = username


      const result: any = await this.makeSer.createmake(this.makeDetailFormGroup.value)
      console.log(result, "ttrrtr")
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/make-list']);
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
