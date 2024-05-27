import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { RoleService } from '../../../services/role/role.service';
import { AuthrService } from 'src/app/modules/authr/services/authr/authr.service';

@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.css']
})
export class AddRoleComponent {

  userFormGroup: any = FormGroup;
  userDetails: any = [];
  rolesList: any = [];
  isShowPadding: any = false;
  idleState: any = 'Not Started';
  isLoader: any = false;
  isSubmitted: any = '';
  screenList: any = [];
  subScreenList: any = []



  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _snackBar: MatSnackBar,
    private roleSer: RoleService,
    private authSer: AuthrService

  ) { }

  ngOnInit(): void {
    this.createFormFields()
    this.getAllRoleDetails();
    this.getAllScreenDetails()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }


  createFormFields(data?: any) {

    this.userFormGroup = this.fb.group({
      roleId: ['', [Validators.required]],
      roleName: ['', [Validators.required]],
      rolesAccess: this.fb.array([this.createRoleAccessField()])
    })
  }



  get roleAccessControl() {
    return this.userFormGroup.get('rolesAccess') as FormArray
  }


  createRoleAccessField(data?: any) {
    return this.fb.group({
      screenId: ['', [Validators.required]],
      add: ['Y', [Validators.required]],
      modify: ['Y', [Validators.required]],
      close: ['Y', [Validators.required]],
      print: ['Y', [Validators.required]],
      download: ['Y', [Validators.required]],
      view: ['Y', [Validators.required]],
      delete: ['Y', [Validators.required]],
      reopen: ['Y', [Validators.required]],
      auth: ['Y', [Validators.required]],
      release: ['Y', [Validators.required]]
    })
  }

  addRoleAccessRow(singleAdded?: any) {
    this.roleAccessControl.push(this.createRoleAccessField())
    if (!singleAdded) {
      const formArray = this.userFormGroup.get('rolesAccess') as FormArray;

      this.userFormGroup.value.rolesAccess.map((el: any, i: any) => {
        const formGroup = formArray.at(i) as FormGroup;
        formGroup.patchValue({
          screenId: this.subScreenList[i].subMenuName
        })
      });
    }
  }

  deleteRoleAccessRow(index: any, screenId: any) {
    if (screenId) {
      this.subScreenList.map((el: any) => {
        if (el.subMenuName === screenId) {
          el.disable = false
        }
      })
    }
    this.roleAccessControl.removeAt(index);
  }


  async getAllScreenDetails() {
    try {
      const result: any = await this.authSer.getScreenDetails();
      if (result.status === '1') {
        this.screenList = result.data;
        this.screenList.map((el: any) => {
          el.subMenu.map((ele: any) => {
            this.subScreenList.push(ele)
          })
        })
      }
    } catch (error: any) {
      console.error(error)
      this.isLoader = false;
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  async getAllRoleDetails() {
    try {
      const result: any = await this.roleSer.getAllrolesDetails();
      if (result.status === '1') {
        this.rolesList = result.data;
      }
    } catch (error: any) {
      console.error(error)
      this.isLoader = false;
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });;
    }
  }

  handleCheck(event: any, text: any, index: any) {
    const formArray = this.userFormGroup.get('rolesAccess') as FormArray;
    const formGroup = formArray.at(index) as FormGroup;
    if (event.target.checked) {
      formGroup.patchValue({
        [text]: 'Y'
      })
    } else {
      formGroup.patchValue({
        [text]: 'N'
      })
    }
  }

  handle(event: any) {
    if (event.target.value) {
      this.subScreenList.map((el: any) => {
        el.disable = false;
      })
      this.subScreenList.map((el: any) => el.disable = false)
      this.userFormGroup.value.rolesAccess.map((el: any) => {
        this.subScreenList.map((ele: any) => {
          if (el.screenId === ele.subMenuName) {
            ele.disable = true
          }
        })

      })
    }
  }




  selectRoleName(event: any) {
    if (event.target.value) {
      const findRole = this.rolesList.find((el: any) => el.roleName === event.target.value);
      this.userFormGroup.controls.roleName.setValue(findRole.description);
    }
  }


  async createUserManitenance() {
    try {
      this.isSubmitted = true;
      console.log(this.userFormGroup.value)
      if (this.userFormGroup.invalid)
        return
      const result: any = await this.roleSer.createScreenAccess(this.userFormGroup.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/setting/roles-list']);
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
      this.isLoader = false;
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


  addRoleAllAccessRow() {
    for (let i = 0; i < this.subScreenList.length; i++) {
      const itemsArray = this.userFormGroup.get('rolesAccess') as FormArray;
      const formGroup: any = itemsArray.at(i) as FormGroup;
      if (this.userFormGroup.value.rolesAccess[i]) {
        this.subScreenList[i].disable = true
        formGroup.patchValue({
          screenId: this.subScreenList[i].subMenuName,
        })
      } else {
        this.subScreenList[i].disable = true
        this.addRoleAccessRow(false);
      }
    }
  }



}
