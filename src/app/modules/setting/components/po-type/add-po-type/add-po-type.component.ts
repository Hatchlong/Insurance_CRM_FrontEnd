import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoTypeService } from '../../../Services/po-type.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-po-type',
  templateUrl: './add-po-type.component.html',
  styleUrls: ['./add-po-type.component.css']
})
export class AddPoTypeComponent {

  poType: any = FormGroup
  poTypeDetail: any = []
  isSubmitted: any = false

  constructor(
    private fb: FormBuilder,
    private potypeSer: PoTypeService,
    private router: Router,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getPotype()
    this.code()
  }

  code() {
    this.poType = this.fb.group({
      poType: ['', Validators.required],
      poTypeDescription: ['', Validators.required],
      itemNumberInterval: ['', Validators.required],
      internalNumberRangeAssignment: ['', Validators.required],
      externalNumberRangeAssignment: ['', Validators.required],

    });
  }


  //submit data
  async addCode() {
    try {
      this.isSubmitted = true
      if (this.poType.invalid)
        return
      const result: any = await this.potypeSer.createpoTypeDetail(this.poType.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, 'Success', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/po-type-list']);
        return;
      }
      if (result.status === '0') {
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
      });
    }

  }

  // read all data

  async getPotype() {
    try {
      const result: any = await this.potypeSer.getAllPoType();
      if (result.status === '1') {
        this.poTypeDetail = result.data
      }
      else {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error:any) {
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
      });

    }
  }
}
