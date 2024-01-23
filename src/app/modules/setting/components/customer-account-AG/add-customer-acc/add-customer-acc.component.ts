import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerAccountAGService } from '../../../Services/customer-account-AG/customer-account-ag.service';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-add-customer-acc',
  templateUrl: './add-customer-acc.component.html',
  styleUrls: ['./add-customer-acc.component.css']
})
export class AddCustomerAccComponent implements OnInit {


  customerAcc: any = FormGroup;
  isSubmitted: any = false;
  isShowPadding:any = false;
  idleState:any = 'Not Started'

  constructor(
    private fb: FormBuilder,
    private customerAccountSer: CustomerAccountAGService,
    private router: Router,
    private _snackBar: MatSnackBar,
    private idle:Idle,
    private cd:ChangeDetectorRef
  ) { 
    idle.setIdle(450),
    idle.setTimeout(900),
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);


    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'Started';
      cd.detectChanges();
    })

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timeout';
    })

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'idle';
    })
  }

  ngOnInit(): void {
    this.channeldata()
    this.setStates()
  }

  setStates(){
    this.idle.watch();
    this.idleState = 'Started'
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  channeldata() {
    this.customerAcc = this.fb.group({
      customerAccountAG: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      descriptionCAAG: ['', Validators.required]
    });

  }

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.customerAcc.invalid)
        return
      const result: any = await this.customerAccountSer.createCustomerAccountDetails(this.customerAcc.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/customer-account-list'])
        return
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
