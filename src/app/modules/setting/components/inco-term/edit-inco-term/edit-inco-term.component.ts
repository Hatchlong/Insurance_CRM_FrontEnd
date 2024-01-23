import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncTermService } from '../../../Services/inc-term/inc-term.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-edit-inco-term',
  templateUrl: './edit-inco-term.component.html',
  styleUrls: ['./edit-inco-term.component.css']
})
export class EditIncoTermComponent {

  incoTerm: any = FormGroup
  isSubmitted: any = false
  incTermId: any = ''
  isShowPadding: any = false;
  idleState: any = 'Not Started'

  constructor(
    private fb: FormBuilder,
    private incTermSer: IncTermService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private idle: Idle,
    private cd: ChangeDetectorRef
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
    this.incTermId = this.activeRouter.snapshot.paramMap.get('id')
    this.data()
    this.getSingleDetails()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  data() {
    this.incoTerm = this.fb.group({
      _id: ['', Validators.required],
      inc_terms_code: ['', Validators.required],
      description: ['', Validators.required],

    });
  }

  async getSingleDetails() {
    try {
      const result: any = await this.incTermSer.singleIncTermsDetails(this.incTermId)

      if (result.status === '1') {
        this.incoTerm.patchValue(result.data)
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

  async submitData() {
    try {
      this.isSubmitted = true
      if (this.incoTerm.invalid)
        return
      const result: any = await this.incTermSer.updatedIncTermsDetails(this.incoTerm.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/inco-term-list/'])
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
