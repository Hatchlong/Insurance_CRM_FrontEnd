import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { PurchaseOrgService } from '../../../Services/purchase-org/purchase-org.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-edit-purchase-org',
  templateUrl: './edit-purchase-org.component.html',
  styleUrls: ['./edit-purchase-org.component.css']
})
export class EditPurchaseOrgComponent {
  purchOrg: any = FormGroup;
  companyDetails: any = [];
  purchaseOrgId: any = ''
  isSubmitted:any=false
  isShowPadding:any = false;
  countryDetials: any = []
  citiesDetails: any = [];
  idleState: any = 'Not Started'

  constructor(private fb: FormBuilder,
    private companySer: CompanyCodeService,
    private purchaseOrgSer: PurchaseOrgService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private idle: Idle,
    private cd: ChangeDetectorRef
  ) {
    idle.setIdle(450),
      idle.setTimeout(900),
      idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Started';
      cd.detectChanges();
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout';
    })

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'idle';
    })
   }

  ngOnInit(): void {
    this.purchaseOrgId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.purchaseOrgId)
    this.getCompanyDetails(),
    this.getCountryDetails(),
    this.purchOrgData()
    this.getSinglePurchaseOrgDetails()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  purchOrgData() {
    this.purchOrg = this.fb.group({
      _id: ['', Validators.required],
      purchase_org: ['', Validators.required],
      purchase_org_Description: ['', Validators.required],
      companycode: ['', Validators.required],
      companyId: ['', Validators.required],
      countryName: ['', Validators.required],
      countryId: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
    });
  }


  
  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  async getSinglePurchaseOrgDetails() {
    try {
      const result: any = await this.purchaseOrgSer.singlePurchaseOrg(this.purchaseOrgId);
      if (result.status === '1') {
        this.purchOrg.patchValue(result.data);
        this.citiesDetails = this.countryDetials.find((el: any) => el._id === this.purchOrg.value.countryId);
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

  // Create the purchase org Details
  async submitData() {
    try {
      this.isSubmitted=true
      if (this.purchOrg.invalid)
        return 
      const result: any = await this.purchaseOrgSer.updatePurchaseOrg(this.purchOrg.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/purchase-org-list']);
        return;
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
  async getCompanyDetails() {
    try {
      const result: any = await this.companySer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data
      } else {
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

  handleCompany(event: any) {
    const findsalesData = this.companyDetails.find((el: any) => el._id === event.target.value)
    this.purchOrg.controls.companycode.setValue(findsalesData.companyCode)
  }

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companySer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
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


  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.citiesDetails);
    if (this.citiesDetails) {
      this.purchOrg.controls.countryName.setValue(this.citiesDetails.countryName)
    }
  }
}
