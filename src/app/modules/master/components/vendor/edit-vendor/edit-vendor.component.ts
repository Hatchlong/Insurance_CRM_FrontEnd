import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { VendorService } from '../../../services/vendor/vendor.service';

@Component({
  selector: 'app-edit-vendor',
  templateUrl: './edit-vendor.component.html',
  styleUrls: ['./edit-vendor.component.css']
})
export class EditVendorComponent {

  vendorFormGroup: any = FormGroup
  vendorDetials: any = []
  isSubmitted: any = false;
  isShowPadding: any = false;
  vendordetailId: any = ''


  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private vendorSer: VendorService,
    private activateRouter: ActivatedRoute


  ) { }
  ngOnInit(): void {
    this.vendordetailId = this.activateRouter.snapshot.paramMap.get('id')
    this.getSingleDetail()
    this.createVendorFormFields()
  }
  createVendorFormFields(data?: any) {
    if (data) {
      this.vendorFormGroup = this.fb.group({
        _id: [data._id, Validators.required],
        vendorId: [data.vendorId],
        vendorName: [data.vendorName, Validators.required],
        address: [data.address, Validators.required],
        country: [data.country, Validators.required],
        state: [data.state, Validators.required],
        city: [data.city, Validators.required],
        postalCode: [data.city, Validators.required],

        financialData: this.fb.array(data.financialData.map((ele: any) => this.getFinancialFields(ele)))

      })
      return;
    }
    this.vendorFormGroup = this.fb.group({
      _id: ['', Validators.required],
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
  getFinancialFields(data?: any) {
    if (data) {
      return this.fb.group({
        taxNumber: [data.taxNumber],
        vatRegistrationNo: [data.vatRegistrationNo],
        currency: [data.currency],
        companyCode: [data.companyCode],
        bankAccount: [data.bankAccount],
        accountHolder: [data.accountHolder],
        paymentMethod: [data.paymentMethod],
      })
    }
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


  //get single data


  async getSingleDetail() {
    try {
      const result: any = await this.vendorSer.singleVendorDetail(this.vendordetailId)
      if (result.status === '1') {
        this.vendorFormGroup.patchValue(result.data)
        // this.createVendorFormFields(result.data)
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

  async submitdata() {
    try {
      this.isSubmitted = true
      if (this.vendorFormGroup.invalid)
        return

      const result: any = await this.vendorSer.updateVendorDetail(this.vendorFormGroup.value)
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
