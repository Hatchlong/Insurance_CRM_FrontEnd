import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ModeOfTransportService } from '../../../Services/mode-of-transport/mode-of-transport.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-mode-of-transport',
  templateUrl: './edit-mode-of-transport.component.html',
  styleUrls: ['./edit-mode-of-transport.component.css']
})
export class EditModeOfTransportComponent {

  transport: any = FormGroup
  modeOfTransportId: any = ''

  isSubmitted: any = false
  constructor(
    private fb: FormBuilder,
    private motSer: ModeOfTransportService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _snackBar: MatSnackBar


  ) { }

  ngOnInit(): void {
    this.modeOfTransportId = this.activeRouter.snapshot.paramMap.get('id')
    this.code()
    this.getSingleModeOfTransportDetails()
  }

  code() {
    this.transport = this.fb.group({
      _id: ['', Validators.required],
      modeOfTransport: ['', Validators.required],
      motDescription: ['', Validators.required]

    })
  }

  // get single data 

  async getSingleModeOfTransportDetails() {
    try {
      const result: any = await this.motSer.singleModeOfTransportDetails(this.modeOfTransportId);
      if (result.status === '1') {
        this.transport.patchValue(result.data);
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

  // Create the purchase org Details
  async submitData() {
    try {
      if (this.transport.invalid)
        return
      const result: any = await this.motSer.updatedModeOfTransportDetails(this.transport.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, 'Success', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/modeOf-transport-list/']);
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


}
