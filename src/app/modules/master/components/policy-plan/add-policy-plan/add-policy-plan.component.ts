import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PolicyPlanService } from '../../../services/policy-plan/policy-plan.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-policy-plan',
  templateUrl: './add-policy-plan.component.html',
  styleUrls: ['./add-policy-plan.component.css']
})
export class AddPolicyPlanComponent {

  isShowPadding: any = false
  policyFormData: any = FormGroup
  imageSrc: any = '';
  isSubmitted: any = false;


  constructor(private fb: FormBuilder,
    private policyPlanSer: PolicyPlanService,
    private _snackBar: MatSnackBar,
    private router: Router
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
    this.createAgentData()
  }
  createAgentData() {
    this.policyFormData = this.fb.group({
      policyCode: ['', Validators.required],
      policyName: ['', Validators.required],
      policyType: ['', Validators.required],
      varient: ['', Validators.required],
      tenor: ['', Validators.required],
      companyName: ['', Validators.required],
      slab: [''],
      additionalHealth: [''],
      totalGridAmount: [''],
      gridOnOD: [''],
      usgiNet: [''],
      numNet: [''],
      numNetTp: [''],
      terrorism: [''],
      commisionPer: [''],
      commisionAmount: ['']


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
      const result: any = await this.policyPlanSer.createPolicyPlan(this.policyFormData.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/policy-plan-list']);
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
