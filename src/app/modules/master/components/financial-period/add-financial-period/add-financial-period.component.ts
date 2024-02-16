import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FinancialPeriodService } from '../../../services/financial-period/financial-period.service';

@Component({
  selector: 'app-add-financial-period',
  templateUrl: './add-financial-period.component.html',
  styleUrls: ['./add-financial-period.component.css']
})
export class AddFinancialPeriodComponent implements OnInit{

  financialPeriodData: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar : MatSnackBar,
    private financialSer: FinancialPeriodService
  ){}

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
    this.createData()
  }

  monthOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  monthStringToNumeric: any = {
    'Jan': 1,
    'Feb': 2,
    'Mar': 3,
    'Apr': 4,
    'May': 5,
    'Jun': 6,
    'Jul': 7,
    'Aug': 8,
    'Sep': 9,
    'Oct': 10,
    'Nov': 11,
    'Dec': 12
  };

  createData(){
    this.financialPeriodData = this.fb.group({
      periodCode : ['', Validators.required],
      fromMonth: ['', Validators.required],
      fromYear: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      toMonth: ['', Validators.required],
      toYear: ['', [Validators.required, Validators.pattern('^[0-9]*$')]]
    }, {validator: this.dateRangeValidator('fromYear', 'toYear')})
  }

  dateRangeValidator = (fromYear: string, toYear: string) => (financialPeriodData:any = FormGroup) => {
    const from = financialPeriodData.get(fromYear).value;
    const to = financialPeriodData.get(toYear).value;
  
    if (from && to && from > to) {
      financialPeriodData.get('toYear').setErrors({ invalidRange: true });
      return { dateRange: true };
    } else {
      financialPeriodData.get('toYear').setErrors(null);
    }
  
    return null;
  }
   

  onlyNumberKey(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.financialPeriodData.invalid)
        return
      const result: any = await this.financialSer.createFinancial(this.financialPeriodData.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/financial-period-list/'])
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

}
