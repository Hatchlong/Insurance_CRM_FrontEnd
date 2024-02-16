import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { VendorService } from '../../../services/vendor/vendor.service';

@Component({
  selector: 'app-add-vendor',
  templateUrl: './add-vendor.component.html',
  styleUrls: ['./add-vendor.component.css']
})
export class AddVendorComponent implements OnInit {

  vendorFormGroup: any = FormGroup
  vendorDetials: any = []
  isSubmitted: any = false;
  isShowPadding: any = false;


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private vendorSer:VendorService


  ) { }
  ngOnInit(): void {
    this.createVendorFormFields()
  }
  createVendorFormFields() {
    this.vendorFormGroup = this.fb.group({
      vendorId: ['', Validators.required],
      vendorName: ['', Validators.required],
      address: ['', Validators.required],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      financialData: this.fb.array([this.getFinancialFields()])
    })
  }
  getFinancialFields(): FormGroup {
    return this.fb.group({
      taxNumber: [''],
      vatRegistrationNo: [''],
      currency: [''],
      companyCode: [''],
      bankAccount: [''],
      accountHolder: [''],
      paymentMethod: [''],


    })
  }

  get financialListArray() {
    return this.vendorFormGroup.get('financialData') as FormArray
  }
  addFinancial() {
    this.financialListArray.push(this.getFinancialFields())
  }
  deleterow(index: any) {
    this.financialListArray.removeAt(index);
  }
  addVendor() {
    this.financialListArray.push(this.getFinancialFields())
  }

  async submitdata() {
    try {
      this.isSubmitted = true
      if (this.vendorFormGroup.invalid)
        return

        const result:any=await this.vendorSer.createVendor(this.vendorFormGroup.value)
        if (result.status === '1') {
          this._snackBar.open(result.message, '', {
            duration: 5 * 1000, horizontalPosition: 'center',
            verticalPosition: 'top',
            panelClass: 'app-notification-success',
          });
          this.router.navigate(['/master/vendor-list']);
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
        verticalPosition: 'top'
      });

    }
  }

}
