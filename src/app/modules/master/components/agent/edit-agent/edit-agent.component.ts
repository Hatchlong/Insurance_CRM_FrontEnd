import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AgentService } from '../../../services/agent/agent.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ViewImageComponent } from '../../view-image/view-image/view-image.component';
import Swal from 'sweetalert2';
import { CompanyCodeService } from 'src/app/modules/setting/services/company-code/company-code.service';
import { ViewPdfComponent } from 'src/app/modules/setting/components/view-pdf/view-pdf/view-pdf.component';

@Component({
  selector: 'app-edit-agent',
  templateUrl: './edit-agent.component.html',
  styleUrls: ['./edit-agent.component.css']
})
export class EditAgentComponent {

  isShowPadding: any = false
  agentFormData: any = FormGroup
  isSubmitted: any = false;
  agentDataId: any = ''
  isImageShow: any = false;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  filePath: any = '';
  imageSrc: any = '';
  @ViewChild('inputFile') inputFile: any;
  filedPathName: any = '';
  inputControl: any = '';
  countryDetials: any = [];
  stateDetails: any = [];
  citiesDetails: any = [];
  isLookValue: any = false;



  constructor(private fb: FormBuilder,
    private _snackBar: MatSnackBar,
    private agentSer: AgentService,
    private activeRouter: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    private companyCodeSer: CompanyCodeService
  ) { }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  ngOnInit(): void {
    this.agentDataId = this.activeRouter.snapshot.paramMap.get('id')
    this.createAgentData()
    this.getCountryDetails()
  }


