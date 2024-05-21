import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModelService } from '../../../services/model/model.service';

@Component({
  selector: 'app-edit-model',
  templateUrl: './edit-model.component.html',
  styleUrls: ['./edit-model.component.css']
})
export class EditModelComponent {


  modelDetailFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  modelDetailId: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private modelSer: ModelService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.modelDetailId=this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getSingleModelDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.modelDetailFormGroup = this.fb.group({
      _id: ['', [Validators.required]],
      modelId: ['', [Validators.required]],
      description: ['', Validators.required],

    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.modelDetailFormGroup, this.modelDetailFormGroup.invalid)
      if (this.modelDetailFormGroup.invalid)
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

      this.modelDetailFormGroup.value.createdOn = fullDate
      this.modelDetailFormGroup.value.createdBy = username
      this.modelDetailFormGroup.value.changedOn = fullDate
      this.modelDetailFormGroup.value.changedBy = username


      const result: any = await this.modelSer.updatemodelDetail(this.modelDetailFormGroup.value)
      console.log(result, "ttrrtr")
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/model-list']);
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
  async getSingleModelDetail() {
    try {
      const result: any = await this.modelSer.singlemodelDetail(this.modelDetailId)
      if (result.status === '1') {
        this.modelDetailFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


}
