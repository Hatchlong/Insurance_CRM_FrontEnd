import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModeOfTransportService } from '../../../Services/mode-of-transport/mode-of-transport.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-mode-of-transport',
  templateUrl: './add-mode-of-transport.component.html',
  styleUrls: ['./add-mode-of-transport.component.css']
})
export class AddModeOfTransportComponent {

  transport: any = FormGroup
  isSubmitted: any = false
  constructor(
    private fb: FormBuilder,
    private motSer: ModeOfTransportService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.code()
  }

  code() {
    this.transport = this.fb.group({
      modeOfTransport: ['', Validators.required],
      motDescription: ['', Validators.required]

    })
  }

  async addMode() {
    try {
      this.isSubmitted = true
      if (this.transport.invalid)
        return
      const result: any = await this.motSer.createModeOfTransport(this.transport.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/modeOf-transport-list/']);
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
