import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DivionService } from '../../../Services/divion/divion.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-divion',
  templateUrl: './add-divion.component.html',
  styleUrls: ['./add-divion.component.css']
})

export class AddDivionComponent implements OnInit {

  divionData: any = FormGroup
  isSubmitted: any = false
  constructor(private fb: FormBuilder,
    private divisionSer: DivionService,
    private router: Router,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.channeldata()
  }

  channeldata() {
    this.divionData = this.fb.group({
      divion: ['', Validators.required],
      divionDescription: ['', Validators.required]
    });
    console.warn(this.divionData.value)
  }


  async submitData() {
    try {
      this.isSubmitted = true
      if (this.divionData.invalid)
        return
      const result: any = await this.divisionSer.createDivionDetails(this.divionData.value);
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
