import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ViewPdfComponent } from 'src/app/modules/setting/components/view-pdf/view-pdf/view-pdf.component';
import { ViewImageComponent } from '../../view-image/view-image/view-image.component';
import { AgentService } from '../../../services/agent/agent.service';

@Component({
  selector: 'app-view-agent',
  templateUrl: './view-agent.component.html',
  styleUrls: ['./view-agent.component.css']
})
export class ViewAgentComponent {


  agentFormData: any = FormGroup
  isSubmitted: any = false;
  isShowPadding: any = false;
  profileId: any = ''
  imageSrc: any = '';
  profileDetails: any = []
  assetDetail: any = []
  isImageShow: any = false;
  filePath: any = '';
  resultData: any = [];


  constructor(
    private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private router: Router,
    public dialogRef: MatDialogRef<ViewAgentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialog: MatDialog,
    private agentSer: AgentService
  ) { }

  ngOnInit(): void {
    this.profileId = this.data
    this.cretaedata()
    this.singleAgentDetails()
  }


  cretaedata() {

    this.agentFormData = this.fb.group({
      _id: ['', Validators.required],
      agentId: ['', Validators.required],
      agentName: ['', Validators.required],
      filePath: [''],
      address: [''],
      dob: [''],
      countryId: ['', Validators.required],
      countryName: [''],
      city: ['', Validators.required],
      stateId: ['', [Validators.required]],
      stateName: ['', [Validators.required]],
      pinCode: [''],
      mobile: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      mailId: ['', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')]],
      aadharNumber: [''],
      panNumber: [''],
      panFilePath: [''],
      aadharFilePath: [''],
      createdOn: [''],
      createdBy: [''],
      changedOn: [''],
      changedBy: [''],
      highestQualification: [''],
      gender: [''],
      role: [''],
      accountNumber: [''],
      bankName: [''],
      bankBranch: [''],
      ifscCode: [''],
      accountType: [''],
      signatureFilePath: [''],
      chequeFilePath: ['']

    })
  }

  //get single detail
  async singleAgentDetails() {
    try {
      const result: any = await this.agentSer.singleAgentDetail(this.profileId)
      console.log(result.data);
      this.resultData = result.data

      if (result.status === '401') {
        this.router.navigate(['/'])
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

      if (result.status === '1') {
        this.resultData = result.data
        this.agentFormData.patchValue(result.data)
        // this.cretaedata(result.data)
        if (result.data.filePath) {
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data.filePath
        }

      }
    } catch (error) {
      console.log(error)
    }
  }

  openDialog(fileName: any) {
    // console.log(this.agentFormData.value.kycList[i].uploadFile);
    const splitValue = this.agentFormData.value.aadharFilePath.split('.');
    const splitValue1 = this.agentFormData.value.panFilePath.split('.');
    const splitValue2 = this.agentFormData.value.signatureFilePath.split('.');
    const splitValue3 = this.agentFormData.value.chequeFilePath.split('.');
    console.log(splitValue[1], 'split');

    let dialogRef: any;
    if (splitValue[1] === 'pdf'|| splitValue1[1] === 'pdf'|| splitValue2[1] === 'pdf' || splitValue3[1] === 'pdf') {
      dialogRef = this.dialog.open(ViewPdfComponent, {
        data: fileName
      });
    }
    else {
      dialogRef = this.dialog.open(ViewImageComponent, {
        data: fileName
      });
    }

    // let result: any;
    // dialogRef.afterClosed().subscribe(result => {
    //   console.log(`Dialog result: ${result}`);
    // });
  }

}
