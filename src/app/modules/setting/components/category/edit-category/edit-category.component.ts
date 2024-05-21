import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent {


  categoryDetailFormGroup: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  categoryDetailId: any = ''
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private categorySer: CategoryService,
    private activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.categoryDetailId = this.activateRouter.snapshot.paramMap.get('id')
    this.createdata()
    this.getSingleCategoryDetail()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createdata() {
    this.categoryDetailFormGroup = this.fb.group({
      _id: ['', [Validators.required]],
      categoryId: ['', [Validators.required]],
      description: ['', Validators.required],

    });

  }

  //get singleDetail
  async getSingleCategoryDetail() {
    try {
      const result: any = await this.categorySer.singlecategoryDetail(this.categoryDetailId)
      if (result.status === '1') {
        this.categoryDetailFormGroup.patchValue(result.data)
      }
    } catch (error) {
      console.log(error)
    }
  }


  async submitData() {
    try {
      this.isSubmitted = true
      console.log(this.categoryDetailFormGroup, this.categoryDetailFormGroup.invalid)
      if (this.categoryDetailFormGroup.invalid)
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

      this.categoryDetailFormGroup.value.changedOn = fullDate
      this.categoryDetailFormGroup.value.changedBy = username


      const result: any = await this.categorySer.updatecategoryDetail(this.categoryDetailFormGroup.value)
      console.log(result, "ttrrtr")
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/category-list']);
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
