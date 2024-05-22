import { Component, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/modules/setting/services/category/category.service';
import { MakeService } from 'src/app/modules/setting/services/make/make.service';
import { ModelService } from 'src/app/modules/setting/services/model/model.service';
import { PolictTypeService } from 'src/app/modules/setting/services/policy-type/polict-type.service';
import { RtoStateService } from 'src/app/modules/setting/services/rto-state/rto-state.service';
import { VehicleCategoryService } from 'src/app/modules/setting/services/vehicle-category/vehicle-category.service';
import { YearOfManufactureService } from 'src/app/modules/setting/services/year-of-manufacture/year-of-manufacture.service';
import { PospService } from '../../../services/posp/posp.service';
import { VendorService } from 'src/app/modules/master/services/vendor/vendor.service';

@Component({
  selector: 'app-add-agent-report',
  templateUrl: './add-agent-report.component.html',
  styleUrls: ['./add-agent-report.component.css']
})
export class AddAgentReportComponent {

  candidateFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  imageSrc: any = '';
  filedPathName: any = '';
  inputControl: any = '';
  @ViewChild('inputFile') inputFile: any;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  jobDetail: any = []
  makeDetail: any = []
  modelDetail: any = []
  categoryDetail: any = []
  policyTypeDetail: any = []
  yearOfManufactureDetail: any = []
  rtoStateDetail: any = []
  vehicleCategoryDetail: any = []
  insurerDetail: any = []
  today: string = '';
  dateError: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private makeSer: MakeService,
    private modelSer: ModelService,
    private categorySer: CategoryService,
    private policyTypeSer: PolictTypeService,
    private yearManuSer: YearOfManufactureService,
    private rtoStateSer: RtoStateService,
    private vehicleCategorySer: VehicleCategoryService,
    private agentReportSer: PospService,
    private vendorSer: VendorService
  ) {
    this.today = new Date().toISOString().split('T')[0];

  }

  ngOnInit(): void {
    this.data()
    this.getAllMakeDetails()
    this.getAllModelDetails()
    this.getAllCategoryDetails()
    this.getAllPolicyTypeDetails()
    this.getAllYearManufactureDetails()
    this.getAllRTOStateDetails()
    this.getAllVehicleCategoryDetails()
    this.getAllVendorDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  data() {
    this.candidateFormGroup = this.fb.group({
      policyNumber: ['', Validators.required],
      insuredName: ['', [Validators.required]],
      policyIssueDate: [''],
      startDate: [''],
      expiryDate: [''],
      make: [''],
      model: [''],
      yearOfManufacturing: [''],
      policyType: [''],
      category: [''],
      vehicleRagistrationNo: ['', this.validateVehicleRegistration],
      tonnage: ['',this.customValidator()],
      insurer_company: [''],
      net_premium: ['',this.customValidator()],
      OD_premium: ['',this.customValidator()],
      policy_premium: ['',this.customValidator()],
      RTOstatusCode: [''],
      RTOvehicleCode: [''],
      commission_percentage: ['',this.customValidator()],
      commission_amount: ['',this.customValidator()],

    });
  }
  validateDates(): void {
    const startDate = this.candidateFormGroup.get('startDate')?.value;
    const expiryDate = this.candidateFormGroup.get('expiryDate')?.value;

    if (startDate && expiryDate) {
      // Check if the expiry date is before the start date
      this.dateError = new Date(startDate) > new Date(expiryDate);
    } else {
      this.dateError = false;
    }
  }

  customValidator() {
    return (control:any) => {
      const value = control.value != null ? String(control.value) : null;
      // Check if value is null or undefined
      if (value == null) {
        return null; // Return null if value is null or undefined
      }
      // Check if input value is not '0' when it's at the first position
      if (value.length === 1 && value[0] === '0') {
        return { invalidFirstDigit: true };
      }
      return null;
    };
  }
  
  validateInput() {
    this.candidateFormGroup.get('tonnage').markAsTouched();
    this.candidateFormGroup.get('tonnage').updateValueAndValidity();
  }

  validateVehicleRegistration(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value && value.length >= 2) {
      const firstTwoChars = value.substring(0, 2);
      const lettersRegex = /^[A-Za-z]{2}$/;
      if (!lettersRegex.test(firstTwoChars)) {
        return { invalidFirstTwoChars: true };
      }
    }
    return null;
  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.candidateFormGroup.value);

      if (this.candidateFormGroup.invalid)
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

      this.candidateFormGroup.value.createdOn = fullDate
      this.candidateFormGroup.value.createdBy = username
      this.candidateFormGroup.value.changedOn = fullDate
      this.candidateFormGroup.value.changedBy = username

      const result: any = await this.agentReportSer.createAgentReport(this.candidateFormGroup.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/posp/agent-report-list/'])
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
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });

    }
  }

  async getAllMakeDetails() {
    try {
      const result: any = await this.makeSer.getAllmakeDetail()
      if (result.status === '1') {
        this.makeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllModelDetails() {
    try {
      const result: any = await this.modelSer.getAllmodelDetail()
      if (result.status === '1') {
        this.modelDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  async getAllCategoryDetails() {
    try {
      const result: any = await this.categorySer.getAllcategoryDetail()
      if (result.status === '1') {
        this.categoryDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllPolicyTypeDetails() {
    try {
      const result: any = await this.policyTypeSer.getAllpolicyTypeDetail()
      if (result.status === '1') {
        this.policyTypeDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllYearManufactureDetails() {
    try {
      const result: any = await this.yearManuSer.getAllyearOfManfactureDetail()
      if (result.status === '1') {
        this.yearOfManufactureDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllRTOStateDetails() {
    try {
      const result: any = await this.rtoStateSer.getAllRtoStateDetail()
      if (result.status === '1') {
        this.rtoStateDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  async getAllVehicleCategoryDetails() {
    try {
      const result: any = await this.vehicleCategorySer.getAllVehicleCategoryDetail()
      if (result.status === '1') {
        this.vehicleCategoryDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }
  async getAllVendorDetails() {
    try {
      const result: any = await this.vendorSer.getAllVendorDetail()
      if (result.status === '1') {
        this.insurerDetail = result.data
      }
    } catch (error) {
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

}
