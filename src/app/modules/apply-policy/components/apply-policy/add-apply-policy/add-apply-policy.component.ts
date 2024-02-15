import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ApplyPolicyService } from '../../../services/apply-policy/apply-policy.service';

@Component({
  selector: 'app-add-apply-policy',
  templateUrl: './add-apply-policy.component.html',
  styleUrls: ['./add-apply-policy.component.css']
})
export class AddApplyPolicyComponent {

  
  isShowPadding: any = false
  policyFormData: any = FormGroup
  imageSrc: any = '';
  isSubmitted: any = false;


  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    private applyPolicySer:ApplyPolicyService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
    this.createAgentData()
  }
  createAgentData() {
    this.policyFormData = this.fb.group({
      customerName: ['', Validators.required],
      policyType: ['', Validators.required],
      policyCompany: ['', Validators.required],
      policyCode: ['', Validators.required],
      description: ['', Validators.required],
      issueDate: ['', Validators.required],
      startDate: ['',Validators.required],
      expiryDate: ['',Validators.required],
      polcyNo: ['',Validators.required]
    })
  }

  async submitData() {
    try {
      this.isSubmitted = true;
      if (this.policyFormData.invalid) {
        return
      }

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
      const userName: any = localStorage.getItem('userName')
      this.policyFormData.value.createdOn = fullDate
      this.policyFormData.value.createdBy = userName
      this.policyFormData.value.changedOn = fullDate
      this.policyFormData.value.changedBy = userName;
      console.log(this.policyFormData.value, this.policyFormData.invalid)
      const result: any = await this.applyPolicySer.createApplyPolicyData(this.policyFormData.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/applyPolicy/apply-policy-list']);
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
