import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoTypeService } from '../../../Services/po-type.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-add-po-type',
  templateUrl: './add-po-type.component.html',
  styleUrls: ['./add-po-type.component.css']
})
export class AddPoTypeComponent {

  poType: any = FormGroup
  poTypeDetail: any = []
  isSubmitted: any = false
  isShowPadding: any = false;
  idleState: any = 'Not Started'

  constructor(
    private fb: FormBuilder,
    private potypeSer: PoTypeService,
    private router: Router,
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
    this.getPotype()
    this.code()
    this.setStates()
  }

  setStates() {
    this.idle.watch();
    this.idleState = 'Started'
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  code() {
    this.poType = this.fb.group({
      poType: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      poTypeDescription: ['', Validators.required],
      itemNumberInterval: ['', Validators.required],
      internalNumberRangeAssignment: ['internal', Validators.required],
      numberRange: [{ value: '', disabled: true }, Validators.required],
      from: [{ value: '', disabled: true }, Validators.required],
      to: [{ value: '', disabled: true }, Validators.required],

    });
  }


  //submit data
  async addCode() {
    try {
      this.isSubmitted = true
      if (this.poType.invalid)
        return
      const result: any = await this.potypeSer.createpoTypeDetail(this.poType.value)
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/po-type-list']);
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

  // read all data

  async getPotype() {
    try {
      const result: any = await this.potypeSer.getAllPoType();
      if (result.status === '1') {
        this.poTypeDetail = result.data
      }
      else {
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
  

  // // Function to enable/disable input fields based on the radio button selection
  onRadioButtonChange(event: any): void {
    const radioButtonOption = event.target.value;
      if (radioButtonOption === 'external') {
      // Enable input fields when the second option is selected
      this.poType.get('numberRange').enable();
      this.poType.get('from').enable();
      this.poType.get('to').enable();
    } else {
      // Disable input fields for other options
      this.poType.get('numberRange').disable();
      this.poType.get('from').disable();
      this.poType.get('to').disable();
    }
  }

  

}
