import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { PolictTypeService } from '../../../services/policy-type/polict-type.service';

@Component({
  selector: 'app-edit-policy-type',
  templateUrl: './edit-policy-type.component.html',
  styleUrls: ['./edit-policy-type.component.css']
})
export class EditPolicyTypeComponent {


  policyTypeFormGroup: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding: any = false;
  policyTypeId: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private policyTypeSer: PolictTypeService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.policyTypeId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getSinglePolicyTypeDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.policyTypeFormGroup = this.fb.group({
      _id: ['', [Validators.required]],
      policyType: ['', [Validators.required]],
      description: ['', Validators.required],

    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.policyTypeFormGroup, this.policyTypeFormGroup.invalid)
      if (this.policyTypeFormGroup.invalid)
        return

      const username: any = localStorage.getItem('userName')

      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1; // Months are zero-indexed, so add 1
      const day = currentDate.getDate();
      const hours = currentDate.getHours();
      const minutes = currentDate.getMinutes();
      const seconds = currentDate.getSeconds();

      // Format the date and time
      const fullDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')} ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

      this.policyTypeFormGroup.value.changedOn = fullDate
      this.policyTypeFormGroup.value.changedBy = username


      const result: any = await this.policyTypeSer.updatepolicyTypeDetail(this.policyTypeFormGroup.value)
      console.log(result, "ttrrtr")
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/policy-type-list']);
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

  //get singleDetail
  async getSinglePolicyTypeDetail() {
    try {
      const result: any = await this.policyTypeSer.singlepolicyTypeDetail(this.policyTypeId)
      if (result.status === '1') {
        this.policyTypeFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


}
