import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyCodeService } from 'src/app/modules/setting/Services/company-code/company-code.service';
import Swal from 'sweetalert2';
import { ViewImageComponent } from '../../../view-image/view-image.component';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-edit-company-code',
  templateUrl: './edit-company-code.component.html',
  styleUrls: ['./edit-company-code.component.css']
})
export class EditCompanyCodeComponent {
  companyCode: any = FormGroup
  companyDetails: any = [];
  companyCodeId: any = ''
  countryDetials: any = []
  citiesDetails: any = [];
  languageName: any = '';
  currencyDetails:any = []
  isSubmitted:any = false;
  isShowPadding:any =false;
  isImageShow:any = false;
  selectedFile:any = '';
  selectedFileVerfiy: any = '';
  fileName:any = '';
  filePath:any = '';
  imageSrc:any = '';
  @ViewChild('inputFile') inputFile:any;
  languageDetails:any = [];
  industryDetails: any = [];
  filedPathName: any = '';
  inputControl: any = ''
  constructor(
    private fb: FormBuilder,
    private companyCodeSer: CompanyCodeService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.companyCodeId = this.activeRouter.snapshot.paramMap.get('id');
    this.getCompanyDetails()
    this.getCountryDetails()
    this.getCurrencyDetails();
    this.getAllLanguageList()
    this.getAllInndustrySectorsList()
    this.code()
  }

  handleSideBar(event: any) {
    this.isShowPadding = event
  }

  code() {
    this.companyCode = this.fb.group({
      _id: ['', Validators.required],
      companyCode: ['', Validators.required],
      companyName: ['', Validators.required],
      countryId: ['', Validators.required],
      countryName: ['', Validators.required],
      city: ['', Validators.required],
      currencyId: ['', Validators.required],
      currencyName: ['', Validators.required],
      languageId: ['', Validators.required],
      languageName: ['', Validators.required],
      filePath:[''],
      address1:['', Validators.required],
      address2: [''],
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

  // update

  async getSingleCompanyCodeDetails() {
    try {
      const result: any = await this.companyCodeSer.singleCompanyCode(this.companyCodeId);
      if (result.status === '1') {
        this.companyCode.patchValue(result.data)
        if(result.data.filePath){
          this.isImageShow = true;
          this.filePath = 'http://localhost:4000/' + result.data.filePath
        }
        this.citiesDetails = this.countryDetials.find((el: any) => el._id === this.companyCode.value.countryId);
      }
    } catch (error: any) {
      console.log(error)
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


  // Create the purchase org Details
  async addCode() {
    try {
      this.isSubmitted = true
      if (this.companyCode.invalid)
        return
      const result: any = await this.companyCodeSer.updateCompanyCode(this.companyCode.value);
      this.isSubmitted = false
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

  // Get All details for company code
  async getCountryDetails() {
    try {
      const result: any = await this.companyCodeSer.getAllCountryDetails();
      if (result.status === '1') {
        this.countryDetials = result.data;
        this.getSingleCompanyCodeDetails()
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
    this.companyCode.controls.countryName.setValue(this.citiesDetails.countryName)

    this.companyCode.controls.languageId.setValue(this.citiesDetails.languageId)
    this.companyCode.controls.languageName.setValue(this.citiesDetails.languageName)
    const findDefaultCurrency = this.currencyDetails.find((el:any) => el.countryId === event.target.value);
    console.log(findDefaultCurrency, 'findDefaultCurrency');
    this.companyCode.controls.currencyId.setValue(findDefaultCurrency._id)
    this.companyCode.controls.currencyName.setValue(findDefaultCurrency.code)
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

  handleCurrency(event: any) {
    const findCurrencyCode = this.currencyDetails.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.currencyName.setValue(findCurrencyCode.code)
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
          this.isImageShow = false;
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
    console.log(this.selectedFile, 'jjj')
    if(!this.selectedFile){
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
      this.companyCode.controls.filePath.setValue(result.fileName)
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
  } catch(error: any) {
    this._snackBar.open('Something went wrong', '', {
      duration: 5 * 1000, horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'app-notification-error',
    });
  }


  closeImage(){
    this.selectedFile = '';
    this.fileName = '';
    this.isImageShow = true
  }


  deletePerview(){
    this.inputFile.nativeElement.value = '';
    this.imageSrc = '';
    this.selectedFile = ''
  }


  deleteImage(){
    this.isImageShow = false;
    this.filePath = ''
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

  selectIndustryName(event:any){
    const findIndustrySector = this.industryDetails.find((el: any) => el._id === event.target.value);
    this.companyCode.controls.industryName.setValue(findIndustrySector.description) 
  }


  openDialog(fileName:any) {
    const dialogRef = this.dialog.open(ViewImageComponent,{
      data:fileName
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}




