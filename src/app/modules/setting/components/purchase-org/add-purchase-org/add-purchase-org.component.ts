import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-purchase-org',
  templateUrl: './add-purchase-org.component.html',
  styleUrls: ['./add-purchase-org.component.css']
})
export class AddPurchaseOrgComponent implements OnInit {
  purchOrg: any = FormGroup;
  companyDetails: any = []
  isSubmitted:any=false 

  constructor(private fb: FormBuilder,
    private companySer: CompanyCodeService,
    private purchaseOrgSer: PurchaseOrgService,
    private router: Router,
    private _snackBar:MatSnackBar
  ) { }  

  ngOnInit(): void {
    this.getCompanyDetails()
    this.purchOrgData()
  }

  purchOrgData() {
    this.purchOrg = this.fb.group({
      purchase_org: ['', Validators.required],
      purchase_org_Description: ['', Validators.required],
      companycode: ['', Validators.required]
    });
    console.warn(this.purchOrg.value)
  }

  // Create the purchase org Details
  async submitData() {
    try {
      this.isSubmitted=true
      if (this.purchOrg.invalid) 
        return 
      const result: any = await this.purchaseOrgSer.createPurchaseOrgDetails(this.purchOrg.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, 'Success', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/purchase-org-list']);
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


  // Get All details for company code
  async getCompanyDetails() {
    try {
      const result: any = await this.companySer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data
      } else {
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
}
