import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DistibutionChannelService } from '../../../Services/distibution-channel/distibution-channel.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-distribution-channel',
  templateUrl: './add-distribution-channel.component.html',
  styleUrls: ['./add-distribution-channel.component.css']
})
export class AddDistributionChannelComponent implements OnInit {


  channel: any = FormGroup
  isSubmitted: any = false;
  isShowPadding:any = false;
  constructor(private fb: FormBuilder,
    private distribustionSer: DistibutionChannelService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.channeldata()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  channeldata() {
    this.channel = this.fb.group({
      distributionChannel: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      distributionDescription: ['', Validators.required]
    });
    console.warn(this.channel.value)

  }



  async submitData() {
    try {
      this.isSubmitted = true
      if (this.channel.invalid)
        return
      const result: any = await this.distribustionSer.createDistibutionChannelDetails(this.channel.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/distribution-channel-list'])
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