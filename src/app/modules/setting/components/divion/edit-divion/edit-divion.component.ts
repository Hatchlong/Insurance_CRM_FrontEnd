import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DivionService } from '../../../Services/divion/divion.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-divion',
  templateUrl: './edit-divion.component.html',
  styleUrls: ['./edit-divion.component.css']
})
export class EditDivionComponent {

  divionData: any = FormGroup
  isSubmitted: any = false
  divionId: any = ''
  isShowPadding:any = false
  constructor(private fb: FormBuilder,
    private divisionSer: DivionService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.divionId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.divionId)
    this.getSingleDivionDetails()
    this.channeldata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  channeldata() {
    this.divionData = this.fb.group({
      _id: ['', Validators.required],
      divion: ['', Validators.required],
      divionDescription: ['', Validators.required]
    });
  }

  async getSingleDivionDetails() {
    try {
      const result: any = await this.divisionSer.singleDivionDetails(this.divionId);
      if (result.status === '1') {
        this.divionData.patchValue(result.data);
      }
    } catch (error:any) {
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

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.divionData.invalid)
        return 
      const result: any = await this.divisionSer.updateDivion(this.divionData.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/divion-list'])
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


} 