  createAgentData() {
    this.agentFormData = this.fb.group({
      // _id: ['', Validators.required],
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

  onlyNumberKey(event: any) {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      event.preventDefault();
    }
  }

  //get single data

  async getSingleDetail() {
    try {
      const result: any = await this.agentSer.singleAgentDetail(this.agentDataId)
      // console.log(result.data, 'ioii');

      if (result.status === '1') {
        this.agentFormData.patchValue(result.data)
        if (result.data.filePath) {
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data.filePath
        }
        this.stateDetails = this.countryDetials.find((el: any) => el._id === this.agentFormData.value.countryId);

        const findCity = this.stateDetails.states.find((el: any) => el._id === this.agentFormData.value.stateId);
        this.citiesDetails = findCity.cities[0]
      }
    } catch (error) {
      console.error(error);

    }
  }
  // Create the purchase org Details
  async submitData() {
    try {
      this.isSubmitted = true;
      console.log(this.agentFormData)
      if (this.agentFormData.invalid)
        return
      const result: any = await this.agentSer.updateAgentDetail(this.agentFormData.value,this.agentDataId);
      console.log(this.agentDataId,'agent');
      
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/master/agent-list']);
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

  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }


  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }


  handleUploadFile(event: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg' || splitValue[1] === 'pdf') {

        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(this.filedPathName)
        if (this.filedPathName === 'company_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        }
        else if (this.filedPathName === 'aadhar_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'pan_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        }
        else if (this.filedPathName === 'signature') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        }
        else if (this.filedPathName === 'cheque') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        }
        else {
          this.fileName = event.target.files[0].name;
          this.selectedFile = event.target.files[0];
          reader.onload = e => this.imageSrc = reader.result;
        }

        reader.readAsDataURL(file);
        this.inputControl.value = ''
      } else {
        this._snackBar.open('Only support image', '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }

    }
  }


  async fileUploadVerifyNo() {
    try {
      console.log(this.selectedFileVerfiy, 'kkkkk')
      if (!this.selectedFileVerfiy) {
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFileVerfiy);
      const result: any = await this.agentSer.agentLogoUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        if (this.filedPathName === 'log') {
          this.agentFormData.controls.filePath.setValue(result.fileName)
        }
        else if (this.filedPathName === 'pan_no') {
          this.agentFormData.controls.panFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'aadhar_no') {
          this.agentFormData.controls.aadharFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'signature') {
          this.agentFormData.controls.signatureFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'cheque') {
          this.agentFormData.controls.chequeFilePath.setValue(result.fileName)
        }
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
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  async fileUpload() {
    try {

      if (!this.imageSrc) {
        this.submitData()
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.agentSer.agentLogoUpload(formData);
      if (result.status === '1') {
        // this._snackBar.open(result.message, '', {
        //   duration: 5 * 1000, horizontalPosition: 'center',
        //   verticalPosition: 'top',
        //   panelClass: 'app-notification-success',
        // });
        if (this.filedPathName === 'log') {
          this.agentFormData.controls.filePath.setValue(result.fileName)
        } else if (this.filedPathName === 'pan_no') {
          this.agentFormData.controls.panFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'aadhar_no') {
          this.agentFormData.controls.aadharFilePath.setValue(result.fileName)
        }
        else if (this.filedPathName === 'signature') {
          this.agentFormData.controls.signatureFilePath.setValue(result.fileName)
        }
        else if (this.filedPathName === 'cheque') {
          this.agentFormData.controls.chequeFilePath.setValue(result.fileName)
        }
        this.submitData()
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
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      console.log(result, 'country');

      if (result.status === '1') {
        this.countryDetials = result.data;
        this.getSingleDetail()

      } else {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-error',
        });
      }
    } catch (error: any) {

      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }


  selectCountryName(event: any) {
    this.stateDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.stateDetails);
    if (this.stateDetails) {
      this.agentFormData.controls.countryName.setValue(this.stateDetails.countryName)
    }
  }

  handleState(event: any) {
    var findCity = this.stateDetails.states.find((el: any) => el._id === event.target.value);
    console.log(findCity, 'ststta');

    this.agentFormData.controls.stateName.setValue(findCity.states)
    this.citiesDetails = findCity.cities[0]
  }

  typeaheadOnSelect(event: any) {
    if (event.value) {
      this.isLookValue = true
    }
  }

  handleEvent(event: any) {
    if (event.target.value) {
      setTimeout(() => {
        if (!this.isLookValue) {
          const findCities = this.citiesDetails.cities.find((el: any) => el === event.target.value.toLowerCase());
          if (!findCities) {
            this.createState(event.target.value)
          }

        }
      }, 500);
    }
  }

  async createState(city: any) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "Do you want add new city in state",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes",
        cancelButtonText: "No"
      }).then(async (result) => {
        if (result.isConfirmed) {
          this.citiesDetails.cities.push(city);
          const reqBody = {
            stateId: this.agentFormData.value.stateId,
            cities: this.citiesDetails.cities
          }
          console.log(reqBody, 'kkk');
          const result: any = await this.companyCodeSer.updateCity(reqBody);
          if (result.status === '1') {
            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-success',
            });

            return;
          }
          if (result.status === '0') {

            this._snackBar.open(result.message, '', {
              duration: 5 * 1000, horizontalPosition: 'center',
              verticalPosition: 'top',
              panelClass: 'app-notification-error',
            });
          }
        } else {
          this.agentFormData.get('city').setErrors({ customError: true })
        }
      });

    } catch (error) {
      console.error(error);
      this._snackBar.open('Something went wrong', '', {
        duration: 5 * 1000, horizontalPosition: 'center',
        verticalPosition: 'top',
        panelClass: 'app-notification-error',
      });
    }
  }



  closeImage() {
    this.selectedFile = '';
    this.fileName = '';
    this.isImageShow = true
  }

  deleteImage() {
    this.isImageShow = false;
    this.filePath = ''
  }

 
  openDialog(fileName: any) {
    const splitValue = this.agentFormData.value.aadharFilePath.split('.');
    const splitValue1 = this.agentFormData.value.panFilePath.split('.');
    const splitValue2 = this.agentFormData.value.signatureFilePath.split('.');
    const splitValue3 = this.agentFormData.value.chequeFilePath.split('.');

    console.log(splitValue[1], 'split');

    let dialogRef: any;
    if (splitValue[1] === 'pdf'|| splitValue1[1] || splitValue2[1] || splitValue3[1]) {
      dialogRef = this.dialog.open(ViewPdfComponent, {
        data: fileName
      });
    }
    else {
      dialogRef = this.dialog.open(ViewImageComponent, {
        data: fileName
      });
    }
   
  }

}
