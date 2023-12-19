import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DistibutionChannelService } from '../../../Services/distibution-channel/distibution-channel.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-distibution-channel',
  templateUrl: './edit-distibution-channel.component.html',
  styleUrls: ['./edit-distibution-channel.component.css']
})
export class EditDistibutionChannelComponent implements OnInit {

  channel: any = FormGroup
  isSubmitted: any = false
  distributionId: any = ''


  constructor(private fb: FormBuilder,
    private distribustionSer: DistibutionChannelService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _snackBar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.distributionId = this.activeRouter.snapshot.paramMap.get('id');
    console.log(this.distributionId)
    this.getSingleDistributionDetails()
    this.channeldata()
  }

  channeldata() {
    this.channel = this.fb.group({
      _id: ['', Validators.required],
      distributionChannel: ['', Validators.required],
      distributionDescription: ['', Validators.required]
    });

  }

  async getSingleDistributionDetails() {
    try {
      const result: any = await this.distribustionSer.singleDistibutionChannel(this.distributionId);
      if (result.status === '1') {
        this.channel.patchValue(result.data);
      }
    } catch (error:any) {
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



  async submitData() {
    try {
      this.isSubmitted = true
      if (this.channel.invalid)
        return
      const result: any = await this.distribustionSer.updateDistibutionChannel(this.channel.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, 'Success', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/distribution-channel-list'])
        return;
      }
      if (result.status === '0') {
        this._snackBar.open(result.message, 'Error', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error:any) {
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
