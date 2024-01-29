import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CompanyCodeService } from '../../../Services/company-code/company-code.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DEFAULT_INTERRUPTSOURCES, Idle } from '@ng-idle/core';

@Component({
  selector: 'app-add-company-code',
  templateUrl: './add-company-code.component.html',
  styleUrls: ['./add-company-code.component.css']
})
export class AddCompanyCodeComponent {
  companyCode: any = FormGroup
  companyDetails: any = [];
  countryDetials: any = []
  citiesDetails: any = [];
  languageName: any = ''
  isSubmitted: any = false
  currencyDetails: any = [];
  isShowPadding: any = false;
  selectedFile: any = '';
  selectedFileVerfiy: any = '';
  fileName: any = '';
  imageSrc: any = '';
  @ViewChild('inputFile') inputFile: any;
  languageDetails: any = [];
  industryDetails: any = [];
  filedPathName: any = '';
  inputControl: any = '';
  idleState:any = 'Not Started';
  perviousValue:any = ''
  constructor(
    private fb: FormBuilder,
    private companySer: CompanyCodeService,
    private companyCodeSer: CompanyCodeService,
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
    this.getCountryDetails()
    this.getCompanyDetails()
    this.getCurrencyDetails()
    this.getAllLanguageList()
    this.getAllInndustrySectorsList()
    this.code()
    this.setStates()
  }

  setStates(){
    this.idle.watch();
    this.idleState = 'Started'
  }


  code() {
    this.companyCode = this.fb.group({
      companyCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6)]],
      companyName: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: [''],
      state: ['', Validators.required],
      city: ['', Validators.required],
      currencyId: ['', Validators.required],
      currencyName: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      address1: ['', Validators.required],
      address2: [''],
      filePath: [''],
      industryId: ['', Validators.required],
      industryName: ['', Validators.required],
      vatRegistrationNo: ['', [Validators.required]],
      vatRegistrationFilePath: ['', [Validators.required]],
      companyRegistrationNo: ['', [Validators.required]],
      companyRegistrationFilePath: ['', [Validators.required]],
      taxRegistrationNo: ['', [Validators.required]],
      taxRegistrationFilePath: ['', [Validators.required]]
    })
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  // Create the purchase org Details
  async addCode() {
    try {
      this.isSubmitted = true;
      console.log(this.companyCode.value)
      if (this.companyCode.invalid)
        return
      const result: any = await this.companyCodeSer.createCompanyCodeDetails(this.companyCode.value);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        this.router.navigate(['/settings/company-code-list']);
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

  // Get All details for company code
  async getCompanyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCompanyCodeDetails();
      if (result.status === '1') {
        this.companyDetails = result.data;

      } else {
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


  // Get All details for Currency code
  async getCurrencyDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCurrencyDetails();
      if (result.status === '1') {
        this.currencyDetails = result.data;

      } else {
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

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
      } else {
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

  // single details for Language Detials
  async getAllLanguageList() {
    try {
      const result: any = await this.companyCodeSer.getAllLanguageDetails();
      if (result.status === '1') {
        this.languageDetails = result.data
      } else {
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


  selectCountryName(event: any) {
    this.citiesDetails = this.countryDetials.find((el: any) => el._id === event.target.value);
    console.log(this.citiesDetails);
    if (this.citiesDetails) {
      this.companyCode.controls.countryName.setValue(this.citiesDetails.countryName)
    }
    this.companyCode.controls.languageId.setValue(this.citiesDetails.languageId)
    this.companyCode.controls.languageName.setValue(this.citiesDetails.languageName)
    const findDefaultCurrency = this.currencyDetails.find((el: any) => el.countryId === event.target.value);

    this.companyCode.controls.currencyId.setValue(findDefaultCurrency._id)
    this.companyCode.controls.currencyName.setValue(findDefaultCurrency.code)



  }


  handleCurrency(event: any) {
    const findCurrencyCode = this.currencyDetails.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.currencyName.setValue(findCurrencyCode.code)
  }

  selectIndustryName(event:any){
    const findIndustrySector = this.industryDetails.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.industryName.setValue(findIndustrySector.description) 
  }



  uploadFile(inputData: any, fieldName: any) {
    inputData.click();
    this.filedPathName = fieldName;
    this.inputControl = inputData
  }


  handleUploadFile(event: any) {

    if (event.target.value) {
      const splitValue = event.target.files[0].name.split('.');
      if (splitValue[1] === 'png' || splitValue[1] === 'jpg' || splitValue[1] === 'jpeg') {
       
        const file = event.target.files[0];

        const reader = new FileReader();
        console.log(this.filedPathName)
        if (this.filedPathName === 'company_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'vat_no') {
          this.selectedFileVerfiy = event.target.files[0];
          this.fileUploadVerifyNo()
        } else if (this.filedPathName === 'tax_no') {
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
      const result: any = await this.companyCodeSer.companyLogUpload(formData);
      if (result.status === '1') {
        this._snackBar.open(result.message, '', {
          duration: 5 * 1000, horizontalPosition: 'center',
          verticalPosition: 'top',
          panelClass: 'app-notification-success',
        });
        if (this.filedPathName === 'company_no') {
          this.companyCode.controls.companyRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'tax_no') {
          this.companyCode.controls.taxRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'vat_no') {
          this.companyCode.controls.vatRegistrationFilePath.setValue(result.fileName)
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
        this.addCode()
        return
      }
      const formData = new FormData();
      formData.append('file', this.selectedFile);
      const result: any = await this.companyCodeSer.companyLogUpload(formData);
      if (result.status === '1') {
        // this._snackBar.open(result.message, '', {
        //   duration: 5 * 1000, horizontalPosition: 'center',
        //   verticalPosition: 'top',
        //   panelClass: 'app-notification-success',
        // });
        if (this.filedPathName === 'log') {
          this.companyCode.controls.filePath.setValue(result.fileName)
        } else if (this.filedPathName === 'company_no') {
          this.companyCode.controls.companyRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'tax_no') {
          this.companyCode.controls.taxRegistrationFilePath.setValue(result.fileName)
        } else if (this.filedPathName === 'vat_no') {
          this.companyCode.controls.vatRegistrationFilePath.setValue(result.fileName)
        }
        this.addCode()
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


  deletePerview() {
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }

  //  Get All Industry Details
  async getAllInndustrySectorsList() {
    try {
      const result: any = await this.companyCodeSer.getAllIndustrySectorDetails();
      if (result.status === '1') {
        this.industryDetails = result.data
      } else {
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


  checkInputLength(event:any){
    if(event.target.value){
      
      if(this.companyCode.value.companyCode.length > 6){
        this.companyCode.controls.companyCode.setValue(this.perviousValue)
        return
      }
    }
  }


}